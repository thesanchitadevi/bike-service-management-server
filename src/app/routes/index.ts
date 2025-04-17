import { Router } from "express";


const router = Router();

// Application routes
const moduleRoutes = [
  {
    path: "/",
    module: ,
  },
  
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.module);
});

export default router;
