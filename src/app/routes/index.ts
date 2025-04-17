import { Router } from "express";
import { BikeRouter } from "../modules/bike/bike.routes";

const router = Router();

// Application routes
const moduleRoutes = [
  {
    path: "/bikes",
    module: BikeRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.module);
});

export default router;
