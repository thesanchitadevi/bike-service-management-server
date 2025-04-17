import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "http-status-ts";
import { AppError } from "../errors/AppError";

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default values
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!";
  let stack: string | undefined;
  const meta = {};

  // Handle known error types
  if (err instanceof AppError) {
    // Handle custom application errors
    statusCode = err.statusCode;
    message = err.message;
    stack = process.env.NODE_ENV === "development" ? err.stack : undefined;
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    // Prisma validation errors
    statusCode = HttpStatus.BAD_REQUEST;
    message = "Validation Error";
    stack = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Prisma operational errors
    switch (err.code) {
      case "P2002":
        statusCode = HttpStatus.CONFLICT;
        message = "Duplicate entry violation";
        break;
      case "P2025":
        statusCode = HttpStatus.NOT_FOUND;
        message = "Record not found";
        break;
      case "P2003":
        statusCode = HttpStatus.BAD_REQUEST;
        message = "Foreign key constraint failed";
        break;
      default:
        statusCode = HttpStatus.BAD_REQUEST;
        message = "Database operation failed";
    }
    stack = err.message;
    Object.assign(meta, err.meta);
  } else if (err instanceof Error) {
    // Generic JavaScript errors
    message = err.message;
    stack = err.stack;
  }

  // Response structure
  const response = {
    success: false,
    status: statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack }),
  };

  res.status(statusCode).json(response);
};

export default globalErrorHandler;
