import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

// Extend the session type to include user id
declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      roles?: string[];
    };
  }
}

// GET: Fetch all candidates
export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ success: true, candidates })
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
    const user = await getCurrentUser();

    // Diagnostic log
    console.log("Current user from session:", user);

    if (!user) {
      console.error("User not found or session invalid. Check NEXTAUTH_SECRET environment variable.");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user has required permission
    const hasPermission = user.roles.some(role => 
      role.permissions.some(permission => permission.name === 'manage:all_candidates')
    );

    if (!hasPermission) {
      return NextResponse.json(
        { success: false, message: "Insufficient permissions" },
        { status: 403 }
      )
    }

    // Parse FormData
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const bio = formData.get('bio') as string;
    // For now, just store an empty string for photo
    // You can implement file upload logic here if needed

    const candidate = await prisma.candidate.create({
      data: {
        name,
        position,
        photo: '', // handle file upload and set the path here
        bio,
      },
    })

    return NextResponse.json({ success: true, candidate })
  } catch (error) {
    console.error("Error creating candidate:", error)
    return NextResponse.json(
      { success: false, message: "Failed to create candidate" },
      { status: 500 }
    )
  }
}
