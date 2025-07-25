// productColumns.ts
import Image from 'next/image';
import { Column, ColumnDef } from '@tanstack/react-table';
import { ProductUI } from '@/types/product.types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

// this is a wrapper (helper) to customize header to be sortable
const renderHeader = (column: Column<ProductUI>, buttonName: string) => {
  const sortDirection = column.getIsSorted() === 'asc';
  return (
    <Button className="text-right pl-0" variant="ghost" onClick={() => column.toggleSorting(sortDirection)}>
      {buttonName}

      {/* 
        Sorting  resolver to show proper sorting icons - Up od Down 
        i f column is affecting th overall sorting
        and UpDown if columns is not actively affecting the sorting
      */}
      {column.getIsSorted() ? (
        sortDirection ? (
          <ArrowDown className="ml-2 h-3 w-3 text-black" />
        ) : (
          <ArrowUp className="ml-2 h-3 w-3 text-black" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-3 w-3" />
      )}
    </Button>
  );
};

export const columns: ColumnDef<ProductUI>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
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
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: 'title',
    header: ({ column }) => renderHeader(column, 'Name'),
    cell: ({ row }) => (
      <div className="font-medium flex gap-3">
        <Image
          src={'/icons/Rectangle 12.svg'}
          alt={'ffd'}
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
        {row.getValue('title')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => renderHeader(column, 'Category'),
    cell: ({ row }) => (
      <Badge variant="secondary" className="px-4 py-2">
        {row.getValue('category')}
      </Badge>
    ),
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => <div>{row.getValue('sku')}</div>,
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => renderHeader(column, 'Quantity'),
    cell: ({ row }) => <div className="text-lef">{row.getValue('stock')}</div>,
  },
  {
    accessorKey: 'price_after_discount',
    header: ({ column }) => renderHeader(column, 'Price'),
    cell: ({ row }) => {
      const price = row.getValue('price_after_discount') || 0;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(parseFloat(price.toString()));

      return <div className="text-left">{formatted}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Switch checked={row.getValue('status')} />,
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const product = row.original;

  //     return (<div className="flex gap-4">
  //       <Button variant="ghost" size="icon">
  //         <Image src={'/icons/edit-2.svg'} alt='edit' width={24} height={24} />
  //       </Button>
  //       <Button variant="ghost" size="icon">
  //         <Image src={'/icons/bag-cross.svg'} alt='delete' width={24} height={24} />
  //       </Button>
  //     </div>
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(product.sku || "")}
  //           >
  //             Copy SKU
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View product details</DropdownMenuItem>
  //           <DropdownMenuItem className="text-red-400">Delete</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
