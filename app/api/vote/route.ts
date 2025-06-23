import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/lib/db'

// This would be connected to a database in a real application
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, selections } = body

    // Validate the vote data
    if (!userId || !selections) {
      return NextResponse.json({ success: false, message: "Invalid vote data" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Verify the user hasn't already voted
    // 2. Validate the selections against available candidates
    // 3. Record the vote in a secure database
    // 4. Update the user's voting status

    // Generate a unique receipt number
    const receiptNumber = `SK-2025-${userId.slice(0, 6).padStart(6, "0")}`

    // For demo purposes, return a success response
    return NextResponse.json({
      success: true,
      message: "Vote successfully recorded",
      receiptNumber: receiptNumber,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

// GET /api/vote?voterId=12345
export async function GET(req: NextRequest) {
  const voterId = req.nextUrl.searchParams.get("voterId");
  if (!voterId || typeof voterId !== "string") {
    return NextResponse.json({ error: "Invalid or missing voterId." }, { status: 400 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: voterId },
    });
    if (!user) {
      return NextResponse.json({ error: "Voter not found." }, { status: 404 });
    }
    // Example eligibility: age 15-30, not verified, not voted
    const age = user.age || 0;
    const eligible = age >= 15 && age <= 30 && !user.verified && !user.hasVoted;
    return NextResponse.json({
      id: user.id,
      name: user.name,
      barangay: user.barangay,
      city: user.city,
      age,
      verified: user.verified,
      hasVoted: user.hasVoted,
      eligible,
    });
  } catch (e) {
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }
}

// PATCH /api/vote { voterId }
export async function PATCH(req: NextRequest) {
  try {
    const { voterId } = await req.json();
    if (!voterId || typeof voterId !== "string") {
      return NextResponse.json({ error: "Invalid or missing voterId." }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { id: voterId } });
    if (!user) {
      return NextResponse.json({ error: "Voter not found." }, { status: 404 });
    }
    // Example eligibility: age 15-30, not verified, not voted
    const age = user.age || 0;
    const eligible = age >= 15 && age <= 30 && !user.verified && !user.hasVoted;
    if (!eligible) {
      return NextResponse.json({ error: "Voter is not eligible for verification." }, { status: 400 });
    }
    await prisma.user.update({
      where: { id: voterId },
      data: { verified: true },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }
}
