"use client";

import { useAuth } from "@/lib/auth-context";
import { ProtectedRoute } from "@/components/protected-routes";
import DashboardTabs from "./DashboardTabs";

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredPermission="manage:election_settings">
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Administrator Dashboard</h1>
          <DashboardTabs />
        </div>
      </div>
    </ProtectedRoute>
  );
}
