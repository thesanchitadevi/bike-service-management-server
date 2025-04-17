import { Router } from "express";
import { CustomerRouter } from "../modules/customer/customer.routes";

const router = Router();

// Application routes
const moduleRoutes = [
  {
    path: "/customers",
    module: CustomerRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.module);
});

export default router;
