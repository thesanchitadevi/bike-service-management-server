import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidationSchemas } from "./service.validation";
import { ServiceController } from "./service.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(ServiceValidationSchemas.createValidation),
  ServiceController.createService
);
router.get("/", ServiceController.getAllServices);
router.get("/:id", ServiceController.getServiceById);
router.delete("/:id", ServiceController.deleteService);
router.put(
  "/:id/complete",
  validateRequest(ServiceValidationSchemas.completeValidation),
  ServiceController.markServiceComplete
);

export const ServiceRouter = router;
