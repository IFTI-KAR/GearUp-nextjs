import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validate";
import { createGearSchema, updateGearSchema } from "../gear/gear.validation";
import { updateOrderStatusSchema } from "./provider.validation";
import * as providerController from "./provider.controller";

const router = Router();

router.use(auth("PROVIDER"));

// Gear inventory
router.post("/gear", validateRequest(createGearSchema), providerController.addGear);
router.get("/gear", providerController.getMyGear);
router.put("/gear/:id", validateRequest(updateGearSchema), providerController.updateGear);
router.delete("/gear/:id", providerController.deleteGear);

// Orders
router.get("/orders", providerController.getProviderOrders);
router.patch(
  "/orders/:id",
  validateRequest(updateOrderStatusSchema),
  providerController.updateOrderStatus
);

export const providerRoutes = router;
