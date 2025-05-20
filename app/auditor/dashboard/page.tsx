"use client"

import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-routes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShieldCheck, FileText, BarChart3, CheckCircle2, AlertTriangle } from "lucide-react"

export default function AuditorDashboard() {
  return (
    <ProtectedRoute requiredPermission="view:audit_logs">
      <AuditorDashboardContent />
    </ProtectedRoute>
  )
}

function AuditorDashboardContent() {
  const { hasPermission } = useAuth()

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Auditor Dashboard</h1>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6 bg-white">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {hasPermission("view:audit_logs") && <TabsTrigger value="logs">System Logs</TabsTrigger>}
            {hasPermission("view:vote_counts") && <TabsTrigger value="votes">Vote Verification</TabsTrigger>}
            {hasPermission("generate:audit_reports") && <TabsTrigger value="reports">Audit Reports</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <span className="text-xl font-bold text-green-600">Healthy</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Last checked: 10 minutes ago</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Security Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">0</div>
                  <p className="text-xs text-green-500 mt-1">No issues detected</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Vote Integrity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <span className="text-xl font-bold text-green-600">Verified</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">All votes match records</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Login Attempts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,245</div>
                  <p className="text-xs text-gray-500 mt-1">24 failed attempts</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent System Events</CardTitle>
                  <CardDescription>Latest security and system logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">System backup completed</p>
                        <p className="text-sm text-gray-500">Automated daily backup successful</p>
                        <p className="text-xs text-gray-400">30 minutes ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <ShieldCheck className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Security scan completed</p>
                        <p className="text-sm text-gray-500">No vulnerabilities detected</p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Multiple login attempts</p>
                        <p className="text-sm text-gray-500">5 failed login attempts from IP 192.168.1.45</p>
                        <p className="text-xs text-gray-400">4 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common auditor tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {hasPermission("view:audit_logs") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <ShieldCheck className="h-5 w-5" />
                        <span>Security Logs</span>
                      </Button>
                    )}

                    {hasPermission("generate:audit_reports") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>Generate Report</span>
                      </Button>
                    )}

                    {hasPermission("verify:vote_integrity") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Verify Votes</span>
                      </Button>
                    )}

                    {hasPermission("view:vote_counts") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>Vote Statistics</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {hasPermission("view:audit_logs") && (
            <TabsContent value="logs">
              <Card>
                <CardHeader>
                  <CardTitle>System Logs</CardTitle>
                  <CardDescription>Detailed system and security logs</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* System logs interface would go here */}
                  <p className="text-gray-500">
                    Review detailed logs of all system activities, including login attempts, vote submissions, and
                    administrative actions.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission("view:vote_counts") && (
            <TabsContent value="votes">
              <Card>
                <CardHeader>
                  <CardTitle>Vote Verification</CardTitle>
                  <CardDescription>Verify vote integrity and accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Vote verification interface would go here */}
                  <p className="text-gray-500">
                    Verify that all votes are properly recorded and that vote counts match the expected totals.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission("generate:audit_reports") && (
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Reports</CardTitle>
                  <CardDescription>Generate and view audit reports</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Audit reports interface would go here */}
                  <p className="text-gray-500">
                    Generate comprehensive audit reports for the election process, including voter turnout, system
                    security, and vote integrity.
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
