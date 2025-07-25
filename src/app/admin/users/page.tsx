// pages/admin/users/index.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  useGetAdminUsersQuery,
  useActivateAdminUserMutation,
  useAddAdminUserMutation,
} from "@/lib/api/hooks";
import { columns as userColumns } from "@/components/users/columns-user";
import { columns as adminColumns } from "@/components/users/columns-admin";
import { columns as waitingColumns } from "@/components/users/columns-waiting";
import { SearchBar } from "@/components/users/SearchBar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Animation CSS (add to global CSS in production)
const animationStyles = `
@keyframes fadeOutRed {
  0% { background-color: #fff; opacity: 1; }
  100% { background-color: #fee2e2; opacity: 0; }
}
@keyframes fadeInGreen {
  0% { background-color: #dcfce7; opacity: 0; }
  100% { background-color: #fff; opacity: 1; }
}
.fade-out-red { animation: fadeOutRed 0.7s forwards; }
.fade-in-green { animation: fadeInGreen 0.7s forwards; }
`;

if (
  typeof window !== "undefined" &&
  !document.getElementById("user-anim-css")
) {
  const style = document.createElement("style");
  style.id = "user-anim-css";
  style.innerHTML = animationStyles;
  document.head.appendChild(style);
}

const UserManagement: React.FC = () => {
  // Account Users
  const [accountPage, setAccountPage] = useState(1);
  const [accountSearch, setAccountSearch] = useState("");
  // Waiting Activation
  const [waitingPage, setWaitingPage] = useState(1);
  // Admin Users
  const [adminPage, setAdminPage] = useState(1);

  // Local state for optimistic update and animation
  const [waitingUsers, setWaitingUsers] = useState<any[]>([]);
  const [accountUsers, setAccountUsers] = useState<any[]>([]);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingUserId, setPendingUserId] = useState<number | null>(null);
  const [makeAdminDialogOpen, setMakeAdminDialogOpen] = useState(false);
  const [pendingAdminUserId, setPendingAdminUserId] = useState<number | null>(
    null
  );

  // Fetch data for each table
  const accountQuery = useGetAdminUsersQuery({
    query: {
      page: accountPage,
      per_page: 10,
      role: "USER",
      status: "ACTIVE",
      email: accountSearch || undefined,
    },
  });
  const waitingQuery = useGetAdminUsersQuery({
    query: { page: waitingPage, per_page: 10, status: "INACTIVE" },
  });
  const adminQuery = useGetAdminUsersQuery({
    query: { page: adminPage, per_page: 10, role: "ADMIN" },
  });

  // Sync local state with server data
  useEffect(() => {
    if (waitingQuery.data?.data) setWaitingUsers(waitingQuery.data.data);
  }, [waitingQuery.data?.data]);
  useEffect(() => {
    if (accountQuery.data?.data) setAccountUsers(accountQuery.data.data);
  }, [accountQuery.data?.data]);

  // Activate user mutation for Waiting Activation table
  const { mutate: activateUser } = useActivateAdminUserMutation();
  const handleActivate = (userId: number) => {
    setPendingUserId(userId);
    setDialogOpen(true);
  };
  const confirmActivate = () => {
    if (pendingUserId == null) return;
    setDialogOpen(false);
    setRemovingId(pendingUserId);
    // Find user in waitingUsers
    const user = waitingUsers.find((u) => u.id === pendingUserId);
    if (user) {
      setTimeout(() => {
        setWaitingUsers((prev) => prev.filter((u) => u.id !== pendingUserId));
        setRemovingId(null);
        setAccountUsers((prev) => [{ ...user }, ...prev]);
        setAddingId(pendingUserId);
        setTimeout(() => setAddingId(null), 700);
      }, 700);
    }
    activateUser(
      { path: { id: pendingUserId } },
      {
        onSettled: () => {
          waitingQuery.refetch();
          accountQuery.refetch();
        },
      }
    );
    setPendingUserId(null);
  };

  const { mutate: addAdminUser } = useAddAdminUserMutation();

  // Handler for making a user admin (open dialog)
  const handleMakeAdmin = (userId: number) => {
    setPendingAdminUserId(userId);
    setMakeAdminDialogOpen(true);
  };
  const confirmMakeAdmin = async () => {
    if (pendingAdminUserId == null) return;
    setMakeAdminDialogOpen(false);
    setRemovingId(pendingAdminUserId);
    const user = accountUsers.find((u) => u.id === pendingAdminUserId);
    if (user) {
      setTimeout(() => {
        setAccountUsers((prev) =>
          prev.filter((u) => u.id !== pendingAdminUserId)
        );
        setRemovingId(null);
      }, 700);
    }
    addAdminUser(
      { path: { id: pendingAdminUserId } },
      {
        onSettled: () => {
          adminQuery.refetch();
          accountQuery.refetch();
        },
      }
    );
    setPendingAdminUserId(null);
  };

  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Admin Panel: User Management", href: "/admin/users" },
  ];

  // Add animation class to rows
  const waitingRowProps = (row: any) => ({
    className: removingId === row.id ? "fade-out-red" : "",
  });
  const accountRowProps = (row: any) => ({
    className: addingId === row.id ? "fade-in-green" : "",
  });

  return (
    <ContentLayout title="Admin Panel: User Management">
      <Breadcrumbs items={breadcrumbItems} />
      <Separator className="py-2" />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate user?</DialogTitle>
            <DialogDescription>
              Are you sure you want to activate this user? They will be able to
              log in and use the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmActivate}>Activate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={makeAdminDialogOpen} onOpenChange={setMakeAdminDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make user admin?</DialogTitle>
            <DialogDescription>
              Are you sure you want to grant admin permissions to this user?
              They will be able to manage organization-level settings.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMakeAdminDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmMakeAdmin}>Make admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="mx-auto space-y-12">
        {/* Admin Users Table */}
        <section>
          <h2 className="text-2xl font-bold mb-1">Admin users</h2>
          <p className="text-muted-foreground mb-4">
            Admins can add and remove users and manage organization-level
            settings
          </p>
          <DataTable
            data={adminQuery.data?.data || []}
            columns={adminColumns}
            pagination={adminQuery.data?.meta}
            onPageChange={setAdminPage}
            isLoading={adminQuery.isLoading}
          />
        </section>

        {/* Waiting Activation Table */}
        <section>
          <h2 className="text-2xl font-bold mb-1">Waiting activation</h2>
          <p className="text-muted-foreground mb-4">
            List of users awaiting activation
          </p>
          <DataTable
            data={waitingUsers}
            columns={waitingColumns}
            pagination={waitingQuery.data?.meta}
            onPageChange={setWaitingPage}
            isLoading={waitingQuery.isLoading}
            meta={{ onActivate: handleActivate }}
            rowProps={waitingRowProps}
          />
        </section>

        {/* Account Users Table */}
        <section>
          <h2 className="text-2xl font-bold mb-1">Account users</h2>
          <p className="text-muted-foreground mb-4">
            Account users can assess and review risks, questionnaires, and
            identify breaches.
          </p>
          <div className="flex items-center space-x-2 mb-4 md:w-1/3">
            <SearchBar
              searchQuery={accountSearch}
              setSearchQuery={setAccountSearch}
              className="flex-1"
            />
          </div>
          <DataTable
            data={accountUsers}
            columns={userColumns}
            pagination={accountQuery.data?.meta}
            onPageChange={setAccountPage}
            isLoading={accountQuery.isLoading}
            rowProps={accountRowProps}
            meta={{ onMakeAdmin: handleMakeAdmin }}
          />
        </section>
      </div>
    </ContentLayout>
  );
};

export default UserManagement;
