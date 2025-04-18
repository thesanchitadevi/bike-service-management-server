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
exports.ServiceRecordService = void 0;
const http_status_ts_1 = require("http-status-ts");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = require("../../errors/AppError");
const client_1 = require("@prisma/client");
const createServiceIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const bikeExists = yield prisma_1.default.bike.findUniqueOrThrow({
        where: { bikeId: data.bikeId },
    });
    if (!bikeExists) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, "Bike not found");
    }
    const service = yield prisma_1.default.serviceRecord.create({
        data: Object.assign(Object.assign({}, data), { status: data.status.toUpperCase().replace("-", "_") }),
    });
    return Object.assign(Object.assign({}, service), { status: service.status.toLowerCase().replace("_", "-") });
});
const getAllServicesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield prisma_1.default.serviceRecord.findMany({});
    return services.map((service) => (Object.assign(Object.assign({}, service), { status: service.status.toLowerCase().replace("_", "-") })));
});
const getServiceByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.serviceRecord.findUniqueOrThrow({
        where: { serviceId: id },
    });
    if (!service) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, "Service not found");
    }
    return Object.assign(Object.assign({}, service), { status: service.status.toLowerCase().replace("_", "-") });
});
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.serviceRecord.findUniqueOrThrow({
        where: { serviceId: id },
    });
    const deletedService = yield prisma_1.default.serviceRecord.delete({
        where: { serviceId: id },
    });
    return deletedService;
});
const markServiceComplete = (id, completionDate) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.serviceRecord.findUnique({
        where: { serviceId: id },
    });
    if (!service)
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, "Service not found");
    return prisma_1.default.serviceRecord
        .update({
        where: { serviceId: id },
        data: {
            status: client_1.ServiceStatus.DONE,
            completionDate: completionDate || new Date(),
        },
    })
        .then((service) => (Object.assign(Object.assign({}, service), { status: service.status.toLowerCase().replace("_", "-") })));
});
const getOverdueServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const services = yield prisma_1.default.serviceRecord.findMany({
        where: {
            AND: [
                {
                    status: {
                        in: [client_1.ServiceStatus.PENDING, client_1.ServiceStatus.IN_PROGRESS],
                    },
                },
                {
                    serviceDate: {
                        lte: sevenDaysAgo,
                    },
                },
            ],
        },
    });
    if (services.length === 0) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, "No overdue or pending services found");
    }
    return services.map((service) => (Object.assign(Object.assign({}, service), { status: service.status.toLowerCase().replace("_", "-") })));
});
exports.ServiceRecordService = {
    createServiceIntoDB,
    getAllServicesFromDB,
    getServiceByIdFromDB,
    deleteServiceFromDB,
    markServiceComplete,
    getOverdueServices,
};
