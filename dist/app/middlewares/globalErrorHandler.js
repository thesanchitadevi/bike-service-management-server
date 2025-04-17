"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const http_status_ts_1 = require("http-status-ts");
const AppError_1 = require("../errors/AppError");
const globalErrorHandler = (err, req, res, next) => {
    // Default values
    let statusCode = http_status_ts_1.HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong!";
    let stack;
    const meta = {};
    // Handle known error types
    if (err instanceof AppError_1.AppError) {
        // Handle custom application errors
        statusCode = err.statusCode;
        message = err.message;
        stack =
            process.env.NODE_ENV === "development" ? new Error().stack : undefined;
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        // Prisma validation errors
        statusCode = http_status_ts_1.HttpStatus.BAD_REQUEST;
        message = "Validation Error";
        stack = err.message;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        // Prisma operational errors
        switch (err.code) {
            case "P2002":
                statusCode = http_status_ts_1.HttpStatus.CONFLICT;
                message = "Duplicate entry violation";
                break;
            case "P2025":
                statusCode = http_status_ts_1.HttpStatus.NOT_FOUND;
                message = "Record not found";
                break;
            case "P2003":
                statusCode = http_status_ts_1.HttpStatus.BAD_REQUEST;
                message = "Foreign key constraint failed";
                break;
            default:
                statusCode = http_status_ts_1.HttpStatus.BAD_REQUEST;
                message = "Database operation failed";
        }
        stack = err.message;
        Object.assign(meta, err.meta);
    }
    else if (err instanceof Error) {
        // Generic JavaScript errors
        message = err.message;
        stack = err.stack;
    }
    // Response structure
    const response = Object.assign({ success: false, status: statusCode, message }, (process.env.NODE_ENV === "development" && { stack }));
    res.status(statusCode).json(response);
};
exports.default = globalErrorHandler;
