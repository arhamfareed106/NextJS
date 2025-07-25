"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { useGetUserProfileQuery } from "@/lib/api/hooks";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: profile, isLoading, error } = useGetUserProfileQuery();

  useEffect(() => {
    if (!isLoading && !profile) {
      router.push("/login");
      return;
    }

    if (!isLoading && profile && profile.role?.toLowerCase() !== "admin") {
      console.log("Not an admin, redirecting to dashboard");
      router.push("/dashboard");
    }
  }, [profile, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error || !profile || profile.role?.toLowerCase() !== "admin") {
    return null;
  }

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
