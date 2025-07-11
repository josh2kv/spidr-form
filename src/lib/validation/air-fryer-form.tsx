import { z } from "zod";

export const airFryerFormValuesSchema = z.object({
  firstName: z
    .string()
    .regex(/^[a-zA-Z]+$/, {
      message: "First name must contain only letters",
    })
    .min(1, { message: "First name is required" })
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be less than 50 characters" })
    .trim(),

  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, {
      message: "Last name must contain only letters",
    })
    .min(1, { message: "Last name is required" })
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be less than 50 characters" })
    .trim(),

  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^[+]?[1-9]\d{0,15}$/, {
      message: "Please enter a valid phone number (max 16 digits)",
    }),

  email: z.email(),

  cost: z
    .string()
    .min(1, { message: "Cost is required" })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Cost must be greater than $0",
    })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) <= 10000, {
      message: "Cost must be less than $10,000",
    }),

  pin: z
    .string()
    .min(1, { message: "PIN is required" })
    .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, {
      message: "PIN must be exactly 16 digits in format ####-####-####-####",
    }),
});

export type AirFryerFormValues = z.infer<typeof airFryerFormValuesSchema>;
