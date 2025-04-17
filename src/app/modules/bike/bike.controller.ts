import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BikeService } from "./bike.service";
import { HttpStatus } from "http-status-ts";

const createBike = catchAsync(async (req: Request, res: Response) => {
  const bike = req.body;
  const result = await BikeService.createBikeIntoDB(bike);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Bike added successfully",
    data: result,
  });
});

const getAllBikes = catchAsync(async (req: Request, res: Response) => {
  const bikes = await BikeService.getAllBikesFromDB();

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Bikes fetched successfully",
    data: bikes,
  });
});

const getSingleBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bike = await BikeService.getBikeByIdFromDB(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Bike fetched successfully",
    data: bike,
  });
});

const deleteBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await BikeService.deleteBikeFromDB(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Bike deleted successfully",
    data: null,
  });
});

export const BikeController = {
  createBike,
  getAllBikes,
  getSingleBike,
  deleteBike,
};
