import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CompanyInfoFormValues } from "../company-info-schema";
import { Control } from "react-hook-form";

type CompanyInfoSectionProps = {
  control: Control<CompanyInfoFormValues>;
};

export function CompanyInfoSection({ control }: CompanyInfoSectionProps) {
  return (
    <>
      <h2 className="font-bold">Company Information</h2>
      <div className="grid md:grid-cols-2 gap-primary">
        <FormField
          control={control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="companyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Code</FormLabel>
              <FormControl>
                <Input placeholder="Company Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="companyVatCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>VAT Code</FormLabel>
              <FormControl>
                <Input placeholder="VAT Code (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company address</FormLabel>
              <FormControl>
                <Input placeholder="Company address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
