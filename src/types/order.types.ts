import { Customer } from "./customer.types";
import { PaymentDetails, ShippingDetails } from "./shipping.types";
import { Order as ApiOrder } from "./index";

// Order status types
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

// Product in order (extends from base Product)
export interface OrderItem {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
  orderedQty: number;
  priceAtOrder: number;
  subtotal: number;
}

// Main Order interface
export interface Order
  extends Omit<ApiOrder, "id" | "created_at" | "updated_at"> {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  shipping: ShippingDetails;
  payment: PaymentDetails;
}

// Order tracking/history entry
export interface OrderTracking {
  id: string;
  orderId: string;
  status: OrderStatus;
  timestamp: Date;
  location?: string;
  description: string;
}

// Order filters
export interface OrderFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: OrderStatus[];
  customer?: string;
  minAmount?: number;
  maxAmount?: number;
}

// Order summary/stats
export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<OrderStatus, number>;
}
