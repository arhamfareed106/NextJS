"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { toast } from "sonner";
import { tokenManager } from "@/lib/auth/token";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const token = tokenManager.getToken();
      const userData = Cookies.get("user");

      if (!token || !userData) {
        router.push("/login");
        return;
      }

      try {
        // Just verify that user data can be parsed
        JSON.parse(userData);
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        tokenManager.clearToken();

        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
