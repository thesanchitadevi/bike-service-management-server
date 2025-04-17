"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_routes_1 = require("../modules/customer/customer.routes");
const bike_routes_1 = require("../modules/bike/bike.routes");
const service_routes_1 = require("../modules/service/service.routes");
const router = (0, express_1.Router)();
// Application routes
const moduleRoutes = [
    {
        path: "/customers",
        module: customer_routes_1.CustomerRouter,
    },
    {
        path: "/bikes",
        module: bike_routes_1.BikeRouter,
    },
    {
        path: "/services",
        module: service_routes_1.ServiceRouter,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.module);
});
exports.default = router;
