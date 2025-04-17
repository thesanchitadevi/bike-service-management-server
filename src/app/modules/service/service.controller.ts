import { HttpStatus } from "http-status-ts";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ServiceRecordService } from "./service.service";
import { Request, Response } from "express";

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceRecordService.createServiceIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.CREATED,
    message: "Service record created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceRecordService.getAllServicesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Service records fetched successfully",
    data: result,
  });
});

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceRecordService.getServiceByIdFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Service record fetched successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await ServiceRecordService.deleteServiceFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Service record deleted successfully",
  });
});

const markServiceComplete = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceRecordService.markServiceComplete(
    req.params.id,
    req.body.completionDate
  );
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Service marked as completed",
    data: result,
  });
});

const getOverdueServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceRecordService.getOverdueServices();
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Overdue or pending services fetched successfully",
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  getServiceById,
  deleteService,
  markServiceComplete,
  getOverdueServices,
};
