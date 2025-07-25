// src/components/company-profile-form.tsx
"use client";

import { useEffect, useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { companyInfoSchema } from "./company-info-schema";
import { CompanyInfoSection } from "./profile_fields/company-info";
import { PickupAddressSection } from "./profile_fields/pickup-address";
import { ReturnAddressSection } from "./profile_fields/return-address";
import { ContactsSection } from "./profile_fields/contact-section";
import { BankInfoSection } from "./profile_fields/bank-info";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/lib/api/hooks";
import { ApiError } from "@/lib/api/types";
import { toast } from "sonner";

type CompanyInfoFormValues = z.infer<typeof companyInfoSchema>;

export function CompanyProfileForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { data: profile, isLoading, error } = useGetUserProfileQuery();
  const { mutateAsync: updateProfile, isPending } =
    useUpdateUserProfileMutation({
      onError: (error: ApiError) => {
        setSubmitError(error.message);
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("Your profile has been updated successfully.");
      },
    });

  const form = useForm<CompanyInfoFormValues>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      company: "",
      companyCode: "",
      companyVatCode: "",
      companyAddress: "",
      pickupAddress: {
        country: "",
        city: "",
        street: "",
        streetNumber: "",
        zipCode: "",
      },
      returnAddress: {
        country: "",
        city: "",
        street: "",
        streetNumber: "",
        zipCode: "",
      },
      contacts: {
        name: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      },
      bankAccount: {
        nameOfBank: "",
        bankIban: "",
      },
    },
  });

  // Update form with profile data when it loads
  useEffect(() => {
    if (profile) {
      form.reset({
        company: profile.company_name || "",
        companyCode: profile.company_code || "",
        companyVatCode: profile.company_vat_code || "",
        companyAddress: profile.company_address || "",
        pickupAddress: {
          country: profile.pickup_country || "",
          city: profile.pickup_city || "",
          street: profile.pickup_street || "",
          streetNumber: profile.pickup_street_number || "",
          zipCode: profile.pickup_zip_code || "",
        },
        returnAddress: {
          country: profile.return_country || "",
          city: profile.return_city || "",
          street: profile.return_street || "",
          streetNumber: profile.return_street_number || "",
          zipCode: profile.return_zip_code || "",
        },
        contacts: {
          name: profile.name || "",
          lastName: profile.last_name || "",
          phoneNumber: profile.phone_number || "",
          email: profile.email || "",
        },
        bankAccount: {
          nameOfBank: profile.bank_name || "",
          bankIban: profile.iban || "",
        },
      });
    }
  }, [profile, form]);

  const onSubmit = useCallback(
    async (data: CompanyInfoFormValues) => {
      try {
        setSubmitError(null);

        // Type-safe validation
        const requiredFields = [
          { key: "company", label: "Company name", value: data.company },
          {
            key: "companyCode",
            label: "Company code",
            value: data.companyCode,
          },
          {
            key: "contacts.name",
            label: "Contact name",
            value: data.contacts.name,
          },
          {
            key: "contacts.lastName",
            label: "Contact last name",
            value: data.contacts.lastName,
          },
          {
            key: "contacts.email",
            label: "Contact email",
            value: data.contacts.email,
          },
        ];

        const missingFields = requiredFields.filter((field) => !field.value);

        if (missingFields.length > 0) {
          const errorMessage = `Please fill in the following required fields: ${missingFields
            .map((f) => f.label)
            .join(", ")}`;
          setSubmitError(errorMessage);
          return;
        }

        // Map form data to API format with explicit type casting
        const profileData = {
          company_name: data.company.trim(),
          company_code: data.companyCode.trim(),
          company_vat_code: (data.companyVatCode || "").trim(),
          company_address: (data.companyAddress || "").trim(),
          pickup_country: (data.pickupAddress?.country || "").trim(),
          pickup_city: (data.pickupAddress?.city || "").trim(),
          pickup_street: (data.pickupAddress?.street || "").trim(),
          pickup_street_number: (data.pickupAddress?.streetNumber || "").trim(),
          pickup_zip_code: (data.pickupAddress?.zipCode || "").trim(),
          return_country: (data.returnAddress?.country || "").trim(),
          return_city: (data.returnAddress?.city || "").trim(),
          return_street: (data.returnAddress?.street || "").trim(),
          return_street_number: (data.returnAddress?.streetNumber || "").trim(),
          return_zip_code: (data.returnAddress?.zipCode || "").trim(),
          name: data.contacts.name.trim(),
          last_name: data.contacts.lastName.trim(),
          phone_number: (data.contacts.phoneNumber || "").trim(),
          email: data.contacts.email.trim(),
          bank_name: (data.bankAccount?.nameOfBank || "").trim(),
          iban: (data.bankAccount?.bankIban || "").trim(),
        };

        await updateProfile(profileData);
      } catch (err) {
        // Error handling is now done in the mutation options
        console.error("Profile update error:", err);
      }
    },
    [updateProfile]
  );

  if (isLoading && !profile) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || "Failed to load profile data. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <CompanyInfoSection control={form.control} />
        <PickupAddressSection control={form.control} />
        <ReturnAddressSection control={form.control} />
        <ContactsSection control={form.control} />
        <BankInfoSection control={form.control} />

        <Button type="submit" disabled={isLoading || isPending}>
          {isPending ? "Updating..." : "Update profile"}
        </Button>
      </form>
    </Form>
  );
}
