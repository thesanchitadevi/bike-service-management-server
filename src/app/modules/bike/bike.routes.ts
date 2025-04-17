import express from "express";
import { BikeController } from "./bike.controller";

const router = express.Router();

router.post("/", BikeController.createBike);

export const BikeRouter = router;
