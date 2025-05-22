"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./overview/Overview";
import UserManagement from "./User-management";
import Candidates from "./candidates/Candidates";
import ElectionSettings from "./election-settings/ElectionSettings";
import AuditLogs from "./audit-logs/AuditLogs";
import { useAuth } from "@/lib/auth-context";

export default function DashboardTabs() {
  const { hasPermission } = useAuth();

  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-6 bg-white">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        {hasPermission("manage:all_users") && (
          <TabsTrigger value="users">User Management</TabsTrigger>
        )}
        {hasPermission("manage:all_candidates") && (
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
        )}
        {hasPermission("manage:election_settings") && (
          <TabsTrigger value="settings">Election Settings</TabsTrigger>
        )}
        {hasPermission("view:audit_logs") && (
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="overview">
        <Overview hasPermission={hasPermission as (perm: string) => boolean} />
      </TabsContent>
      {hasPermission("manage:all_users") && (
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      )}
      {hasPermission("manage:all_candidates") && (
        <TabsContent value="candidates">
          <Candidates />
        </TabsContent>
      )}
      {hasPermission("manage:election_settings") && (
        <TabsContent value="settings">
          <ElectionSettings />
        </TabsContent>
      )}
      {hasPermission("view:audit_logs") && (
        <TabsContent value="audit">
          <AuditLogs />
        </TabsContent>
      )}
    </Tabs>
  );
} 