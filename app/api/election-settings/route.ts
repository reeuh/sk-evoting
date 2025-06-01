import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await prisma.electionSettings.findFirst();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch election settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await req.json();
    const settings = await prisma.electionSettings.upsert({
      where: { id: "current" },
      update: {
        registrationStart: new Date(data.registrationStart),
        registrationEnd: new Date(data.registrationEnd),
        votingStart: new Date(data.votingStart),
        votingEnd: new Date(data.votingEnd),
        enableRegistration: data.enableRegistration,
        enableVoting: data.enableVoting,
        showResults: data.showResults,
      },
      create: {
        id: "current",
        registrationStart: new Date(data.registrationStart),
        registrationEnd: new Date(data.registrationEnd),
        votingStart: new Date(data.votingStart),
        votingEnd: new Date(data.votingEnd),
        enableRegistration: data.enableRegistration,
        enableVoting: data.enableVoting,
        showResults: data.showResults,
      },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update election settings" },
      { status: 500 }
    );
  }
} 