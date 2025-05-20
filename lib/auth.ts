// This is a simplified authentication utility for demo purposes
// In a real application, you would use a proper authentication library like NextAuth.js

import { cookies } from "next/headers"

export type User = {
  id: string
  name: string
  email: string
  barangay: string
  city: string
  hasVoted: boolean
}

export async function login(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; message?: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (data.success) {
      // In a real app, you would store the token securely
      (await
            // In a real app, you would store the token securely
            cookies()).set("auth_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })

      return {
        success: true,
        user: data.user,
      }
    } else {
      return {
        success: false,
        message: data.message || "Authentication failed",
      }
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during login",
    }
  }
}

export async function logout() {
  (await cookies()).delete("auth_token")
}

export async function getUser(): Promise<User | null> {
  const token = (await cookies()).get("auth_token")?.value

  if (!token) {
    return null
  }

  // In a real app, you would verify the token and fetch the user data
  // For demo purposes, we'll return a mock user
  return {
    id: "user_123",
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    barangay: "San Jose",
    city: "Manila",
    hasVoted: false,
  }
}

export async function submitVote(userId: string, selections: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, selections }),
    })

    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while submitting your vote",
    }
  }
}
