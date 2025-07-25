// components/orders/table/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Download } from "lucide-react";
import Link from "next/link";
import { getStatusColor } from "@/lib/utils/status-colors";
import { formatDate } from "@/lib/utils/format-date";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Order>[] = [
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
    accessorKey: "identifier",
    header: "Order #",
    cell: ({ row }) => (
      <Link
        href={`/orders/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.original.identifier}
      </Link>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatDate(row.original.created_at),
  },
  {
    accessorKey: "receiver",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.receiver?.name}</div>
        <div className="text-sm text-gray-500">
          {row.original.receiver?.email}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const products = row.original.products || [];
      const firstTwo = products
        .slice(0, 2)
        .map(
          (product) =>
            `${product.product?.title || "Unknown"} (${product.quantity})`
        )
        .join(", ");

      return (
        <div className="max-w-[300px] truncate">
          {products.length <= 2
            ? firstTwo
            : `${firstTwo} +${products.length - 2} more`}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={getStatusColor(row.original.status || "")}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "order_amount",
    header: "Total",
    cell: ({ row }) =>
      `${
        row.original.order_currency || "€"
      }${row.original.order_amount?.toFixed(2)}`,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/orders/${row.original.id}`}>
          <Download className="h-4 w-4" />
        </Link>
      </Button>
    ),
  },
];
