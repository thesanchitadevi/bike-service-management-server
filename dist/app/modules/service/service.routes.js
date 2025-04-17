"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validation_1 = require("./service.validation");
const service_controller_1 = require("./service.controller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(service_validation_1.ServiceValidationSchemas.createValidation), service_controller_1.ServiceController.createService);
router.get("/", service_controller_1.ServiceController.getAllServices);
router.get("/status", service_controller_1.ServiceController.getOverdueServices);
router.get("/:id", service_controller_1.ServiceController.getServiceById);
router.delete("/:id", service_controller_1.ServiceController.deleteService);
router.put("/:id/complete", (0, validateRequest_1.default)(service_validation_1.ServiceValidationSchemas.completeValidation), service_controller_1.ServiceController.markServiceComplete);
exports.ServiceRouter = router;
