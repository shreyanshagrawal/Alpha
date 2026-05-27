"use client";

import Link from "next/link";

import {
  ArrowRight,
  Package,
  BarChart3,
} from "lucide-react";

import { useAuth } from "@/context/auth-context";

export default function DashboardPage() {
  const { role } = useAuth();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="dashboard-card">
        <h1 className="text-4xl font-bold">
          {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Manage products, monitor analytics,
          and oversee your inventory with a
          modern SaaS dashboard experience.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/products"
          className="dashboard-card group transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between">
            <div>
              <Package className="mb-4 h-10 w-10" />

              <h2 className="text-2xl font-semibold">
                Products
              </h2>

              <p className="mt-2 text-muted-foreground">
                Manage inventory and products.
              </p>
            </div>

            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {role === "admin" && (
          <Link
            href="/analytics"
            className="dashboard-card group transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div>
                <BarChart3 className="mb-4 h-10 w-10" />

                <h2 className="text-2xl font-semibold">
                  Analytics
                </h2>

                <p className="mt-2 text-muted-foreground">
                  View business insights and trends.
                </p>
              </div>

              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}