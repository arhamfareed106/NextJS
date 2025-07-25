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

export function BankInfoSection({ control }: CompanyInfoSectionProps) {
  return (
    <>
      <h2 className="font-bold">Bank Information</h2>
      <div className="grid md:grid-cols-2 gap-primary">
        <FormField
          control={control}
          name="bankAccount.nameOfBank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Bank Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="bankAccount.bankIban"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IBAN</FormLabel>
              <FormControl>
                <Input placeholder="Bank IBAN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
