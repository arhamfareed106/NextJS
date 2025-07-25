import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { columns as pickupOrderColumns } from '@/components/carriage/columns';
import { Search } from '@/components/orders/filters/search';
import { StatusFilter } from '@/components/orders/filters/status-filter';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useGetPickupOrdersQuery, useCancelPickupOrderMutation } from '@/lib/api/hooks';
import { toast } from 'sonner';
import { Row } from '@tanstack/react-table';
import { CourierOrder } from '@/types';
import { ApiError } from '@/lib/api/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { CreatePickupOrderDialog } from './create-pickup-order-dialog';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PickupOrders() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmCancel, setConfirmCancel] = useState<{
    orderId: string;
  } | null>(null);
  const {
    data: pickupData,
    isLoading,
    error,
  } = useGetPickupOrdersQuery({
    query: {
      page: currentPage,
      per_page: 10,
    },
  });
  const cancelPickupOrder = useCancelPickupOrderMutation({
    onSuccess: () => {
      setConfirmCancel(null);
      toast.success('Pickup order cancelled successfully');
      queryClient.invalidateQueries({ queryKey: ['api', 'getPickupOrders'] });
    },
    onError: (error: ApiError) => {
      setConfirmCancel(null);
      toast.error(error.message || 'Failed to cancel pickup order');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const pickupOrders = pickupData?.data || [];
  const pickupPagination = pickupData?.meta;

  const handleCancelPickup = async (orderId: string) => {
    setConfirmCancel({ orderId });
  };

  const handleConfirmCancel = async () => {
    if (!confirmCancel) return;
    try {
      await cancelPickupOrder.mutateAsync({
        path: { id: confirmCancel.orderId },
      });
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  const columnsWithActions = [
    ...pickupOrderColumns,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: Row<CourierOrder> }) => {
        const orderId = row.getValue('id');
        const status = row.getValue('status');

        if (status === 'CANCELLED') {
          return null;
        }

        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCancelPickup(orderId as string)}
            disabled={cancelPickupOrder.isPending}
          >
            Cancel
          </Button>
        );
      },
    },
  ];

  return (
    <Card className="my-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pickup Orders</CardTitle>
          <div className="flex items-center gap-2">
            {/* <CreatePickupOrderDialog /> */}
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <DataTable
            data={pickupOrders}
            pagination={pickupPagination}
            columns={columnsWithActions}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>

      <Dialog open={!!confirmCancel} onOpenChange={() => setConfirmCancel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Pickup Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this pickup order? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmCancel(null)}>
              No, keep it
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancel} disabled={cancelPickupOrder.isPending}>
              Yes, cancel it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
