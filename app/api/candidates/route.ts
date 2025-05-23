import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// GET: Fetch all candidates
export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(candidates)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch candidates." }, { status: 500 })
  }
}

// POST: Add a new candidate
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, position, photo, bio } = body
    if (!name || !position || !photo || !bio) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }
    // Create candidate (assume photo is a URL or base64 string)
    const candidate = await prisma.candidate.create({
      data: {
        name,
        position,
        photo,
        bio,
      },
    })
    return NextResponse.json(candidate, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add candidate." }, { status: 500 })
  }
}
