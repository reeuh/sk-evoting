"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/protected-routes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash, Plus } from "lucide-react"

type Permission = {
  id: string
  name: string
  description: string | null
}

type GroupedPermissions = {
  [key: string]: Permission[]
}

export default function PermissionsPage() {
  return (
    <ProtectedRoute requiredPermission="manage:all_users">
      <PermissionsManagement />
    </ProtectedRoute>
  )
}

function PermissionsManagement() {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [groupedPermissions, setGroupedPermissions] = useState<GroupedPermissions>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/admin/permissions")

        if (!response.ok) {
          throw new Error("Failed to fetch permissions")
        }

        const data = await response.json()
        setPermissions(data)

        // Group permissions by category (before the colon)
        const grouped: GroupedPermissions = {}
        data.forEach((permission: Permission) => {
          const category = permission.name.split(":")[0] || "other"
          if (!grouped[category]) {
            grouped[category] = []
          }
          grouped[category].push(permission)
        })

        setGroupedPermissions(grouped)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPermissions()
  }, [])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Permission Management</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Permission
          </Button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">{error}</div>}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedPermissions).map(([category, perms]) => (
              <Card key={category}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl capitalize">{category} Permissions</CardTitle>
                  <CardDescription>
                    {perms.length} permission{perms.length !== 1 ? "s" : ""} in this category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {perms.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50"
                      >
                        <div>
                          <p className="font-medium">{permission.name}</p>
                          {permission.description && <p className="text-sm text-gray-500">{permission.description}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            <Trash className="h-3 w-3 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
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
