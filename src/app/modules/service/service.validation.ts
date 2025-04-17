import { z } from "zod";

const createValidation = z.object({
  body: z.object({
    bikeId: z.string().uuid("Invalid bike ID format"),
    serviceDate: z.coerce.date(), // Date string or Date object coerce is used to convert string to date
    description: z.string().min(1, "Description is required"),
    status: z.enum(["pending", "in-progress", "done"]),
    completionDate: z.coerce.date().optional().nullable(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    status: z.enum(["pending", "in-progress", "done"]).optional(),
    description: z.string().optional(),
    completionDate: z.coerce.date().optional().nullable(),
  }),
});

const completeValidation = z.object({
  body: z.object({
    completionDate: z.coerce.date().optional(),
  }),
});

export const ServiceValidationSchemas = {
  createValidation,
  updateValidation,
  completeValidation,
};
