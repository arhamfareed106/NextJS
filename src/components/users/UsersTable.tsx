"use client";

import {
  useGetAdminUsersQuery,
  useActivateAdminUserMutation,
} from "@/lib/api/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreVertical } from "lucide-react";

interface UsersTableProps {
  role?: "USER" | "ADMIN";
  status?: "ACTIVE" | "INACTIVE" | "BANNED";
  searchQuery: string;
  activeTab?: string;
}

export function UsersTable({
  role,
  status,
  searchQuery,
  activeTab,
}: UsersTableProps) {
  const { data, isLoading, error, refetch } = useGetAdminUsersQuery();
  const { mutate: activateUser, isPending } = useActivateAdminUserMutation();

  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.data) return <div>No users found</div>;

  // Filter users based on role, status, and search query
  const filteredUsers = data.data.filter((user: User) => {
    // Role and status filters
    if (role && user.role !== role) return false;
    if (status && user.status !== status) return false;

    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const emailMatch = user.email?.toLowerCase().includes(searchLower);
      return emailMatch;
    }

    return true;
  });

  const handleActivateUser = async (userId: number) => {
    try {
      await activateUser({ path: { id: userId } });
      refetch(); // Refresh the user list
      setShowActivateDialog(false); // Close the dialog after activation
    } catch (err: any) {
      console.error("Activation error:", err);
    }
  };

  const handleDeactivateUser = async (userId: number) => {
    try {
      // Replace with actual deactivate API call
      console.log(`Deactivating user ${userId}`);
      // await deactivateUser({ path: { id: userId } });
      refetch(); // Refresh the user list
      setShowDeactivateDialog(false); // Close the dialog after deactivation
    } catch (err: any) {
      console.error("Deactivation error:", err);
    }
  };

  if (filteredUsers.length === 0) {
    return <div>No users found matching the criteria</div>;
  }

  return (
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Created At</TableHead>
            {/* <TableHead>Products</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.status === "INACTIVE" &&
                activeTab === "waiting-activation" ? (
                  <Dialog
                    open={showActivateDialog}
                    onOpenChange={setShowActivateDialog}
                  >
                    <DialogTrigger asChild>
                      <Badge variant="secondary" className="cursor-pointer">
                        Activate
                      </Badge>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action will activate the user&apos;s account.
                          They will be able to log in and use the system.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setShowActivateDialog(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => handleActivateUser(user.id!)}>
                          Continue
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Badge
                    variant={user.status === "ACTIVE" ? "default" : "secondary"}
                  >
                    {user.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.role === "ADMIN" ? "destructive" : "outline"}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                {user.last_login_at
                  ? new Date(user.last_login_at).toLocaleDateString()
                  : "Never"}
              </TableCell>
              <TableCell>
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "-"}
              </TableCell>
              {/* <TableCell>{user.products || "0"}</TableCell> */}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onSelect={() =>
                        (window.location.href = `/admin/users/${user.id}`)
                      }
                    >
                      View profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Delete user", user.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() =>
                        (window.location.href = `/admin/users/${user.id}/edit`)
                      }
                    >
                      Edit user
                    </DropdownMenuItem>

                    {activeTab === "waiting-activation" &&
                      user.status === "INACTIVE" && (
                        <Dialog
                          open={showActivateDialog}
                          onOpenChange={setShowActivateDialog}
                        >
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault();
                                setShowActivateDialog(true);
                              }}
                            >
                              Activate
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action will activate the user&apos;s
                                account. They will be able to log in and use the
                                system.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setShowActivateDialog(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleActivateUser(user.id!)}
                              >
                                Continue
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}

                    {activeTab === "account-users" &&
                      user.status === "ACTIVE" && (
                        <Dialog
                          open={showDeactivateDialog}
                          onOpenChange={setShowDeactivateDialog}
                        >
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault();
                                setShowDeactivateDialog(true);
                              }}
                            >
                              Deactivate
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action will deactivate the user&apos;s
                                account. They will no longer be able to log in.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setShowDeactivateDialog(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleDeactivateUser(user.id!)}
                              >
                                Continue
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}

                    <DropdownMenuItem
                      onClick={() =>
                        console.log("Reset password for user", user.id)
                      }
                    >
                      Reset password
                    </DropdownMenuItem>
                    {activeTab !== "admin-users" && (
                      <DropdownMenuItem
                        onClick={() =>
                          console.log("Admin Permission for user", user.id)
                        }
                      >
                        Admin Permission
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
}
