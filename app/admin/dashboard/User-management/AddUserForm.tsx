"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRole, User } from "./types";

const ROLES: UserRole[] = ["Voter", "Candidate", "Election Officer", "Auditor"];

interface AddUserFormProps {
  open: boolean;
  onCloseAction: () => void;
  onAddUserAction: (user: Omit<User, "id" | "status">) => void;
}

export default function AddUserForm({ open, onCloseAction: onClose, onAddUserAction: onAddUser }: AddUserFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "Voter" as UserRole,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setForm({ name: "", email: "", phone: "", address: "", role: "Voter" });
      setErrors({});
    }
  }, [open]);

  // Close modal on overlay click or Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onAddUser({ ...form });
      onClose();
    }
  };

  const onAddUserAction = async (user: Omit<User, "id" | "status">) => {
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    // handle response, errors, etc.
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input name="name" value={form.name} onChange={handleChange} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input name="email" value={form.email} onChange={handleChange} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <Input name="address" value={form.address} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={e => handleRoleChange(e.target.value as UserRole)}
                className="w-full border rounded px-3 py-2"
              >
                {ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Add User</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
