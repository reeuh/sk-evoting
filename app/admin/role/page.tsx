"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/protected-routes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Permission = {
  id: string
  name: string
  description: string | null
}

type Role = {
  id: string
  name: string
  description: string | null
  permissions: Permission[]
}

export default function RolesPage() {
  return (
    <ProtectedRoute requiredPermission="manage:all_users">
      <RolesManagement />
    </ProtectedRoute>
  )
}

function RolesManagement() {
  const [roles, setRoles] = useState<Role[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/admin/roles")

        if (!response.ok) {
          throw new Error("Failed to fetch roles")
        }

        const data = await response.json()
        setRoles(data)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoles()
  }, [])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Role Management</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">{error}</div>}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{role.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {role.description && <CardDescription>{role.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium text-sm mb-2">Permissions ({role.permissions.length})</h3>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {role.permissions.map((permission) => (
                      <Badge key={permission.id} variant="outline" className="bg-blue-50 text-blue-800">
                        {permission.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
