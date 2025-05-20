"use client"

import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-routes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { User, Edit, BarChart3, MessageSquare, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function CandidateDashboard() {
  return (
    <ProtectedRoute requiredPermission="manage:own_profile">
      <CandidateDashboardContent />
    </ProtectedRoute>
  )
}

function CandidateDashboardContent() {
  const { hasPermission } = useAuth()

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Candidate Dashboard</h1>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6 bg-white">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {hasPermission("manage:own_profile") && <TabsTrigger value="profile">My Profile</TabsTrigger>}
            {hasPermission("view:voter_statistics") && <TabsTrigger value="statistics">Voter Statistics</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Current Votes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,245</div>
                  <p className="text-xs text-green-500 mt-1">+56 in the last hour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Voter Turnout</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">75.3%</div>
                  <Progress value={75.3} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Profile Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,876</div>
                  <p className="text-xs text-green-500 mt-1">+124 today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Time Remaining</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">2d 4h 35m</div>
                  <p className="text-xs text-gray-500 mt-1">Voting ends July 3, 7:00 PM</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Vote Distribution</CardTitle>
                  <CardDescription>Votes by barangay and demographic</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Vote distribution chart would appear here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your candidacy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {hasPermission("manage:own_profile") && (
                      <Button variant="outline" className="h-auto py-4 flex items-center justify-center gap-2">
                        <Edit className="h-5 w-5" />
                        <span>Update Profile</span>
                      </Button>
                    )}

                    {hasPermission("view:voter_statistics") && (
                      <Button variant="outline" className="h-auto py-4 flex items-center justify-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>View Statistics</span>
                      </Button>
                    )}

                    <Button variant="outline" className="h-auto py-4 flex items-center justify-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Contact Support</span>
                    </Button>

                    <Button variant="outline" className="h-auto py-4 flex items-center justify-center gap-2">
                      <FileText className="h-5 w-5" />
                      <span>Election Guidelines</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {hasPermission("manage:own_profile") && (
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>My Candidate Profile</CardTitle>
                  <CardDescription>Manage your public candidate information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                          <User className="h-16 w-16 text-gray-400" />
                        </div>
                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Update Photo</Button>
                      </div>

                      <div className="md:w-2/3 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input
                              type="text"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              defaultValue="Maria Santos"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Position</label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                              <option>SK Chairperson</option>
                              <option>SK Kagawad</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Party Affiliation</label>
                          <input
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            defaultValue="Kabataan Party"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Platform Summary</label>
                          <textarea
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            defaultValue="Youth empowerment, education, and community development"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Achievements</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            defaultValue="Student Council President"
                          />
                          <Button variant="outline" size="icon" className="shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            defaultValue="Youth Leadership Award"
                          />
                          <Button variant="outline" size="icon" className="shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            defaultValue="Community Service Volunteer"
                          />
                          <Button variant="outline" size="icon" className="shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </Button>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-2"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                        Add Achievement
                      </Button>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">Save Profile</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission("view:voter_statistics") && (
            <TabsContent value="statistics">
              <Card>
                <CardHeader>
                  <CardTitle>Voter Statistics</CardTitle>
                  <CardDescription>Insights into voter demographics and turnout</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Voter statistics interface would go here */}
                  <p className="text-gray-500">
                    View detailed statistics about voter demographics, turnout by location, and voting patterns.
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
