import { HttpStatus } from "http-status-ts";
import prisma from "../../../shared/prisma";
import { AppError } from "../../errors/AppError";
import { IBike } from "./bike.interface";

const createBikeIntoDB = async (data: IBike) => {
  // Check if customer exists
  const customerExists = await prisma.customer.findUniqueOrThrow({
    where: { customerId: data.customerId },
  });

  if (!customerExists) {
    throw new AppError(HttpStatus.NOT_FOUND, "Customer not found");
  }
  // Check for existing bike with same identity
  const existingBike = await prisma.bike.findFirst({
    where: {
      brand: data.brand,
      model: data.model,
      year: data.year,
      customerId: data.customerId,
    },
  });

  if (existingBike) {
    throw new AppError(
      HttpStatus.CONFLICT,
      "This bike already exists for the customer"
    );
  }

  const bike = prisma.bike.create({ data });

  return bike;
};

const getAllBikesFromDB = async () => {
  return prisma.bike.findMany({});
};

const getBikeByIdFromDB = async (id: string) => {
  const bike = await prisma.bike.findUniqueOrThrow({
    where: { bikeId: id },
    // include: { customer: true },
  });

  if (!bike) throw new AppError(HttpStatus.NOT_FOUND, "Bike not found");
  return bike;
};

const deleteBikeFromDB = async (id: string) => {
  const bike = await prisma.bike.delete({ where: { bikeId: id } });
  if (!bike) throw new AppError(HttpStatus.NOT_FOUND, "Bike not found");
  return bike;
};

export const BikeService = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getBikeByIdFromDB,
  deleteBikeFromDB,
};
