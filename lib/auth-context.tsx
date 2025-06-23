"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type Role, type Permission, userHasPermission } from "@/lib/roles";
import { useSession, signIn, signOut } from "next-auth/react";

type User = {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  hasVoted: boolean;
  barangay?: string;
  city?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const sessionUser = session?.user as any;
  const user: User | null = sessionUser
    ? {
        id: sessionUser.id,
        name: sessionUser.name,
        email: sessionUser.email,
        roles: Array.isArray(sessionUser.roles)
          ? sessionUser.roles.map((role: string) => role.toLowerCase() as Role)
          : ["voter"],
        hasVoted: sessionUser.hasVoted || false,
        barangay: sessionUser.barangay,
        city: sessionUser.city,
      }
    : null;
  const isLoading = status === "loading";

  const login = async (email: string, password: string): Promise<boolean> => {
    const res = await signIn("credentials", { redirect: false, email, password });
    return !res?.error;
  };

  const logout = () => {
    signOut();
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user || !user.roles) return false;
    return userHasPermission(user.roles, permission);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
