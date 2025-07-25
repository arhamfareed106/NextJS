import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

export type Order = {
  id: number;
  identifier: string;
  status: string;
  order_amount: number;
  order_currency: string;
  packages: number;
  weight: number;
  receiver: {
    name: string;
    city: string;
    country_code: string;
  };
  created_at: string;
  updated_at: string;
  delivered_at: string | null;
  cancelled_at: string | null;
};

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
    header: "Order ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("identifier")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={getStatusVariant(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "order_amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("order_amount") as number;
      const currency = row.original.order_currency;
      return (
        <div className="font-medium">
          {amount.toFixed(2)} {currency}
        </div>
      );
    },
  },
  {
    accessorKey: "receiver",
    header: "Customer",
    cell: ({ row }) => {
      const receiver = row.original.receiver;
      return (
        <div>
          <div className="font-medium">{receiver.name}</div>
          <div className="text-sm text-muted-foreground">
            {receiver.city}, {receiver.country_code}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "packages",
    header: "Packages",
    cell: ({ row }) => {
      const packages = row.getValue("packages") as number;
      const weight = row.original.weight;
      return (
        <div>
          <div className="font-medium">{packages} pcs</div>
          <div className="text-sm text-muted-foreground">{weight} kg</div>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      return <div>{formatDate(row.getValue("created_at"))}</div>;
    },
  },
  {
    accessorKey: "delivered_at",
    header: "Delivered",
    cell: ({ row }) => {
      const deliveredAt = row.original.delivered_at;
      return <div>{deliveredAt ? formatDate(deliveredAt) : "-"}</div>;
    },
  },
];

function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "pending":
      return "secondary";
    case "confirmed":
      return "default";
    case "shipped":
      return "outline";
    case "delivered":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
}
