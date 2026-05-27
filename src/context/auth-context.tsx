"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export type Role = "admin" | "user" | null;

interface AuthContextType {
  role: Role;
  login: (role: "admin" | "user") => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("auth-role") as Role;
    if (storedRole === "admin" || storedRole === "user") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRole(storedRole);
    }
    setIsLoading(false);
  }, []);

  const login = (newRole: "admin" | "user") => {
    localStorage.setItem("auth-role", newRole);
    setRole(newRole);
    router.push("/products");
  };

  const logout = () => {
    localStorage.removeItem("auth-role");
    setRole(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, isLoading }}>
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
