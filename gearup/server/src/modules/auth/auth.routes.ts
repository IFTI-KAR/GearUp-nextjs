import { Router } from "express";
import { validateRequest } from "../../middlewares/validate";
import { auth } from "../../middlewares/auth";
import { loginSchema, registerSchema } from "./auth.validation";
import * as authController from "./auth.controller";

const router = Router();

router.post("/register", validateRequest(registerSchema), authController.register);
router.post("/login", validateRequest(loginSchema), authController.login);
router.get("/me", auth(), authController.getMe);

export const authRoutes = router;
