"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import type { Permission } from "@/lib/roles"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: Permission
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredPermission, redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, isLoading, hasPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`${redirectTo}?redirect=${window.location.pathname}`)
    }

    if (!isLoading && user && requiredPermission && !hasPermission(requiredPermission)) {
      router.push("/unauthorized")
    }
  }, [user, isLoading, router, redirectTo, requiredPermission, hasPermission])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null
  }

  return <>{children}</>
}
