import { z } from "zod";

export const bookingRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120),
  email: z.string().trim().email("Please enter a valid email.").max(254),
  notes: z
    .string()
    .trim()
    .max(3000, "Notes must be 3000 characters or less.")
    .optional()
    .transform((value) => (value ? value : undefined)),
  selectedStartTime: z
    .string()
    .datetime({ message: "Please select a valid time." }),
  honeypot: z.string().max(200).optional(),
  formStartedAt: z.number().int().positive().optional(),
});

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
