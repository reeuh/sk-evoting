import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import type { Role } from "@/lib/roles";
import { compare } from "bcryptjs";

// API endpoint to check the status of the seeded data
export async function GET() {
  try {
    // Check if roles exist
    const rolesCount = await prisma.role.count();
    const permissionsCount = await prisma.permission.count();
    const usersCount = await prisma.user.count();
    const rolePermissionsCount = await prisma.permission.count();

    // Get some sample data to verify
    const roles = await prisma.role.findMany({
      select: {
        name: true,
        _count: {
          select: { permissions: true },
        },
      },
    });

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
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error("Error checking seeder status:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to check seeder status.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user
      .findUnique({
        where: { email },
        include: {
          roles: true,
        },
      })
      .catch((error) => {
        console.error("Database error:", error);
        throw new Error("Database connection failed");
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // For demo purposes, accept any password
    // In production, you would verify the password:
    // const isValidPassword = await compare(password, user.hashedPassword)
    // if (!isValidPassword) {
    //   return NextResponse.json(
    //     { success: false, message: "Invalid email or password" },
    //     { status: 401 }
    //   )
    // }

    // Map database roles to application roles
    const roles = user.roles.map((role) => {
      // Ensure consistent role naming
      if (
        role.name.toLowerCase() === "admin" ||
        role.name.toLowerCase() === "administrator"
      ) {
        return "administrator";
      }
      return role.name.toLowerCase();
    });

    // Success response
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: roles,
        barangay: user.barangay,
        city: user.city,
        hasVoted: false,
      },
      token: "mock_jwt_token",
    });
  } catch (error) {
    console.error("Authentication error:", error);

    // Return a user-friendly error message
    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred during authentication. Please try again later.",
      },
      { status: 500 }
    );
  }
}
