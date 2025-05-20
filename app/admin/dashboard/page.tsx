"use client"

import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-routes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, UserCheck, FileText, Bell, Calendar, ShieldCheck } from "lucide-react"

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredPermission="manage:election_settings">
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}

function AdminDashboardContent() {
  const { hasPermission } = useAuth()

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Administrator Dashboard</h1>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6 bg-white">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {hasPermission("manage:all_users") && <TabsTrigger value="users">User Management</TabsTrigger>}
            {hasPermission("manage:all_candidates") && <TabsTrigger value="candidates">Candidates</TabsTrigger>}
            {hasPermission("manage:election_settings") && <TabsTrigger value="settings">Election Settings</TabsTrigger>}
            {hasPermission("view:audit_logs") && <TabsTrigger value="audit">Audit Logs</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Registered Voters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3,945</div>
                  <p className="text-xs text-green-500 mt-1">+124 since yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Votes Cast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,975</div>
                  <p className="text-xs text-gray-500 mt-1">75.3% turnout</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Registered Candidates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">13</div>
                  <p className="text-xs text-gray-500 mt-1">3 chairperson, 10 kagawad</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Election Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-green-600">Active</div>
                  <p className="text-xs text-gray-500 mt-1">Ends in 2 days, 4 hours</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <UserCheck className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">New voter registration</p>
                        <p className="text-sm text-gray-500">Maria Garcia registered as a voter</p>
                        <p className="text-xs text-gray-400">10 minutes ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Bell className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Announcement published</p>
                        <p className="text-sm text-gray-500">Reminder: 2 days left to vote</p>
                        <p className="text-xs text-gray-400">1 hour ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <ShieldCheck className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium">System security scan</p>
                        <p className="text-sm text-gray-500">Routine security check completed</p>
                        <p className="text-xs text-gray-400">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {hasPermission("manage:announcements") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <Bell className="h-5 w-5" />
                        <span>Create Announcement</span>
                      </Button>
                    )}

                    {hasPermission("generate:reports") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>Generate Report</span>
                      </Button>
                    )}

                    {hasPermission("manage:voting_period") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>Manage Schedule</span>
                      </Button>
                    )}

                    {hasPermission("view:audit_logs") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <ShieldCheck className="h-5 w-5" />
                        <span>View Audit Logs</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {hasPermission("manage:all_users") && (
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage voter accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Users className="mr-2 h-4 w-4" />
                      Add New User
                    </Button>
                  </div>

                  <div className="border rounded-md">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Role</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>

                    {/* Sample user rows */}
                    <div className="grid grid-cols-5 gap-4 p-4 border-b">
                      <div>Juan Dela Cruz</div>
                      <div className="text-gray-500">juan@example.com</div>
                      <div>Voter</div>
                      <div>
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Active</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          Suspend
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 p-4 border-b">
                      <div>Maria Santos</div>
                      <div className="text-gray-500">maria@example.com</div>
                      <div>Candidate</div>
                      <div>
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Active</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          Suspend
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 p-4">
                      <div>Carlos Reyes</div>
                      <div className="text-gray-500">carlos@example.com</div>
                      <div>Election Officer</div>
                      <div>
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Active</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          Suspend
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission("manage:all_candidates") && (
            <TabsContent value="candidates">
              <Card>
                <CardHeader>
                  <CardTitle>Candidate Management</CardTitle>
                  <CardDescription>Manage candidate profiles and information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Add Candidate
                    </Button>
                  </div>

                  {/* Candidate management interface would go here */}
                  <p className="text-gray-500">
                    Manage candidate profiles, verify credentials, and approve candidate applications.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission("manage:election_settings") && (
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Election Settings</CardTitle>
                  <CardDescription>Configure election parameters and schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Election Schedule</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Registration Period</label>
                          <div className="flex gap-2">
                            <input
                              type="date"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                            <span className="flex items-center">to</span>
                            <input
                              type="date"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Voting Period</label>
                          <div className="flex gap-2">
                            <input
                              type="date"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                            <span className="flex items-center">to</span>
                            <input
                              type="date"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">System Configuration</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable Voter Registration</p>
                            <p className="text-sm text-gray-500">Allow new voters to register</p>
                          </div>
                          <div className="h-6 w-11 rounded-full bg-green-500 relative">
                            <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable Voting</p>
                            <p className="text-sm text-gray-500">Allow voters to cast ballots</p>
                          </div>
                          <div className="h-6 w-11 rounded-full bg-green-500 relative">
                            <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Show Live Results</p>
                            <p className="text-sm text-gray-500">Display real-time election results</p>
                          </div>
                          <div className="h-6 w-11 rounded-full bg-gray-300 relative">
                            <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">Save Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission("view:audit_logs") && (
            <TabsContent value="audit">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Logs</CardTitle>
                  <CardDescription>System activity and security logs</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Audit logs interface would go here */}
                  <p className="text-gray-500">
                    View detailed logs of all system activities, including login attempts, vote submissions, and
                    administrative actions.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
