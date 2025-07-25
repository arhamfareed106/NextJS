// @/types/carriage.types.ts
import { Order, OrderStatus } from "./order.types";

export type VehicleStatus =
  | "delivered"
  | "on-the-way"
  | "waiting"
  | "returning";

export interface CarriageVehicle {
  id: string;
  vehicleNumber: string;
  status: VehicleStatus;
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  driver?: {
    id: string;
    name: string;
    phone: string;
  };
}

export interface CarriageOrder
  extends Pick<Partial<Order>, "id" | "orderNumber" | "customer" | "shipping"> {
  carriageId: string;
  vehicle?: CarriageVehicle;
  shippingNumber: string;
  startingRoute: string;
  endingRoute: string;
  status: VehicleStatus;
  duration: string;
  estimatedDeliveryTime: Date;
  actualDeliveryTime?: Date;
  trackingUpdates: CarriageTracking[];
}

export interface CarriageTracking {
  id: string;
  carriageOrderId: string;
  status: VehicleStatus;
  timestamp: Date;
  location: string;
  description: string;
}

export interface VehicleOverview {
  status: VehicleStatus;
  percentage: number;
  duration: string;
  totalVehicles: number;
}

export interface CarriageFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: VehicleStatus[];
  vehicle?: string;
  startingRoute?: string;
  endingRoute?: string;
}
