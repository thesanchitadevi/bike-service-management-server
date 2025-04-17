import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CustomerService } from "./customer.service";
import sendResponse from "../../../shared/sendResponse";
import { HttpStatus } from "http-status-ts";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const customer = await CustomerService.createCustomerIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.CREATED,
    message: "Customer created successfully",
    data: customer,
  });
});

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const customers = await CustomerService.getAllCustomersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Customers fetched successfully",
    data: customers,
  });
});

const getCustomerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await CustomerService.getCustomerByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Customer fetched successfully",
    data: customer,
  });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await CustomerService.updateCustomerIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Customer updated successfully",
    data: customer,
  });
});

const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await CustomerService.deleteCustomerFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Customer deleted successfully",
  });
});

export const CustomerController = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
