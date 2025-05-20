import { NextResponse } from "next/server"
import type { Role } from "@/lib/roles"

// This would be connected to a database in a real application
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In a real application, you would validate credentials against a database
    // and use proper authentication methods like JWT

    // For demo purposes, we'll return mock users with different roles
    if (email && password) {
      // Determine user role based on email for demo purposes
      let roles: Role[] = ["voter"]
      let name = "Juan Dela Cruz"

      if (email.includes("admin")) {
        roles = ["administrator"]
        name = "Admin User"
      } else if (email.includes("officer")) {
        roles = ["election_officer"]
        name = "Election Officer"
      } else if (email.includes("auditor")) {
        roles = ["auditor"]
        name = "System Auditor"
      } else if (email.includes("candidate")) {
        roles = ["voter", "candidate"]
        name = "Maria Santos"
      }

      return NextResponse.json({
        success: true,
        user: {
          id: "user_" + Math.random().toString(36).substring(2, 9),
          name: name,
          email: email,
          roles: roles,
          barangay: "San Jose",
          city: "Manila",
          hasVoted: false,
        },
        token: "mock_jwt_token",
      })
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
