// types/table.ts
import { DateRange } from "react-day-picker";
import { OrderStatus } from "./order.types";
import { SortingState } from "@tanstack/react-table";

export interface FilterState {
  search: string;
  status: OrderStatus | "all";
  dateRange: DateRange | undefined;
  minPrice: string;
  maxPrice: string;
  pageSize: string;
}

export interface TableState {
  sorting: SortingState;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  globalFilter: string;
}
