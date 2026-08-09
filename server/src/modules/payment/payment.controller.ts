import { Request, Response } from "express";
import Stripe from "stripe";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ApiError } from "../../utils/ApiError";
import { stripe } from "../../config/stripe";
import { env } from "../../config/env";
import * as paymentService from "./payment.service";

export const createPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.createPaymentSession(
    req.user!.userId,
    req.body.rentalOrderId
  );
  sendResponse(res, {
    statusCode: 201,
    message: "Payment session created successfully",
    data: result,
  });
});

export const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const payment = await paymentService.confirmPaymentBySession(req.body.sessionId);
  sendResponse(res, { statusCode: 200, message: "Payment confirmed successfully", data: payment });
});

export const getUserPayments = catchAsync(async (req: Request, res: Response) => {
  const payments = await paymentService.getUserPayments(req.user!.userId, req.user!.role);
  sendResponse(res, { statusCode: 200, message: "Payment history retrieved successfully", data: payments });
});

export const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const payment = await paymentService.getPaymentById(
    req.params.id,
    req.user!.userId,
    req.user!.role
  );
  sendResponse(res, { statusCode: 200, message: "Payment retrieved successfully", data: payment });
});

/**
 * Stripe webhook endpoint. Must receive the raw request body (see app.ts) so the
 * signature can be verified against STRIPE_WEBHOOK_SECRET.
 */
export const stripeWebhook = catchAsync(async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"];

  if (!signature || !env.STRIPE_WEBHOOK_SECRET) {
    throw ApiError.badRequest("Missing Stripe signature or webhook secret");
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body as Buffer,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    throw ApiError.badRequest(`Webhook signature verification failed: ${message}`);
  }

  await paymentService.handleStripeWebhookEvent(event);

  res.status(200).json({ received: true });
});
