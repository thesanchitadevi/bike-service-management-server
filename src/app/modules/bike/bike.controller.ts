import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BikeService } from "./bike.service";

const createBike = catchAsync(async (req: Request, res: Response) => {
  const bike = req.body;
  const result = await BikeService.createBikeIntoDB(bike);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bike created successfully",
    data: result,
  });
});

export const BikeController = {
  createBike,
};
