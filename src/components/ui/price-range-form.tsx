// components/ui/price-range-form.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import type { PriceRange } from "@/components/discount-management/form";

interface PriceRangeFormProps {
  value: PriceRange;
  onChange: (value: PriceRange) => void;
  error?: string;
}

export default function PriceRangeForm({
  value = { from: "", to: "" },
  onChange,
  error,
}: PriceRangeFormProps) {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, from: e.target.value });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, to: e.target.value });
  };

  return (
    <FormItem className="flex flex-col">
      {/* <FormLabel>Price Range</FormLabel> */}
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="fromPrice" className="text-sm">
            Price Range (From)
          </Label>
          <div className="relative flex items-center">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              $
            </div>
            <FormControl>
              <Input
                id="fromPrice"
                type="number"
                value={value.from}
                onChange={handleFromChange}
                className="pl-5"
                min={0}
                placeholder="0"
              />
            </FormControl>
          </div>
        </div>

        <div className="flex-1 space-y-1.5">
          <Label htmlFor="toPrice" className="text-sm">
            (To)
          </Label>
          <div className="relative flex items-center">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              $
            </div>
            <FormControl>
              <Input
                id="toPrice"
                type="number"
                value={value.to}
                onChange={handleToChange}
                className="pl-5"
                min={0}
                placeholder="Max"
              />
            </FormControl>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-2 py-2">
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}
    </FormItem>
  );
}
