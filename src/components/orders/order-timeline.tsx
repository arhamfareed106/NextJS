// components/orders/order-timeline.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/types';

interface OrderTimelineProps {
  order: Order;
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  // Generate timeline events based on order status and dates
  const generateTimelineEvents = (order: Order) => {
    const events = [
      {
        title: 'Order placed',
        description: `Order ${order.data.identifier} has been placed successfully`,
        date: new Date(order.data.created_at || ''),
        status: 'completed' as const,
      },
    ];

    if (order.data.confirmed) {
      events.push({
        title: 'Payment confirmed',
        description: `Payment of €${order.data.order_amount?.toFixed(2) || '0.00'} received`,
        date: new Date(order.data.updated_at || ''),
        status: 'completed' as const,
      });
    }

    if (order.data.shipment_barcode) {
      events.push({
        title: 'Shipment created',
        description: `Tracking number: ${order.data.shipment_barcode}`,
        date: new Date(order.data.updated_at || ''),
        status: 'completed' as const,
      });
    }

    if (order.data.status === 'Out of delivery') {
      events.push({
        title: 'Out for delivery',
        description: 'Package is out for delivery',
        date: new Date(),
        status: 'completed' as const,
      });
    }

    if (order.data.delivered_at) {
      events.push({
        title: 'Delivered',
        description: 'Package has been delivered',
        date: new Date(order.data.delivered_at),
        status: 'completed' as const,
      });
    }

    return events.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const timeline = generateTimelineEvents(order);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {timeline.map((event, index) => (
            <div key={index} className="flex gap-4 pb-8 last:pb-0">
              <div className="relative">
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 ${
                    event.status === 'completed'
                      ? 'bg-primary'
                      : event.status === 'current'
                      ? 'bg-primary'
                      : 'bg-gray-300'
                  }`}
                />
                {index !== timeline.length - 1 && <div className="absolute top-4 left-1.5 w-px h-full bg-gray-200" />}
              </div>
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">{event.description}</p>
                <p className="text-sm text-gray-400 mt-1">{event.date.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
