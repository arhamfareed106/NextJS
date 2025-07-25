// components/discount-management/discount-table.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { createColumns } from "./columns";
import { PriceAdjustment } from "@/types";
import { useResponsiveColumns } from "@/hooks/use-responsive-columns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDeletePriceAdjustmentMutation } from "@/lib/api/hooks";
import { toast } from "sonner";

interface DiscountTableProps {
  data: PriceAdjustment[];
  onEdit: (discount: PriceAdjustment) => void;
  pagination?: {
    currentPage: number;
    lastPage: number;
    total: number;
    perPage: number;
  };
  onPageChange?: (page: number) => void;
  refetch?: () => void;
}

export function DiscountTable({
  data,
  onEdit,
  pagination,
  onPageChange,
  refetch,
}: DiscountTableProps) {
  const columnVisibility = useResponsiveColumns();

  console.log("Table Data:", {
    dataLength: data?.length,
    pagination,
    start: pagination
      ? (pagination.currentPage - 1) * pagination.perPage + 1
      : 0,
    end: pagination
      ? Math.min(pagination.currentPage * pagination.perPage, pagination.total)
      : 0,
    total: pagination?.total,
  });

  const deleteMutation = useDeletePriceAdjustmentMutation({
    onSuccess: (response: { data?: { message?: string } }) => {
      toast.success(
        response.data?.message || "Price adjustment deleted successfully"
      );
      if (refetch) refetch();
    },
    onError: (error: Error) => {
      toast.error("Failed to delete price adjustment: " + error.message);
    },
  });

  const handleDelete = (discount: PriceAdjustment) => {
    if (!discount.id) {
      toast.error("Invalid discount ID");
      return;
    }
    deleteMutation.mutate({ path: { id: discount.id } });
  };

  const columns = createColumns({ onEdit, onDelete: handleDelete });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility,
      ...(pagination && {
        pagination: {
          pageIndex: pagination.currentPage - 1,
          pageSize: pagination.perPage,
        },
      }),
    },
    ...(pagination && {
      pageCount: pagination.lastPage,
      manualPagination: true,
      onPaginationChange: onPageChange
        ? (updater) => {
            if (typeof updater === "function") {
              const newState = updater({
                pageIndex: pagination.currentPage - 1,
                pageSize: pagination.perPage,
              });
              onPageChange(newState.pageIndex + 1);
            }
          }
        : undefined,
    }),
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No discounts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && onPageChange && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {data.length > 0 ? (
              <>
                Showing{" "}
                {Math.max(
                  1,
                  (pagination.currentPage - 1) * pagination.perPage + 1
                )}{" "}
                to{" "}
                {Math.min(
                  pagination.currentPage * pagination.perPage,
                  data.length
                )}{" "}
                of {data.length} entries
              </>
            ) : (
              "No entries found"
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {data.length > 0 ? (
                <>
                  Page {Math.max(1, pagination.currentPage)} of{" "}
                  {Math.max(1, Math.ceil(data.length / pagination.perPage))}
                </>
              ) : (
                "No pages"
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onPageChange(Math.max(1, pagination.currentPage - 1))
                }
                disabled={pagination.currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onPageChange(
                    Math.min(
                      Math.ceil(data.length / pagination.perPage),
                      pagination.currentPage + 1
                    )
                  )
                }
                disabled={
                  pagination.currentPage >=
                  Math.ceil(data.length / pagination.perPage)
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {deleteMutation.isPending && (
        <div className="text-sm text-muted-foreground">Deleting...</div>
      )}
    </div>
  );
}
