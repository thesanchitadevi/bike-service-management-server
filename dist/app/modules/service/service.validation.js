"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidationSchemas = void 0;
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string().uuid("Invalid bike ID format"),
        serviceDate: zod_1.z.coerce.date(), // Date string or Date object coerce is used to convert string to date
        description: zod_1.z.string().min(1, "Description is required"),
        status: zod_1.z.enum(["pending", "in-progress", "done"]),
        completionDate: zod_1.z.coerce.date().optional().nullable(),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["pending", "in-progress", "done"]).optional(),
        description: zod_1.z.string().optional(),
        completionDate: zod_1.z.coerce.date().optional().nullable(),
    }),
});
const completeValidation = zod_1.z.object({
    body: zod_1.z.object({
        completionDate: zod_1.z.coerce.date().optional(),
    }),
});
exports.ServiceValidationSchemas = {
    createValidation,
    updateValidation,
    completeValidation,
};
