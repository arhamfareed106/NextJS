// types/form.ts
import { z } from "zod";

export interface PriceRange {
  from: string;
  to: string;
}

export const discountFormSchema = z
  .object({
    name: z.string(),
    category: z.string(),
    subcategory: z.string().optional(),
    subsubcategory: z.string().optional(),
    percent: z.string(),
    valid_from: z.date().optional(),
    valid_to: z.date().optional(),
    price_from: z.string(),
    price_to: z.string(),
  })
  .refine(
    (data) => {
      if (!data.price_from || !data.price_to) return true;
      return Number(data.price_from) <= Number(data.price_to);
    },
    {
      message: "From price must be less than To price",
      path: ["price_to"],
    }
  );

export type DiscountFormValues = z.infer<typeof discountFormSchema>;

export type DiscountFormSubmitValues = Omit<
  DiscountFormValues,
  "percent" | "price_from" | "price_to" | "valid_from" | "valid_to"
> & {
  percent: number;
  price_from: number;
  price_to: number;
  valid_from?: string;
  valid_to?: string;
};
