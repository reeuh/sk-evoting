import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { logAudit } from "@/lib/permissions"

// API endpoint to get all permissions
export async function GET() {
  try {
    const permissions = await prisma.permission.findMany({
      orderBy: { name: "asc" },
    })

    return NextResponse.json(permissions)
  } catch (error) {
    console.error("Error fetching permissions:", error)
    return NextResponse.json(
      { message: "Failed to fetch permissions.", error: (error as Error).message },
      { status: 500 },
    )
  }
}

// API endpoint to create a new permission
export async function POST(request: Request) {
  try {
    const { name, description } = await request.json()

    // Check if permission already exists
    const existingPermission = await prisma.permission.findUnique({
      where: { name },
    })

    if (existingPermission) {
      return NextResponse.json({ message: "Permission already exists." }, { status: 400 })
    }

    // Create the permission
    const permission = await prisma.permission.create({
      data: {
        name,
        description,
      },
    })

    // Log the action
    await logAudit("PERMISSION_CREATED", `Permission "${name}" created`, undefined, request)

    return NextResponse.json(permission, { status: 201 })
  } catch (error) {
    console.error("Error creating permission:", error)
    return NextResponse.json(
      { message: "Failed to create permission.", error: (error as Error).message },
      { status: 500 },
    )
  }
}
