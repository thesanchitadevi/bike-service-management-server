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
      status: data.status.toUpperCase().replace("-", "_") as ServiceStatus,
    },
  });

  return {
    ...service,
    status: service.status.toLowerCase().replace("_", "-"),
  };
};

const getAllServicesFromDB = async () => {
  const services = await prisma.serviceRecord.findMany({});
  return services.map((service) => ({
    ...service,
    status: service.status.toLowerCase().replace("_", "-"),
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
    status: service.status.toLowerCase().replace("_", "-"),
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
      status: service.status.toLowerCase().replace("_", "-") as "done",
    }));
};

const getOverdueServices = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  console.log("Seven days ago: ", sevenDaysAgo);

  const services = await prisma.serviceRecord.findMany({
    where: {
      AND: [
        {
          status: {
            in: [ServiceStatus.PENDING, ServiceStatus.IN_PROGRESS],
          },
        },
      ],
    },
  });

  console.log("Found services:", services);

  if (services.length === 0) {
    throw new AppError(
      HttpStatus.NOT_FOUND,
      "No overdue or pending services found"
    );
  }

  return services.map((service) => ({
    ...service,
    status: service.status.toLowerCase().replace("_", "-"),
  }));
};

export const ServiceRecordService = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getServiceByIdFromDB,
  deleteServiceFromDB,
  markServiceComplete,
  getOverdueServices,
};
