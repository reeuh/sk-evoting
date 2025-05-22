import React, { useState, useEffect } from "react";
import { User, UserRole } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ROLES: UserRole[] = ["Voter", "Candidate", "Election Officer", "Auditor"];

interface EditUserModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  canEditRole: boolean;
}

export default function EditUserModal({ user, open, onClose, onSave, canEditRole }: EditUserModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "Voter" as UserRole,
    status: "Active" as "Active" | "Suspended",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
        role: user.role,
        status: user.status,
      });
      setErrors({});
    }
  }, [user, open]);

  if (!open || !user) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Invalid email.";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role: UserRole) => {
    setForm({ ...form, role });
  };

  const handleStatusChange = (status: "Active" | "Suspended") => {
    setForm({ ...form, status });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSave({ ...user, ...form });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input name="email" value={form.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Address</label>
            <Input name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={e => handleRoleChange(e.target.value as UserRole)}
              className="w-full border rounded px-3 py-2"
              disabled={!canEditRole}
            >
              {ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={e => handleStatusChange(e.target.value as "Active" | "Suspended")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
