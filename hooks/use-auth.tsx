"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Define the types for our context
interface User {
  id: string
  name: string
  email: string
  role: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  hasPermission: () => false,
})

// Mock user data for demonstration
const MOCK_USER: User = {
  id: "1",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
  permissions: [
    "manage:all_users",
    "manage:all_candidates",
    "manage:election_settings",
    "view:audit_logs",
    "manage:announcements",
    "generate:reports",
    "manage:voting_period",
  ],
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the session with your backend
        // For demo purposes, we'll simulate a delay and then set the user
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would validate credentials with your backend
      // For demo purposes, we'll accept any input and return the mock user
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUser(MOCK_USER)
      localStorage.setItem("user", JSON.stringify(MOCK_USER))
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const hasPermission = (permission: string) => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
