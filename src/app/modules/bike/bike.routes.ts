import express from "express";
import { BikeController } from "./bike.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BikeValidationSchemas } from "./bike.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(BikeValidationSchemas.createValidation),
  BikeController.createBike
);
router.get("/", BikeController.getAllBikes);
router.get("/:id", BikeController.getSingleBike);
router.delete("/:id", BikeController.deleteBike);

export const BikeRouter = router;
