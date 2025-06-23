// This is a simplified authentication utility for demo purposes
// In a real application, you would use a proper authentication library like NextAuth.js

import { cookies } from "next/headers"
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    roles?: string[];
  }
  
  interface Session {
    user: User & {
      id: string;
      roles?: string[];
    };
  }
}

export type User = {
  id: string
  name: string
  email: string
  barangay: string
  city: string
  hasVoted: boolean
  roles?: string[]
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            roles: true,
          },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles.map(role => role.name),
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.roles = token.roles as string[];
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.roles = user.roles;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

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
    roles: ["user"],
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
