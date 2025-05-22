import React, { useState } from "react";
import AddUserForm from "./AddUserForm";
import UserList from "./UserList";
import EditUserModal from "./EditUserModal";
import { User, UserRole } from "./types";
import { useAuth } from "@/lib/auth-context";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";

// Example initial users (replace with real data source in production)
const initialUsers: User[] = [
  {
    id: uuidv4(),
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    phone: "09171234567",
    address: "Barangay 1",
    role: "Voter",
    status: "Active",
  },
  {
    id: uuidv4(),
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "09181234567",
    address: "Barangay 2",
    role: "Candidate",
    status: "Active",
  },
  {
    id: uuidv4(),
    name: "Carlos Reyes",
    email: "carlos@example.com",
    phone: "09191234567",
    address: "Barangay 3",
    role: "Election Officer",
    status: "Active",
  },
];

export default function UserManagementPage() {
  const { hasPermission } = useAuth();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const canEdit = hasPermission("manage:all_users");

  const handleAddUser = (user: Omit<User, "id" | "status">) => {
    setUsers(prev => [
      ...prev,
      { ...user, id: uuidv4(), status: "Active" },
    ]);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setEditModalOpen(true);
  };

  const handleSaveUser = (updated: User) => {
    setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div>
      {canEdit && (
        <div className="flex justify-end mb-4">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setAddModalOpen(true)}>
            Add New User
          </Button>
        </div>
      )}
      <AddUserForm
        open={addModalOpen}
        onCloseAction={() => setAddModalOpen(false)}
        onAddUserAction={handleAddUser}
      />
      <UserList users={users} onEditUser={handleEditUser} canEdit={canEdit} />
      <EditUserModal
        user={editingUser}
        open={editModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        canEditRole={canEdit}
      />
    </div>
  );
}
