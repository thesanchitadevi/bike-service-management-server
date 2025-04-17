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
exports.ServiceController = void 0;
const http_status_ts_1 = require("http-status-ts");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_service_1 = require("./service.service");
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceRecordService.createServiceIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_ts_1.HttpStatus.CREATED,
        message: "Service record created successfully",
        data: result,
    });
}));
const getAllServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceRecordService.getAllServicesFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_ts_1.HttpStatus.OK,
        message: "Service records fetched successfully",
        data: result,
    });
}));
const getServiceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_service_1.ServiceRecordService.getServiceByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_ts_1.HttpStatus.OK,
        message: "Service record fetched successfully",
        data: result,
    });
}));
const deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield service_service_1.ServiceRecordService.deleteServiceFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_ts_1.HttpStatus.OK,
        message: "Service record deleted successfully",
    });
}));
const markServiceComplete = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceRecordService.markServiceComplete(req.params.id, req.body.completionDate);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_ts_1.HttpStatus.OK,
        message: "Service marked as completed",
        data: result,
    });
}));
const getOverdueServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceRecordService.getOverdueServices();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_ts_1.HttpStatus.OK,
        message: "Overdue or pending services fetched successfully",
        data: result,
    });
}));
exports.ServiceController = {
    createService,
    getAllServices,
    getServiceById,
    deleteService,
    markServiceComplete,
    getOverdueServices,
};
