import { z } from "zod";

export const companyInfoSchema = z.object({
  // Company Information
  company: z.string().min(1, "Company name is required"),
  companyCode: z.string().min(1, "Company code is required"),
  companyVatCode: z.string().optional(),
  companyAddress: z.string().min(1, "Company address is required"),

  // Pickup Address
  pickupAddress: z
    .object({
      country: z.string().min(1, "Pickup country is required"),
      city: z.string().min(1, "Pickup city is required"),
      street: z.string().min(1, "Pickup street is required"),
      streetNumber: z.string().min(1, "Pickup street number is required"),
      zipCode: z.string().min(1, "Pickup ZIP Code is required"),
    })
    .optional(), // Optional if hidden

  // Return Address
  returnAddress: z
    .object({
      country: z.string().min(1, "Return country is required"),
      city: z.string().min(1, "Return city is required"),
      street: z.string().min(1, "Return street is required"),
      streetNumber: z.string().min(1, "Return street number is required"),
      zipCode: z.string().min(1, "Return ZIP Code is required"),
    })
    .optional(), // Optional if hidden

  // Contacts
  contacts: z.object({
    name: z.string().min(1, "Contact name is required"),
    lastName: z.string().min(1, "Contact last name is required"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[0-9]{7,14}$/, "Invalid phone number"),
    email: z.string().email("Invalid email format"),
  }),

  // Bank Account
  bankAccount: z.object({
    nameOfBank: z.string().min(1, "Bank name is required"),
    bankIban: z
      .string()
      .min(1, "Bank IBAN is required")
      .regex(
        /^([A-Z]{2}[0-9]{2})(?=(?:[A-Z0-9]{11,30})?$)/,
        "Invalid IBAN format"
      ),
  }),
});

export type CompanyInfoFormValues = z.infer<typeof companyInfoSchema>;
