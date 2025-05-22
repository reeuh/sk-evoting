import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { logAudit } from "@/lib/permissions"

// API endpoint to get all roles with their permissions
export async function GET(request: Request) {
  try {
    const roles = await prisma.role.findMany({
      include: {
        permissions: true,
      },
      select: {
        id: true,
        name: true,
        permissions: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    })

    // Format the response
    const formattedRoles = roles.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.rolePermissions.map((rp) => ({
        id: rp.permission.id,
        name: rp.permission.name,
        description: rp.permission.description,
      })),
    }))

    return NextResponse.json(formattedRoles)
  } catch (error) {
    console.error("Error fetching roles:", error)
    return NextResponse.json({ message: "Failed to fetch roles.", error: (error as Error).message }, { status: 500 })
  }
}

// API endpoint to create a new role
export async function POST(request: Request) {
  try {
    const { name, description, permissions } = await request.json()

    // Check if role already exists
    const existingRole = await prisma.role.findUnique({
      where: { name },
    })

    if (existingRole) {
      return NextResponse.json({ message: "Role already exists." }, { status: 400 })
    }

    // Create the role
    const role = await prisma.role.create({
      data: {
        name,
        description,
      },
    })

    // If permissions are provided, assign them to the role
    if (permissions && permissions.length > 0) {
      const permissionAssignments = permissions.map((permissionId: string) => ({
        roleId: role.id,
        permissionId,
      }))

      await prisma.rolePermission.createMany({
        data: permissionAssignments,
      })
    }

    // Log the action
    await logAudit(
      "ROLE_CREATED",
      `Role "${name}" created with ${permissions?.length || 0} permissions`,
      undefined,
      request,
    )

    return NextResponse.json(role, { status: 201 })
  } catch (error) {
    console.error("Error creating role:", error)
    return NextResponse.json({ message: "Failed to create role.", error: (error as Error).message }, { status: 500 })
  }
}
