import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// GET: Fetch all candidates
export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        position: "asc",
      },
    })
    return NextResponse.json({
      success: true,
      candidates,
    })
  } catch (error) {
    console.error("Error fetching candidates:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch candidates" },
      { status: 500 }
    )
  }
}

// POST: Add a new candidate
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const position = formData.get("position") as string
    const bio = formData.get("bio") as string
    const photo = formData.get("photo") as File

    if (!name || !position || !bio || !photo) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      )
    }

    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), "public", "uploads", "candidates")
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}_${photo.name.replace(/\s+/g, "_")}`
    const filePath = join(uploadDir, filename)

    // Save photo
    await writeFile(filePath, Buffer.from(await photo.arrayBuffer()))

    // Create candidate in database
    const candidate = await prisma.candidate.create({
      data: {
        name,
        position,
        bio,
        photo: `/uploads/candidates/${filename}`,
      },
    })

    return NextResponse.json({
      success: true,
      candidate: {
        id: candidate.id,
        name: candidate.name,
        position: candidate.position,
        photo: candidate.photo,
      },
    })
  } catch (error) {
    console.error("Error adding candidate:", error)
    return NextResponse.json(
      { success: false, message: "Failed to add candidate" },
      { status: 500 }
    )
  }
}
