// components/invoices/data-table.tsx
'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import DateDropdown from '../blocks/date-dropdown';
import SingleDateDropdown from '../blocks/SingleDateDropdown';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="relative  lg:hidden w-full">
        <Image
          width={18}
          height={18}
          src={'/icons/search-normal.svg'}
          alt=""
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
        />
        <Input
          placeholder="Search invoice ..."
          value={(table.getColumn('number')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('number')?.setFilterValue(event.target.value)}
          className={cn('pl-10 h-[49px]')}
        />
      </div>
      <div className=" grid grid-cols-2 lg:flex items-center   gap-4">
        <div className="relative hidden lg:block max-w-[196px] w-full">
          <Image
            width={18}
            height={18}
            src={'/icons/search-normal.svg'}
            alt=""
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
          />
          <Input
            placeholder="Search invoice ..."
            value={(table.getColumn('number')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('number')?.setFilterValue(event.target.value)}
            className={cn('pl-10 h-[49px]')}
          />
        </div>
        <Select
          value={(table.getColumn('status')?.getFilterValue() as string) ?? ''}
          onValueChange={(value) => table.getColumn('status')?.setFilterValue(value)}
        >
          <SelectTrigger className=" w-full lg:w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <SingleDateDropdown />
      </div>
      <div className="rounded-md ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => {
                  const isFirst = i === 0;
                  const isLast = i === headerGroup.headers.length - 1;

                  return (
                    <TableHead
                      key={header.id}
                      className={`${isFirst ? 'rounded-l-lg' : ''} ${isLast ? 'rounded-r-lg' : ''}`}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
