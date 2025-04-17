import { HttpStatus } from "http-status-ts";
import prisma from "../../../shared/prisma";
import { AppError } from "../../errors/AppError";
import { IService } from "./service.interface";
import { ServiceStatus } from "@prisma/client";

const createServiceIntoDB = async (data: IService) => {
  const bikeExists = await prisma.bike.findUniqueOrThrow({
    where: { bikeId: data.bikeId },
  });

  if (!bikeExists) {
    throw new AppError(HttpStatus.NOT_FOUND, "Bike not found");
  }

  const service = await prisma.serviceRecord.create({
    data: {
      ...data,
      status: data.status.toUpperCase() as ServiceStatus,
    },
  });

  return {
    ...service,
    status: service.status.toLowerCase(),
  };
};

const getAllServicesFromDB = async () => {
  const services = await prisma.serviceRecord.findMany({});
  return services.map((service) => ({
    ...service,
    status: service.status.toLowerCase(),
  }));
};

const getServiceByIdFromDB = async (id: string) => {
  const service = await prisma.serviceRecord.findUniqueOrThrow({
    where: { serviceId: id },
  });

  if (!service) {
    throw new AppError(HttpStatus.NOT_FOUND, "Service not found");
  }

  return {
    ...service,
    status: service.status.toLowerCase(),
  };
};

const deleteServiceFromDB = async (id: string) => {
  await prisma.serviceRecord.findUniqueOrThrow({
    where: { serviceId: id },
  });

  const deletedService = await prisma.serviceRecord.delete({
    where: { serviceId: id },
  });

  return deletedService;
};

const markServiceComplete = async (id: string, completionDate?: Date) => {
  const service = await prisma.serviceRecord.findUnique({
    where: { serviceId: id },
  });

  if (!service) throw new AppError(HttpStatus.NOT_FOUND, "Service not found");

  return prisma.serviceRecord
    .update({
      where: { serviceId: id },
      data: {
        status: ServiceStatus.DONE,
        completionDate: completionDate || new Date(),
      },
    })
    .then((service) => ({
      ...service,
      status: service.status.toLowerCase() as "done",
    }));
};

export const ServiceRecordService = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getServiceByIdFromDB,
  deleteServiceFromDB,
  markServiceComplete,
};
