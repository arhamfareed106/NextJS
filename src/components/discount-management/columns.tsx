// components/discount-management/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { PriceAdjustment } from '@/types';
import Image from 'next/image';

interface ColumnProps {
  onEdit: (discount: PriceAdjustment) => void;
  onDelete: (discount: PriceAdjustment) => void;
}

export const createColumns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<PriceAdjustment>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="px-0">
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.getValue('category') as string;
      const subCategory = row.original.subcategory;
      const subSubCategory = row.original.subsubcategory;

      return (
        <div className="flex items-center gap-1 text-sm min-w-[120px] max-w-full">
          <span className="font-medium truncate">{category}</span>
          {subCategory && (
            <>
              <span className="text-muted-foreground shrink-0">/</span>
              <span className="text-muted-foreground truncate">{subCategory}</span>
            </>
          )}
          {subSubCategory && (
            <>
              <span className="text-muted-foreground shrink-0">/</span>
              <span className="text-muted-foreground truncate">{subSubCategory}</span>
            </>
          )}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: 'percent',
    header: 'Percentage',
    cell: ({ row }) => {
      return <div className="text-green-600">{row.getValue('percent')}%</div>;
    },
    enableHiding: true,
  },
  {
    accessorKey: 'price_from',
    header: 'Price From',
    cell: ({ row }) => {
      const price = row.getValue('price_from');
      return <div>€{Number(price).toFixed(2)}</div>;
    },
    enableHiding: true,
  },
  {
    accessorKey: 'price_to',
    header: 'Price To',
    cell: ({ row }) => {
      const price = row.getValue('price_to');
      return <div>€{Number(price).toFixed(2)}</div>;
    },
    enableHiding: true,
  },
  {
    accessorKey: 'valid_from',
    header: 'Valid From',
    cell: ({ row }) => {
      const date = row.getValue('valid_from');
      return <div>{date ? new Date(date as string).toLocaleDateString() : '-'}</div>;
    },
    enableHiding: true,
  },
  {
    accessorKey: 'valid_to',
    header: 'Valid To',
    cell: ({ row }) => {
      const date = row.getValue('valid_to');
      return <div>{date ? new Date(date as string).toLocaleDateString() : '-'}</div>;
    },
    enableHiding: true,
  },
  {
    id: 'actions',
    header: 'Actions',

    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(row.original)} aria-label="Edit">
            <Image src={'/icons/edit-2.svg'} width={24} height={24} alt="edit" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(row.original)} aria-label="Delete">
            <Image src={'/icons/bag-cross.svg'} width={24} height={24} alt="edit" />
          </Button>
        </div>
      );
    },
    enableHiding: true,
  },
];
