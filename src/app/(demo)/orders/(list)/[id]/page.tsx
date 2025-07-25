// app/orders/[id]/page.tsx
'use client';
import { notFound } from 'next/navigation';
import { OrderDetailsView } from '@/components/orders/order-details-view';
import { OrderTimeline } from '@/components/orders/order-timeline';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, PrinterIcon } from 'lucide-react';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import Breadcrumbs from '@/components/wrappers/breadcrumbs';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useGetOrderByIdQuery, useCancelOrderMutation, useConfirmOrderMutation } from '@/lib/api/hooks';
import { use } from 'react';
import { Order } from '@/types';

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function OrderDetailsPage(props: OrderDetailsPageProps) {
  const params = use(props.params);
  console.log('Order ID from params:', props);

  const {
    data: order,
    isLoading,
    error,
  } = useGetOrderByIdQuery({
    path: { id: params.id },
  });

  console.log('API Response:', { order, isLoading, error });
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrderMutation();
  const { mutate: confirmOrder, isPending: isConfirm } = useConfirmOrderMutation();

  if (isLoading) {
    console.log('Loading state triggered');
    return <div>Loading...</div>;
  }
  if (error) {
    console.error('Error state triggered:', error);
    return <div>Error: {error.message}</div>;
  }

  if (!order) {
    console.log('No order data found, triggering notFound');
    return notFound();
  }

  console.log('Found order:', order);

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Orders List', href: '/orders' },
    {
      label: `Order ${order.identifier}`,
      href: `/orders/${order.id}`,
    },
  ];

  const handleCancelOrder = async () => {
    try {
      await cancelOrder({ path: { id: parseInt(params.id) } });
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      await confirmOrder({ path: { id: parseInt(params.id) } });
    } catch (error) {
      console.error('Failed to Confirm order:', error);
    }
  };
  return (
    <ContentLayout title={`Order ${order.identifier}`}>
      {/* <Breadcrumbs items={breadcrumbItems} />
      <Separator className="py-2" /> */}
      <div className="flex flex-col gap-[30px]">
        {/* <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
        </div> */}

        <div className="p-7 customShadow rounded-[10px] bg-white flex justify-between items-center ">
          <div className="max-w-[370px] w-full flex flex-col gap-2.5">
            <div className="flex gap-[14px] items-center">
              <h2 className="font-bold text-[24px] text-foreground">Order {order.identifier}</h2>
              <span className="max-w-[58px] w-full  h-[32px] rounded-[10px] bg-[#DDF6E8] flex justify-center items-center text-sm font-medium text-[#2DC47B] ">
                Paid
              </span>
              <span className="max-w-[118px] w-full  h-[32px] rounded-[10px] bg-[#E9E7FD] flex justify-center items-center text-sm font-medium text-[#7367F0] ">
                {order.data.status}
              </span>
            </div>
            <p className="text-[#777E90] font-medium text-[13px]">
              {new Date(order.data.created_at || '').toLocaleString()}
            </p>
          </div>
          <div className=" hidden lg:flex gap-[30px]">
            <Button variant="destructive" onClick={handleCancelOrder} disabled={isCancelling}>
              {isCancelling ? 'Cancelling...' : 'Cancel Order'}
            </Button>
            <Button variant={'secondary'}>Send a product</Button>
            <Button onClick={handleConfirmOrder} disabled={isConfirm}>
              {isConfirm ? 'Confirming...' : 'Confirm the order'}
            </Button>
          </div>
        </div>
        <div className="customShadow lg:hidden rounded-[15px] p-5 bg-white">
          <div className="  grid grid-cols-3 gap-5">
            <Button variant="destructive" className="text-[9px]" onClick={handleCancelOrder} disabled={isCancelling}>
              {isCancelling ? 'Cancelling...' : 'Cancel Order'}
            </Button>
            <Button variant={'secondary'} className="text-[9px]">
              Send a product
            </Button>
            <Button onClick={handleConfirmOrder} disabled={isConfirm}>
              {isConfirm ? 'Confirming...' : 'Confirm'}
            </Button>
          </div>
        </div>

        <OrderDetailsView order={order} />
      </div>
    </ContentLayout>
  );
}
