"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Get the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("No access token found");
      }

      // Use our proxy API route to fetch the user profile
      const response = await fetch("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch user profile");
      }

      setUserData(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile");
    }
  };
}
