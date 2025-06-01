import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { chairpersonId, kagawadIds } = await req.json();

    // Validate input
    if (!chairpersonId || !Array.isArray(kagawadIds) || kagawadIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid vote data" },
        { status: 400 }
      );
    }

    // Check if user has already voted
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { success: false, message: "You have already cast your vote" },
        { status: 400 }
      );
    }

    // Validate candidates exist and are active
    const chairperson = await prisma.candidate.findFirst({
      where: {
        id: chairpersonId,
        position: "Chairperson",
        status: "active",
      },
    });

    if (!chairperson) {
      return NextResponse.json(
        { success: false, message: "Invalid chairperson selection" },
        { status: 400 }
      );
    }

    const kagawadCandidates = await prisma.candidate.findMany({
      where: {
        id: { in: kagawadIds },
        position: "Kagawad",
        status: "active",
      },
    });

    if (kagawadCandidates.length !== kagawadIds.length) {
      return NextResponse.json(
        { success: false, message: "Invalid kagawad selection" },
        { status: 400 }
      );
    }

    // Record the vote in a transaction
    const vote = await prisma.$transaction(async (tx) => {
      // Create the vote record
      const vote = await tx.vote.create({
        data: {
          userId: session.user.id,
          chairpersonId,
          timestamp: new Date(),
        },
      });

      // Create vote details for kagawad selections
      await tx.voteDetail.createMany({
        data: kagawadIds.map((kagawadId) => ({
          voteId: vote.id,
          candidateId: kagawadId,
        })),
      });

      // Update user's voting status
      await tx.user.update({
        where: { id: session.user.id },
        data: { hasVoted: true },
      });

      return vote;
    });

    return NextResponse.json({
      success: true,
      message: "Vote recorded successfully",
      voteId: vote.id,
    });
  } catch (error) {
    console.error("Error recording vote:", error);
    return NextResponse.json(
      { success: false, message: "Failed to record vote" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user has voted
    const vote = await prisma.vote.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        chairperson: true,
        details: {
          include: {
            candidate: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      hasVoted: !!vote,
      vote,
    });
  } catch (error) {
    console.error("Error checking vote status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to check vote status" },
      { status: 500 }
    );
  }
} 