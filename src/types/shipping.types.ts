import { Address } from "./customer.types";

// Shipping details
export interface ShippingDetails {
  method: "Standard" | "Express" | "Next Day";
  address: Address;
  cost: number;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
}

// Payment details
export interface PaymentDetails {
  method: "Credit Card" | "PayPal" | "Bank Transfer";
  status: "Pending" | "Completed" | "Failed" | "Refunded";
  transactionId?: string;
  paidAmount: number;
  paidAt?: Date;
}
