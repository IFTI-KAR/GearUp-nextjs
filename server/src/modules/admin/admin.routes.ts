import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validate";
import { updateUserStatusSchema } from "./admin.validation";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../category/category.validation";
import * as adminController from "./admin.controller";

const router = Router();

router.use(auth("ADMIN"));

// Users
router.get("/users", adminController.getAllUsers);
router.patch("/users/:id", validateRequest(updateUserStatusSchema), adminController.updateUserStatus);

// Gear
router.get("/gear", adminController.getAllGearItems);

// Rentals
router.get("/rentals", adminController.getAllRentalOrders);

// Categories
router.post("/categories", validateRequest(createCategorySchema), adminController.createCategory);
router.put("/categories/:id", validateRequest(updateCategorySchema), adminController.updateCategory);
router.delete("/categories/:id", adminController.deleteCategory);

export const adminRoutes = router;
