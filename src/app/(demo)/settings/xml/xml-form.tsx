"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  useGetProductCatalogsQuery,
  useAddProductCatalogMutation,
} from "@/lib/api/hooks";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const xmldataFormSchema = z.object({
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .min(1),
});

type XMLDataFormValues = z.infer<typeof xmldataFormSchema>;

const defaultValues: Partial<XMLDataFormValues> = {
  urls: [{ value: "" }, { value: "" }],
};

export function XMLForm() {
  const {
    data: productCatalogs,
    isLoading,
    error,
  } = useGetProductCatalogsQuery();
  const { mutate: addProductCatalog, isPending: isUpdating } =
    useAddProductCatalogMutation();

  const form = useForm<XMLDataFormValues>({
    resolver: zodResolver(xmldataFormSchema),
    defaultValues,
  });

  const { fields } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  // Update form with loaded data
  useEffect(() => {
    if (productCatalogs) {
      form.reset({
        urls: [
          { value: productCatalogs.products_xml_url || "" },
          { value: productCatalogs.stock_prices_xml_url || "" },
        ],
      });
    }
  }, [productCatalogs, form]);

  async function onSubmit(data: XMLDataFormValues) {
    try {
      await addProductCatalog({
        products_xml_url: data.urls[0].value,
        stock_prices_xml_url: data.urls[1].value,
      });

      toast.success("XML URLs have been updated successfully");
    } catch (error) {
      toast.error("Failed to update XML URLs. Please try again.");
    }
  }

  if (isLoading && !productCatalogs) {
    return <div>Loading...</div>;
  }

  if (error && !productCatalogs) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || "Failed to load XML URLs. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Make sure your XML links are not expired.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={
                        index === 0 ? "Product XML" : "Stock prices XML"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button type="submit" disabled={isLoading || isUpdating}>
          {isUpdating ? "Updating..." : "Update XML URLs"}
        </Button>
      </form>
    </Form>
  );
}
