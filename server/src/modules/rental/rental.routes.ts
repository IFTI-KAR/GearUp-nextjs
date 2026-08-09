import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validate";
import { createRentalSchema, rentalIdParamSchema } from "./rental.validation";
import * as rentalController from "./rental.controller";

const router = Router();

router.post("/", auth("CUSTOMER"), validateRequest(createRentalSchema), rentalController.createRentalOrder);
router.get("/", auth(), rentalController.getUserRentalOrders);
router.get("/:id", auth(), validateRequest(rentalIdParamSchema), rentalController.getRentalOrderById);
router.patch(
  "/:id/cancel",
  auth("CUSTOMER"),
  validateRequest(rentalIdParamSchema),
  rentalController.cancelRentalOrder
);

export const rentalRoutes = router;
