"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeService = void 0;
const http_status_ts_1 = require("http-status-ts");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = require("../../errors/AppError");
const createBikeIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if customer exists
    const customerExists = yield prisma_1.default.customer.findUniqueOrThrow({
        where: { customerId: data.customerId },
    });
    if (!customerExists) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, "Customer not found");
    }
    // Check for existing bike with same identity
    const existingBike = yield prisma_1.default.bike.findFirst({
        where: {
            brand: data.brand,
            model: data.model,
            year: data.year,
            customerId: data.customerId,
        },
    });
    if (existingBike) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.CONFLICT, "This bike already exists for the customer");
    }
    const bike = prisma_1.default.bike.create({ data });
    return bike;
});
const getAllBikesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.bike.findMany({});
});
const getBikeByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield prisma_1.default.bike.findUniqueOrThrow({
        where: { bikeId: id },
        // include: { customer: true },
    });
    if (!bike)
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, "Bike not found");
    return bike;
});
const deleteBikeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield prisma_1.default.bike.delete({ where: { bikeId: id } });
    if (!bike)
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, "Bike not found");
    return bike;
});
exports.BikeService = {
    createBikeIntoDB,
    getAllBikesFromDB,
    getBikeByIdFromDB,
    deleteBikeFromDB,
};
