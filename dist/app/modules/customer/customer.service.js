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
exports.CustomerService = void 0;
const http_status_ts_1 = require("http-status-ts");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = require("../../errors/AppError");
const createCustomerIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCustomer = yield prisma_1.default.customer.findUnique({
        where: { email: data.email },
    });
    if (existingCustomer) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.CONFLICT, "Email already exists");
    }
    const newCustomer = prisma_1.default.customer.create({ data });
    return newCustomer;
});
const getAllCustomersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield prisma_1.default.customer.findMany();
    return customers;
});
const getCustomerByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma_1.default.customer.findUniqueOrThrow({
        where: { customerId: id },
    });
    return customer;
});
const updateCustomerIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.customer.findUniqueOrThrow({
        where: { customerId: id },
    });
    const updatedCustomer = yield prisma_1.default.customer.update({
        where: { customerId: id },
        data: Object.assign({}, data),
    });
    return updatedCustomer;
});
const deleteCustomerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.customer.findUniqueOrThrow({
        where: { customerId: id },
    });
    const deletedCustomer = prisma_1.default.customer.delete({ where: { customerId: id } });
    return deletedCustomer;
});
exports.CustomerService = {
    createCustomerIntoDB,
    getAllCustomersFromDB,
    getCustomerByIdFromDB,
    updateCustomerIntoDB,
    deleteCustomerFromDB,
};
