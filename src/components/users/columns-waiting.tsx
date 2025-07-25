import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  User as UserIcon,
  Trash2,
  Pencil,
  UserMinus,
  KeyRound,
  Shield,
} from "lucide-react";

function getInitials(name?: string, lastName?: string, email?: string) {
  if (name && lastName) return `${name[0]}${lastName[0]}`.toUpperCase();
  if (name) return name[0].toUpperCase();
  if (email) return email[0].toUpperCase();
  return "?";
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="rounded"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="rounded"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      const name = (user as any).name || "";
      const lastName = (user as any).last_name || "";
      const initials = getInitials(name, lastName, user.email);
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-violet-300 flex items-center justify-center text-lg font-semibold text-white">
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-black text-base">
              {name ? `${name}${lastName ? " " + lastName : ""}` : "No name"}
            </span>
            <span className="text-muted-foreground text-sm">
              {user.email || "-"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: () => <span className="hidden md:table-cell">Products</span>,
    cell: ({ getValue }) => (
      <span className="hidden md:table-cell">{String(getValue() ?? "")}</span>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => <span className="hidden md:table-cell">Created At</span>,
    cell: ({ row }) => (
      <span className="hidden md:table-cell">
        {row.original.created_at
          ? new Date(row.original.created_at).toLocaleDateString()
          : "-"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row, table }) => (
      <div className="flex items-center justify-end gap-1 w-full">
        <Button
          size="sm"
          className="bg-violet-500 hover:bg-violet-600 text-white rounded-xl px-6 hidden md:inline-flex"
          onClick={() =>
            row.original.id && table.options.meta?.onActivate?.(row.original.id)
          }
          disabled={row.original.status === "ACTIVE"}
        >
          {row.original.status === "ACTIVE" ? "Activated" : "Activate"}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 text-violet-400 hover:bg-violet-100"
            >
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-2xl shadow-lg p-2"
          >
            {row.original.status !== "ACTIVE" && (
              <DropdownMenuItem
                className="gap-3 text-violet-500 font-semibold"
                onClick={() =>
                  row.original.id &&
                  table.options.meta?.onActivate?.(row.original.id)
                }
              >
                <Shield className="h-5 w-5" /> Activate
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="gap-3 text-muted-foreground">
              <UserIcon className="h-5 w-5" /> View profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-muted-foreground">
              <Trash2 className="h-5 w-5" /> Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-muted-foreground">
              <Pencil className="h-5 w-5" /> Edit user
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-muted-foreground">
              <KeyRound className="h-5 w-5" /> Reset password
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 180,
    minSize: 120,
    meta: { align: "right" },
  },
];
