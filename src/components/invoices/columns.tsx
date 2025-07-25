// components/invoices/columns.tsx
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Invoice } from '@/types/invoice.types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'number',
    header: () => <div className="text-left">Number</div>,
  },
  {
    accessorKey: 'total',
    header: () => <div className="text-left">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('total'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'issuedDate',
    header: () => <div className="text-left">Issued Date</div>,
    cell: ({ row }) => {
      return <div>{new Date(row.getValue('issuedDate')).toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const status: string = row.getValue('status');
      return (
        <Badge
          className={
            status === 'paid'
              ? 'bg-green-100 text-green-800'
              : status === 'overdue'
              ? 'bg-red-100 text-red-800'
              : 'bg-orange-100 text-orange-800'
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-left">Action</div>,

    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <Link href={`/invoices/${row.original.id}`}>
            <Button variant="ghost" size="sm">
              <Image src={'/icons/eye-grey.svg'} width={24} height={24} alt="" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            <Image src={'/icons/document-download.svg'} width={24} height={24} alt="" />
          </Button>
        </div>
      );
    },
  },
];
