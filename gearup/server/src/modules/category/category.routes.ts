import { Router } from "express";
import * as categoryController from "./category.controller";

const router = Router();

// Public
router.get("/", categoryController.getAllCategories);

export const categoryRoutes = router;
