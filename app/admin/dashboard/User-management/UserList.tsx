import React from "react";
import { Button } from "@/components/ui/button";
import { User, UserRole } from "./types";

const roleColors: Record<UserRole, string> = {
  Voter: "bg-green-100 text-green-800",
  Candidate: "bg-yellow-100 text-yellow-800",
  "Election Officer": "bg-blue-100 text-blue-800",
  Auditor: "bg-purple-100 text-purple-800",
};

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  canEdit: boolean;
}

export default function UserList({ users, onEditUser, canEdit }: UserListProps) {
  return (
    <div className="bg-white rounded-md shadow p-4">
      <h2 className="text-lg font-semibold mb-4">User Accounts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4 text-gray-500">{user.email}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>{user.role}</span>
                </td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{user.status}</span>
                </td>
                <td className="py-2 px-4">
                  {canEdit && (
                    <Button variant="outline" size="sm" onClick={() => onEditUser(user)}>
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
