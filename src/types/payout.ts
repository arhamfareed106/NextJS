// types/payout.ts
export type PayoutStatus = "Paid" | "Pending";

export interface Payout {
  id: string;
  name: string;
  email: string;
  status: PayoutStatus;
  amount: number;
  paymentDate?: string;
}

export interface PayoutFilters {
  query?: string;
  status?: PayoutStatus | "all";
}

export interface PayoutTableProps {
  data: Payout[];
  filters: PayoutFilters;
  onFilterChange: (filters: PayoutFilters) => void;
}
