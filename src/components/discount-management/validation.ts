// components/discount-management/validation.ts
import { z } from "zod";

export interface PriceRange {
  from: string;
  to: string;
}

export const priceAdjustmentSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().optional(),
    subsubcategory: z.string().optional(),
    percent: z
      .string()
      .min(1, "Percentage is required")
      .refine((val) => {
        const num = parseInt(val);
        return !isNaN(num) && num >= -100 && num <= 100;
      }, "Percentage must be between -100 and 100"),
    valid_from: z.date({
      required_error: "Start date is required",
      invalid_type_error: "Invalid start date",
    }),
    valid_to: z.date({
      required_error: "End date is required",
      invalid_type_error: "Invalid end date",
    }),
    price_from: z.string().min(1, "From price is required"),
    price_to: z.string().min(1, "To price is required"),
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
  )
  .refine(
    (data) => {
      if (!data.valid_from || !data.valid_to) return true;
      return data.valid_from <= data.valid_to;
    },
    {
      message: "Start date must be before or equal to end date",
      path: ["valid_to"],
    }
  );

export type PriceAdjustmentFormValues = z.infer<typeof priceAdjustmentSchema>;

export type PriceAdjustmentSubmitValues = Omit<
  PriceAdjustmentFormValues,
  "percent" | "price_from" | "price_to" | "valid_from" | "valid_to"
> & {
  percent: number;
  price_from: number;
  price_to: number;
  valid_from?: string;
  valid_to?: string;
};
