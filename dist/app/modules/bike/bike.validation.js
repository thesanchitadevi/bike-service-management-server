"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeValidationSchemas = void 0;
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        brand: zod_1.z.string().min(2, "Brand must be at least 2 characters"),
        model: zod_1.z.string().min(1, "Model is required"),
        year: zod_1.z.number().int().positive().min(1900, "Invalid manufacturing year"),
        customerId: zod_1.z.string().uuid("Invalid customer ID format"),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        brand: zod_1.z.string().min(2, "Brand must be at least 2 characters").optional(),
        model: zod_1.z.string().min(1, "Model is required").optional(),
        year: zod_1.z.number().int().positive().min(1900).optional(),
        customerId: zod_1.z.string().uuid("Invalid customer ID format").optional(),
    }),
});
exports.BikeValidationSchemas = {
    createValidation,
    updateValidation,
};
