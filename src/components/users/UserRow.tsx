// components/UserRow.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
import { UserProfile as User } from "@/types";
import Link from "next/link";

interface UserRowProps {
  user: User;
  showRevenue?: boolean;
  showActivate?: boolean;
}

export const UserRow: React.FC<UserRowProps> = ({
  user,
  showRevenue = false,
  showActivate = false,
}) => {
  // const router = useRouter();

  const handleUserClick = () => {
    // router.push(`/admin/user/${user.id}`);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b hover:bg-slate-50 cursor-pointer">
      <div className="flex items-center space-x-primary">
        <div className="w-8 h-8 bg-violet-400 rounded-full flex items-center justify-center text-white">
          {user.name?.[0]}
          {user.last_name?.[0]}
        </div>
        <div>
          <Link href={`/admin/users/${user.name}-${user.last_name}`}>
            <div className="font-medium">
              {user.name} {user.last_name}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </Link>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-8 ">
        {user.role && (
          <Badge
            variant="secondary"
            className={`${
              user.role === "Administrator"
                ? "bg-violet-100 text-violet-800"
                : user.role === "Manager"
                ? "bg-orange-100 text-orange-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {user.role}
          </Badge>
        )}
        {showActivate ? (
          <Button
            variant="secondary"
            className="bg-violet-500 text-white hover:bg-violet-600"
            onClick={(e) => {
              e.stopPropagation();
              // Handle activation
            }}
          >
            Activate
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
