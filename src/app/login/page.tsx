"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, Mail, Key } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Role } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, role, isLoading } = useAuth();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"admin" | "user">("admin");

  useEffect(() => {
    if (!isLoading && role) {
      router.push("/products");
    }
  }, [role, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials or select a role to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-4 pb-4 border-b">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="w-full text-sm gap-2" 
                variant={selectedRole === "admin" ? "default" : "outline"}
                onClick={() => setSelectedRole("admin")}
              >
                <Shield className="w-4 h-4" />
                Admin
              </Button>
              
              <Button 
                className="w-full text-sm gap-2" 
                variant={selectedRole === "user" ? "default" : "outline"}
                onClick={() => setSelectedRole("user")}
              >
                <User className="w-4 h-4" />
                User
              </Button>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={selectedRole === "admin" ? "admin@hubx.com" : "user@hubx.com"}
                  readOnly
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value="password123"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button 
              className="w-full h-12 text-md" 
              onClick={() => login(selectedRole)}
            >
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
