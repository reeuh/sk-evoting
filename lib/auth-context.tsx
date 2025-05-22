"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type Role, type Permission, userHasPermission } from "@/lib/roles";

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("sk_user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          // Ensure roles are properly typed
          if (userData && Array.isArray(userData.roles)) {
            userData.roles = userData.roles.map(
              (role: string) => role.toLowerCase() as Role
            );
          }
          setUser(userData);
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const userData: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          roles: Array.isArray(data.user.roles)
            ? data.user.roles.map((role: string) => role.toLowerCase() as Role)
            : ["voter"], // Default to voter if no roles specified
          hasVoted: data.user.hasVoted || false,
          barangay: data.user.barangay,
          city: data.user.city,
        };
        setUser(userData);
        localStorage.setItem("sk_user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sk_user");
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
