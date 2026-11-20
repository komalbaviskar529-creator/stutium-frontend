import { z } from "zod";
import { UNSERVICEABLE_MESSAGE, lookupPincode } from "@/lib/delivery";

export const addressSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email address"),
  address: z.string().trim().min(10, "Enter your full address"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode")
    .refine((v) => lookupPincode(v) !== null, UNSERVICEABLE_MESSAGE),
  city: z.string().trim().min(2, "Enter your city"),
  gstin: z
    .string()
    .trim()
    .regex(/^$|^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i, "Enter a valid 15-character GSTIN"),
});

export type AddressValues = z.infer<typeof addressSchema>;