// components/discount-management/discount-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PriceAdjustment } from "@/types";
import { useEffect, useState } from "react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  priceAdjustmentSchema,
  type PriceAdjustmentFormValues,
  type PriceAdjustmentSubmitValues,
} from "./validation";
import { Input } from "@/components/ui/input";
import {
  useGetProductCategoriesQuery,
  useCreatePriceAdjustmentMutation,
  useUpdatePriceAdjustmentMutation,
} from "@/lib/api/hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface DiscountFormProps {
  initialData?: PriceAdjustment;
  onSubmit?: (values: PriceAdjustmentSubmitValues) => void;
  onOpenChange?: (open: boolean) => void;
}

type CategoryStructure = {
  [key: string]: {
    [key: string]: string[];
  };
};

export function DiscountForm({
  initialData,
  onSubmit,
  onOpenChange,
}: DiscountFormProps) {
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    string | null
  >(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<
    string | null
  >(null);

  const { data: categories, isLoading, error } = useGetProductCategoriesQuery();
  const queryClient = useQueryClient();
  const createPriceAdjustment = useCreatePriceAdjustmentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["api", "getPriceAdjustments"],
      });
    },
  });
  const updatePriceAdjustment = useUpdatePriceAdjustmentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["api", "getPriceAdjustments"],
      });
    },
  });

  const form = useForm<PriceAdjustmentFormValues>({
    resolver: zodResolver(priceAdjustmentSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      subcategory: initialData?.subcategory || "",
      subsubcategory: initialData?.subsubcategory || "",
      percent: initialData?.percent?.toString() || "",
      valid_from: initialData?.valid_from
        ? new Date(initialData.valid_from)
        : undefined,
      valid_to: initialData?.valid_to
        ? new Date(initialData.valid_to)
        : undefined,
      price_from: initialData?.price_from?.toString() || "",
      price_to: initialData?.price_to?.toString() || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      setSelectedMainCategory(initialData.category || null);
      setSelectedSubCategory(initialData.subcategory || null);
      setSelectedSubSubCategory(initialData.subsubcategory || null);
    }
  }, [initialData]);

  const handleSelectOpen = (name: string, open: boolean) => {
    if (open) {
      setOpenSelect(name);
    } else if (openSelect === name) {
      setOpenSelect(null);
    }
  };

  const handleMainCategoryChange = (value: string) => {
    setSelectedMainCategory(value);
    setSelectedSubCategory(null);
    setSelectedSubSubCategory(null);
    form.setValue("category", value, { shouldValidate: true });
    form.setValue("subcategory", "");
    form.setValue("subsubcategory", "");
  };

  const handleSubCategoryChange = (value: string) => {
    if (value === "none") {
      setSelectedSubCategory(null);
      setSelectedSubSubCategory(null);
      form.setValue("subcategory", "");
      form.setValue("subsubcategory", "");
      return;
    }
    setSelectedSubCategory(value);
    setSelectedSubSubCategory(null);
    form.setValue("subcategory", value);
    form.setValue("subsubcategory", "");
  };

  const handleSubSubCategoryChange = (value: string) => {
    if (value === "none") {
      setSelectedSubSubCategory(null);
      form.setValue("subsubcategory", "");
      return;
    }
    setSelectedSubSubCategory(value);
    form.setValue("subsubcategory", value);
  };

  const handleSubmit = async (values: PriceAdjustmentFormValues) => {
    const finalValues: PriceAdjustmentSubmitValues = {
      ...values,
      percent: parseFloat(values.percent),
      price_from: parseFloat(values.price_from),
      price_to: parseFloat(values.price_to),
      valid_from: values.valid_from?.toISOString().split("T")[0],
      valid_to: values.valid_to?.toISOString().split("T")[0],
    };

    try {
      if (initialData?.id) {
        await updatePriceAdjustment.mutateAsync({
          path: { id: initialData.id },
          body: finalValues,
        });
        toast.success("Discount updated successfully");
      } else {
        await createPriceAdjustment.mutateAsync(finalValues);
        toast.success("Discount created successfully");
      }
      form.reset();
      onOpenChange?.(false);
      onSubmit?.(finalValues);
    } catch (error) {
      toast.error(
        initialData?.id
          ? "Failed to update discount"
          : "Failed to create discount"
      );
      console.error("Error with discount:", error);
    }
  };

  if (error) {
    return <div>Error loading categories: {error.message}</div>;
  }

  const categoryData = categories as CategoryStructure | undefined;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Name Input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categories Section */}
        <div className="grid grid-cols-3 gap-4">
          {/* Main Category Select */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={handleMainCategoryChange}
                  value={field.value}
                  open={openSelect === "mainCategory"}
                  onOpenChange={(open) =>
                    handleSelectOpen("mainCategory", open)
                  }
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoading ? "Loading..." : "Select category"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {!isLoading &&
                      categoryData &&
                      Object.keys(categoryData).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subcategory Select - Only shown when main category is selected */}
          {selectedMainCategory && categoryData && (
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    onValueChange={handleSubCategoryChange}
                    value={selectedSubCategory || "none"}
                    open={openSelect === "subCategory"}
                    onOpenChange={(open) =>
                      handleSelectOpen("subCategory", open)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {Object.keys(categoryData[selectedMainCategory]).map(
                        (subcategory) => (
                          <SelectItem key={subcategory} value={subcategory}>
                            {subcategory}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Subsubcategory Select - Only shown when subcategory is selected */}
          {selectedMainCategory && selectedSubCategory && categoryData && (
            <FormField
              control={form.control}
              name="subsubcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-subcategory</FormLabel>
                  <Select
                    onValueChange={handleSubSubCategoryChange}
                    value={selectedSubSubCategory || "none"}
                    open={openSelect === "subSubCategory"}
                    onOpenChange={(open) =>
                      handleSelectOpen("subSubCategory", open)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sub-subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {categoryData[selectedMainCategory][
                        selectedSubCategory
                      ].map((subsubcategory: string) => (
                        <SelectItem key={subsubcategory} value={subsubcategory}>
                          {subsubcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Percentage Input */}
        <FormField
          control={form.control}
          name="percent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percentage</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter percentage (-100 to 100)"
                  {...field}
                  min={-100}
                  max={100}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          {/* Date Range Picker */}
          <FormField
            control={form.control}
            name="valid_from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Validity Period</FormLabel>
                <FormControl>
                  <DateRangePicker
                    value={{
                      from: field.value,
                      to: form.getValues("valid_to"),
                    }}
                    onChange={(range) => {
                      if (range?.from) {
                        field.onChange(range.from);
                      }
                      if (range?.to) {
                        form.setValue("valid_to", range.to);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Range Form */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price_from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price From</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter minimum price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price_to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price To</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter maximum price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={
            createPriceAdjustment.isPending || updatePriceAdjustment.isPending
          }
        >
          {createPriceAdjustment.isPending || updatePriceAdjustment.isPending
            ? initialData
              ? "Updating..."
              : "Creating..."
            : initialData
            ? "Update discount"
            : "Add discount"}
        </Button>
      </form>
    </Form>
  );
}
