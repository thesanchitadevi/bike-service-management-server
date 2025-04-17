import { z } from "zod";

const createValidation = z.object({
  body: z.object({
    bikeId: z.string().uuid("Invalid bike ID format"),
    serviceDate: z.coerce.date(),
    description: z.string().min(1, "Description is required"),
    status: z.enum(["pending", "in-progress", "done"]).default("pending"),
    completionDate: z.date().optional().nullable(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    status: z.enum(["pending", "in-progress", "done"]).optional(),
    description: z.string().optional(),
    completionDate: z.date().optional().nullable(),
  }),
});

const completeValidation = z.object({
  body: z.object({
    completionDate: z.string().optional(),
  }),
});

export const ServiceValidationSchemas = {
  createValidation,
  updateValidation,
  completeValidation,
};
