import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

// API endpoint to check the status of the seeded data
export async function GET() {
  try {
    // Check if roles exist
    const rolesCount = await prisma.role.count()
    const permissionsCount = await prisma.permission.count()
    const usersCount = await prisma.user.count()
    const rolePermissionsCount = await prisma.permission.count()

    // Get some sample data to verify
    const roles = await prisma.role.findMany({
      select: {
        name: true,
        _count: {
          select: { permissions: true },
        },
      },
    })

    const status = {
      success: rolesCount > 0 && permissionsCount > 0,
      counts: {
        roles: rolesCount,
        permissions: permissionsCount,
        users: usersCount,
        rolePermissions: rolePermissionsCount,
      },
      roles: roles.map((role) => ({
        name: role.name,
        permissionCount: role._count.permissions,
      })),
      message:
        rolesCount > 0
          ? "Database has been seeded successfully."
          : "Database has not been seeded or seeding was incomplete.",
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(status)
  } catch (error) {
    console.error("Error checking seeder status:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to check seeder status.",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
