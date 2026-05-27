"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import Loading from "@/components/shared/loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "user")[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!role) {
        router.push("/login");
      } else if (allowedRoles && !allowedRoles.includes(role as "admin" | "user")) {
        router.push("/products");
      }
    }
  }, [role, isLoading, router, allowedRoles]);

  if (isLoading) {
    return <Loading />;
  }

  if (!role) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(role as "admin" | "user")) {
    return null;
  }

  return <>{children}</>;
}
