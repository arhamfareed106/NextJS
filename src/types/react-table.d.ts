import type { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onMakeAdmin?: (userId: number) => Promise<void>;
    onActivate?: (userId: number) => void;
  }
}
