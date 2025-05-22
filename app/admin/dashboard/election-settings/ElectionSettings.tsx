import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ElectionSettings() {
  return (
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
                  <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <span className="flex items-center">to</span>
                  <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Voting Period</label>
                <div className="flex gap-2">
                  <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <span className="flex items-center">to</span>
                  <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
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
  );
} 