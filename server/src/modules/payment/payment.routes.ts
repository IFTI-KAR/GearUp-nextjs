import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validate";
import {
  confirmPaymentSchema,
  createPaymentSchema,
  paymentIdParamSchema,
} from "./payment.validation";
import * as paymentController from "./payment.controller";

const router = Router();

router.post("/create", auth("CUSTOMER"), validateRequest(createPaymentSchema), paymentController.createPayment);
router.post("/confirm", auth("CUSTOMER"), validateRequest(confirmPaymentSchema), paymentController.confirmPayment);
router.get("/", auth(), paymentController.getUserPayments);
router.get("/:id", auth(), validateRequest(paymentIdParamSchema), paymentController.getPaymentById);

export const paymentRoutes = router;
