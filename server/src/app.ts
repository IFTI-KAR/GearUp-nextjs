import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { globalErrorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import { stripeWebhook } from "./modules/payment/payment.controller";
import mainRouter from "./routes";

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(cookieParser());

// Stripe webhook needs the RAW request body to verify the signature,
// so it must be registered before the global express.json() parser.
app.post("/api/payments/webhook", express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "GearUp API is running 🏋️",
    data: { docs: "/api-docs", health: "/health" },
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "OK", data: { uptime: process.uptime() } });
});

app.use("/api", mainRouter);

app.use(notFound);
app.use(globalErrorHandler as unknown as (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => void);

export default app;
