"use client"

import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-routes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { UserCheck, Clock, FileText, MapPin } from "lucide-react"

export default function ElectionOfficerDashboard() {
  return (
    <ProtectedRoute requiredPermission="verify:voters">
      <ElectionOfficerDashboardContent />
    </ProtectedRoute>
  )
}

function ElectionOfficerDashboardContent() {
  const { hasPermission } = useAuth()

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Election Officer Dashboard</h1>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6 bg-white">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {hasPermission("verify:voters") && <TabsTrigger value="verification">Voter Verification</TabsTrigger>}
            {hasPermission("resolve:voter_issues") && <TabsTrigger value="issues">Voter Issues</TabsTrigger>}
            {hasPermission("manage:polling_stations") && <TabsTrigger value="stations">Polling Stations</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Pending Verifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42</div>
                  <p className="text-xs text-yellow-500 mt-1">Requires attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Verified Voters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3,903</div>
                  <p className="text-xs text-green-500 mt-1">+56 today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Voter Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">7</div>
                  <p className="text-xs text-red-500 mt-1">3 high priority</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Voting Time Remaining</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">2d 4h 35m</div>
                  <p className="text-xs text-gray-500 mt-1">Ends July 3, 7:00 PM</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verification Queue</CardTitle>
                  <CardDescription>Recent voter registration requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">Maria Garcia</p>
                          <p className="text-sm text-gray-500">Barangay San Jose, Manila</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Verify
                      </Button>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">Jose Santos</p>
                          <p className="text-sm text-gray-500">Barangay San Miguel, Manila</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Verify
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">Ana Reyes</p>
                          <p className="text-sm text-gray-500">Barangay Sta. Cruz, Manila</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Verify
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common election officer tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {hasPermission("verify:voters") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <UserCheck className="h-5 w-5" />
                        <span>Verify Voters</span>
                      </Button>
                    )}

                    {hasPermission("manage:voting_period") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>Manage Schedule</span>
                      </Button>
                    )}

                    {hasPermission("generate:voter_lists") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>Generate Lists</span>
                      </Button>
                    )}

                    {hasPermission("manage:polling_stations") && (
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>Polling Stations</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {hasPermission("verify:voters") && (
            <TabsContent value="verification">
              <Card>
                <CardHeader>
                  <CardTitle>Voter Verification</CardTitle>
                  <CardDescription>Verify voter identities and eligibility</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Voter verification interface would go here */}
                  <p className="text-gray-500">
                    Review voter registration applications, verify IDs, and approve eligible voters.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission("resolve:voter_issues") && (
            <TabsContent value="issues">
              <Card>
                <CardHeader>
                  <CardTitle>Voter Issues</CardTitle>
                  <CardDescription>Handle voter concerns and problems</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Voter issues interface would go here */}
                  <p className="text-gray-500">
                    Manage and resolve voter-reported issues such as registration problems, login difficulties, or
                    voting concerns.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission("manage:polling_stations") && (
            <TabsContent value="stations">
              <Card>
                <CardHeader>
                  <CardTitle>Polling Stations</CardTitle>
                  <CardDescription>Manage physical voting locations</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Polling stations interface would go here */}
                  <p className="text-gray-500">
                    Configure and monitor physical polling stations for voters who need assistance or prefer in-person
                    voting.
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
