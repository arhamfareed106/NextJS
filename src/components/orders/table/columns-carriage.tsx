// components/orders/table/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Download } from 'lucide-react';
import Link from 'next/link';
import { getStatusColor } from '@/lib/utils/status-colors';
import { formatDate } from '@/lib/utils/format-date';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

export const columns: ColumnDef<Order>[] = [
  {
    id: 'select',
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
    accessorKey: 'identifier',
    header: 'Order #',
    cell: ({ row }) => (
      <Link href={`/orders/${row.original.id}`} className="font-medium hover:underline">
        {row.original.identifier}
      </Link>
    ),
  },
  {
    accessorKey: 'shipment_barcode',
    header: 'Shipment #',
    cell: ({ row }) => row.original.shipment_barcode || '-',
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatDate(row.original.created_at),
  },

  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant="success" className={getStatusColor(row.original.status || '')}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'order_amount',
    header: 'Total',
    cell: ({ row }) => `${row.original.order_currency || '€'}${row.original.order_amount?.toFixed(2)}`,
  },

  {
    id: 'actions',
    cell: ({ row }) => (
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/orders/${row.original.id}`}>
          <Image src={'/icons/document-download.svg'} width={24} height={24} alt="" />
        </Link>
      </Button>
    ),
  },
];
