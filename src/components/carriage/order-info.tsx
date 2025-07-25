// @/components/carriage/order-info.tsx
import { CarriageOrder } from "@/types/carriage.types";

export function OrderInfo({ order }: { order: CarriageOrder }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
          <p className="mt-1 text-sm">{order.orderNumber}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Shipping Number</h3>
          <p className="mt-1 text-sm">{order.shippingNumber}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Status</h3>
          <p className="mt-1 text-sm capitalize">{order.status}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Duration</h3>
          <p className="mt-1 text-sm">{order.duration}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500">Customer</h3>
        <div className="mt-1 text-sm">
          <p>
            {order.customer?.firstName} {order.customer?.lastName}
          </p>
          <p>{order.customer?.email}</p>
          <p>{order.customer?.phone}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
        <div className="mt-1 text-sm">
          <p>{order.shipping?.address.city}</p>
          <p>
            {order.shipping?.address.city}, {order.shipping?.address.postalCode}
          </p>
          <p>{order.shipping?.address.country}</p>
        </div>
      </div>
    </div>
  );
}
