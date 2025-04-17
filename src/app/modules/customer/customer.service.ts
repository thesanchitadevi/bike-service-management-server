import { HttpStatus } from "http-status-ts";
import prisma from "../../../shared/prisma";
import { AppError } from "../../errors/AppError";
import { ICustomer } from "./customer.interface";

const createCustomer = async (data: ICustomer) => {
  const existingCustomer = await prisma.customer.findUnique({
    where: { email: data.email },
  });

  if (existingCustomer) {
    throw new AppError(HttpStatus.CONFLICT, "Email already exists");
  }

  const newCustomer = prisma.customer.create({ data });

  return newCustomer;
};

const getAllCustomers = async () => {
  const customers = await prisma.customer.findMany();
  return customers;
};

const getCustomerById = async (id: string) => {
  const customer = await prisma.customer.findUniqueOrThrow({
    where: { customerId: id },
  });

  return customer;
};

const updateCustomer = async (id: string, data: Partial<ICustomer>) => {
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

const deleteCustomer = async (id: string) => {
  await prisma.customer.findUniqueOrThrow({
    where: { customerId: id },
  });

  const deletedCustomer = prisma.customer.delete({ where: { customerId: id } });
  return deletedCustomer;
};

export const CustomerService = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
