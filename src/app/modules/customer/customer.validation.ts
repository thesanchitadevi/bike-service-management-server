import { z } from "zod";

const phoneValidation = z.string().regex(
  /^\+?\d+(?:-\d+)*$/, // Allows optional +, numbers, and hyphens between digits
  {
    message:
      "Phone number must contain numbers with optional hyphens between digits",
  }
);

// Create validation schema
const createValidation = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    phone: phoneValidation,
  }),
});

// Update validation schema
const updateValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: phoneValidation.optional(),
});

export const CustomerValidationSchemas = {
  createValidation,
  updateValidation,
};
