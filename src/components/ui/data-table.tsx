'use client';

import { useState, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  RowSelectionState,
  flexRender,
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  onRowClick?: (row: any) => void;
  meta?: any;
  rowProps?: (row: TData) => React.HTMLAttributes<HTMLTableRowElement>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPageChange,
  isLoading = false,
  onRowClick,
  meta,
  rowProps,
}: DataTableProps<TData, TValue>) {
  console.log(columns, 'datadata');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: pagination?.last_page || 1,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: (pagination?.current_page || 1) - 1,
        pageSize: pagination?.per_page || 10,
      },
    },
    meta,
  });

  const renderPaginationItems = useCallback(() => {
    if (!pagination) return null;

    const items = [];
    const maxVisiblePages = 5;
    const currentPage = pagination.current_page;
    const lastPage = pagination.last_page;

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <Button
          variant={currentPage === 1 ? 'outline' : 'ghost'}
          size="icon"
          onClick={() => onPageChange?.(1)}
          disabled={currentPage === 1 || isLoading}
        >
          1
        </Button>
      </PaginationItem>,
    );

    // Calculate start and end of visible pages
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(lastPage - 1, startPage + maxVisiblePages - 3);

    // Adjust start page if we're near the end
    if (endPage === lastPage - 1) {
      startPage = Math.max(2, endPage - maxVisiblePages + 3);
    }

    // Add ellipsis if needed
    if (startPage > 2) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <Button variant="ghost" size="icon" disabled>
            ...
          </Button>
        </PaginationItem>,
      );
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <Button
            variant={currentPage === i ? 'outline' : 'ghost'}
            size="icon"
            onClick={() => onPageChange?.(i)}
            disabled={currentPage === i || isLoading}
          >
            {i}
          </Button>
        </PaginationItem>,
      );
    }

    // Add ellipsis if needed
    if (endPage < lastPage - 1) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <Button variant="ghost" size="icon" disabled>
            ...
          </Button>
        </PaginationItem>,
      );
    }

    // Always show last page if there is more than one page
    if (lastPage > 1) {
      items.push(
        <PaginationItem key="last">
          <Button
            variant={currentPage === lastPage ? 'outline' : 'ghost'}
            size="icon"
            onClick={() => onPageChange?.(lastPage)}
            disabled={currentPage === lastPage || isLoading}
          >
            {lastPage}
          </Button>
        </PaginationItem>,
      );
    }

    return items;
  }, [pagination, onPageChange, isLoading]);

  return (
    <div className="space-y-4">
      <div className="rounded-md  ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}
                  onClick={() => onRowClick?.(row)}
                  {...(rowProps ? rowProps(row.original) : {})}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex   gap-2   md:items-center md:justify-between">
        <div className="   rounded-md text-center">
          <span className="text-sm text-[#777E90] text-center">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </span>
        </div>
        {pagination && (
          <div className="flex flex-col items-end gap-2 w-full md:w-auto">
            {/* <div className="flex gap-2 w-full md:w-auto">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="hidden md:block text-sm text-gray-500">
                  Showing {pagination.from} to {pagination.to} of {pagination.total} entries
                </div>
              </div>
            </div> */}
            <Pagination className="justify-end">
              <PaginationContent className="gap-4 ">
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="default"
                    className="gap-1 p-0 w-[40px] h-[41px] "
                    onClick={() => onPageChange?.(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1 || isLoading}
                  >
                    {/* <ChevronLeft className="h-4 w-4" /> */}
                    <Image src={'/icons/arrow-left.svg'} width={24} height={24} alt="" />
                    {/* <span>Previous</span> */}
                  </Button>
                </PaginationItem>
                {/* {renderPaginationItems()} */}
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="default"
                    className="gap-1 p-0 w-[40px] h-[41px] "
                    onClick={() => onPageChange?.(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page || isLoading}
                  >
                    {/* <span>Next</span> */}
                    <Image src={'/icons/arrow-left-blue.svg'} width={24} height={24} alt="" />

                    {/* <ChevronRight className="h-4 w-4" /> */}
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        <div className="hidden lg:block"></div>
      </div>
    </div>
  );
}
