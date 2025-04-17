import { z } from "zod";

const createValidation = z.object({
  body: z.object({
    brand: z.string().min(2, "Brand must be at least 2 characters"),
    model: z.string().min(1, "Model is required"),
    year: z.number().int().positive().min(1900, "Invalid manufacturing year"),
    customerId: z.string().uuid("Invalid customer ID format"),
  }),
});

const updateValidation = z.object({
  body: z.object({
    brand: z.string().min(2, "Brand must be at least 2 characters").optional(),
    model: z.string().min(1, "Model is required").optional(),
    year: z.number().int().positive().min(1900).optional(),
    customerId: z.string().uuid("Invalid customer ID format").optional(),
  }),
});

export const BikeValidationSchemas = {
  createValidation,
  updateValidation,
};
