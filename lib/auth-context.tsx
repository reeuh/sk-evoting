"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Role, type Permission, userHasPermission } from "@/lib/roles"

type User = {
  id: string
  name: string
  email: string
  roles: Role[]
  hasVoted: boolean
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: Permission) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on component mount
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the session with the server
        const storedUser = localStorage.getItem("sk_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // In a real app, this would call your API
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        const userData: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          roles: data.user.roles || ["voter"], // Default to voter if no roles specified
          hasVoted: data.user.hasVoted,
        }

        setUser(userData)
        localStorage.setItem("sk_user", JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sk_user")
  }

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false
    return userHasPermission(user.roles, permission)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasPermission }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
