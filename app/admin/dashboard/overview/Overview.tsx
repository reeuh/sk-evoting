import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, FileText, Bell, Calendar, ShieldCheck } from "lucide-react";

export default function Overview({ hasPermission }: { hasPermission: (perm: string) => boolean }) {
  return (
    <div className="space-y-6">
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
    </div>
  );
} 