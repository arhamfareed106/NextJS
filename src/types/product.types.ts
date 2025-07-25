import { components } from "@/types/api";

// The product type as defined by the backend OpenAPI spec
export type ProductApi = components["schemas"]["Modification"];

// If you need UI-only fields, extend the API type
export type ProductUI = Omit<ProductApi, "id"> & {
  id: string;
  status?: boolean; // Example UI-only field
};
