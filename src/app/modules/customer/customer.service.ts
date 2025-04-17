import { HttpStatus } from "http-status-ts";
import prisma from "../../../shared/prisma";
import { AppError } from "../../errors/AppError";
import { ICustomer } from "./customer.interface";

const createCustomerIntoDB = async (data: ICustomer) => {
  const existingCustomer = await prisma.customer.findUnique({
    where: { email: data.email },
  });

  if (existingCustomer) {
    throw new AppError(HttpStatus.CONFLICT, "Email already exists");
  }

  const newCustomer = prisma.customer.create({ data });

  return newCustomer;
};

const getAllCustomersFromDB = async () => {
  const customers = await prisma.customer.findMany();
  return customers;
};

const getCustomerByIdFromDB = async (id: string) => {
  const customer = await prisma.customer.findUniqueOrThrow({
    where: { customerId: id },
  });

  return customer;
};

const updateCustomerIntoDB = async (id: string, data: Partial<ICustomer>) => {
  await prisma.customer.findUniqueOrThrow({
    where: { customerId: id },
  });

  const updatedCustomer = await prisma.customer.update({
    where: { customerId: id },
    data: {
      ...data,
    },
  });

  return updatedCustomer;
};

const deleteCustomerFromDB = async (id: string) => {
  await prisma.customer.findUniqueOrThrow({
    where: { customerId: id },
  });

  const deletedCustomer = prisma.customer.delete({ where: { customerId: id } });
  return deletedCustomer;
};

export const CustomerService = {
  createCustomerIntoDB,
  getAllCustomersFromDB,
  getCustomerByIdFromDB,
  updateCustomerIntoDB,
  deleteCustomerFromDB,
};
