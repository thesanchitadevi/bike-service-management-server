import express from "express";
import { CustomerController } from "./customer.controller";
import { CustomerValidationSchemas } from "./customer.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/",
  validateRequest(CustomerValidationSchemas.createValidation),
  CustomerController.createCustomer
);
router.get("/", CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getCustomerById);
router.patch(
  "/:id",
  validateRequest(CustomerValidationSchemas.updateValidation),
  CustomerController.updateCustomer
);
router.delete("/:id", CustomerController.deleteCustomer);

export const CustomerRouter = router;
