"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_ts_1 = require("http-status-ts");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (_req, res, _next) => {
    res.status(http_status_ts_1.HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Resource not found",
        status: http_status_ts_1.HttpStatus.NOT_FOUND,
        stack: process.env.NODE_ENV === "development" ? new Error().stack : undefined,
    });
};
exports.default = notFound;
