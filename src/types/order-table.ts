// types/order-table.ts
import { Order } from "./order.types";

/**
 * Sorting direction for table fields.
 */
export type SortDirection = "asc" | "desc";

/**
 * Represents the state of a table view, including sorting, pagination, and filters.
 */
export interface TableState {
  /** Current sorting settings for the table. */
  sorting: {
    /** Field used for sorting. */
    field: keyof Order;
    /** Direction of sorting, ascending or descending. */
    direction: SortDirection;
  };
  /** Pagination settings for the table. */
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  /** Filters applied to individual columns. */
  columnFilters: {
    id: string;
    value: any;
  }[];
}
