import { z } from "zod";

export const BOOKING_BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000-$3,000",
  "$3,000-$7,000",
  "$7,000+",
  "Not sure yet",
] as const;

const optionalTrimmedString = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined));

const optionalWebsiteUrl = z
  .string()
  .trim()
  .optional()
  .transform((value) => {
    if (!value) return undefined;
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  })
  .refine(
    (value) => !value || /^https?:\/\/.+\..+/.test(value),
    "Please enter a valid website URL.",
  );

export const bookingRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120),
  email: z.string().trim().email("Please enter a valid email.").max(254),
  businessName: optionalTrimmedString,
  websiteUrl: optionalWebsiteUrl,
  projectDescription: z
    .string()
    .trim()
    .min(20, "Please share a little more about the project.")
    .max(3000),
  budgetRange: z.enum(BOOKING_BUDGET_OPTIONS).optional(),
  selectedStartTime: z
    .string()
    .datetime({ message: "Please select a valid time." }),
  honeypot: z.string().max(200).optional(),
  formStartedAt: z.number().int().positive().optional(),
});

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
