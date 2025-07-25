"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutGrid, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutUserMutation } from "@/lib/api/hooks";
import { tokenManager } from "@/lib/auth/token";
import { EssentialUserData } from "@/types/user";

export function UserNav() {
  const router = useRouter();
  const [user, setUser] = useState<EssentialUserData>({
    name: "",
    last_name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        const userInfo = parsedUser.data || parsedUser;
        setUser({
          name: userInfo.name,
          last_name: userInfo.last_name,
          email: userInfo.email,
          role: userInfo.role,
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser({
          name: "User",
          last_name: "",
          email: "",
          role: "User",
        });
      }
    } else {
      console.log("No user data found in cookies");
      setUser({
        name: "User",
        last_name: "",
        email: "",
        role: "User",
      });
    }
  }, []);

  const logoutMutation = useLogoutUserMutation({
    onSuccess: () => {
      tokenManager.clearToken();
      toast.success("Successfully logged out");
      router.push("/login");
    },
    onError: () => {
      // Even if API call fails, still clear token and redirect
      tokenManager.clearToken();
      toast.success("Logged out");
      router.push("/login");
    },
  });

  const handleSignOut = () => {
    logoutMutation.mutate({});
  };

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="none" className="p-0 relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-avatar rounded-xl text-primary-foreground">
                    {user?.name ? user.name.substring(0, 1).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name && user?.last_name
                ? `${user.name} ${user.last_name}`
                : user?.name || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || "user@example.com"} ({user?.role || "User"})
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/settings" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={handleSignOut}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          {logoutMutation.isPending ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
