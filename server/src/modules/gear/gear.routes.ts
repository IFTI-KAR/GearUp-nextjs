import { Router } from "express";
import { validateRequest } from "../../middlewares/validate";
import { gearIdParamSchema, gearQuerySchema } from "./gear.validation";
import * as gearController from "./gear.controller";

const router = Router();

// Public
router.get("/", validateRequest(gearQuerySchema), gearController.getAllGear);
router.get("/:id", validateRequest(gearIdParamSchema), gearController.getGearById);

export const gearRoutes = router;
