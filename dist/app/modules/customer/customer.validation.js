"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerValidationSchemas = void 0;
const zod_1 = require("zod");
const phoneValidation = zod_1.z.string().regex(/^\+?\d+(?:-\d+)*$/, // Allows optional +, numbers, and hyphens between digits
{
    message: "Phone number must contain numbers with optional hyphens between digits",
});
// Create validation schema
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
        email: zod_1.z.string().email("Invalid email format"),
        phone: phoneValidation,
    }),
});
// Update validation schema
const updateValidation = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters").optional(),
    phone: phoneValidation.optional(),
});
exports.CustomerValidationSchemas = {
    createValidation,
    updateValidation,
};
