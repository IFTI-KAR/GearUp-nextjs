import { randomUUID } from "crypto";
import Stripe from "stripe";
import { Role } from "@prisma/client";
import prisma from "../../config/prisma";
import { stripe } from "../../config/stripe";
import { env } from "../../config/env";
import { ApiError } from "../../utils/ApiError";

/**
 * Creates a Stripe Checkout Session for an already-confirmed rental order,
 * and records a PENDING Payment row referencing that session.
 */
export const createPaymentSession = async (customerId: string, rentalOrderId: string) => {
  const order = await prisma.rentalOrder.findUnique({
    where: { id: rentalOrderId },
    include: { items: { include: { gearItem: true } }, payments: true },
  });

  if (!order) {
    throw ApiError.notFound("Rental order not found");
  }
  if (order.customerId !== customerId) {
    throw ApiError.forbidden("You do not have permission to pay for this order");
  }
  if (order.status !== "CONFIRMED") {
    throw ApiError.badRequest(
      `Order must be CONFIRMED by the provider before payment. Current status: ${order.status}`
    );
  }

  const existingCompleted = order.payments.find((p) => p.status === "COMPLETED");
  if (existingCompleted) {
    throw ApiError.conflict("This order has already been paid for");
  }

  const amountInCents = Math.round(Number(order.totalAmount) * 100);
  const transactionId = `GU-${randomUUID()}`;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = order.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.gearItem.name },
      unit_amount: Math.round(Number(item.pricePerDay) * item.days * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: env.STRIPE_CANCEL_URL,
    metadata: { rentalOrderId, customerId, transactionId },
  });

  const payment = await prisma.payment.create({
    data: {
      transactionId,
      rentalOrderId,
      userId: customerId,
      amount: order.totalAmount,
      method: "STRIPE",
      status: "PENDING",
      stripeSessionId: session.id,
    },
  });

  return { payment, checkoutUrl: session.url, sessionId: session.id, amountInCents };
};

const markPaymentCompleted = async (session: Stripe.Checkout.Session) => {
  const payment = await prisma.payment.findUnique({ where: { stripeSessionId: session.id } });
  if (!payment) return null;

  if (payment.status === "COMPLETED") {
    return payment;
  }

  const [updatedPayment] = await prisma.$transaction([
    prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "COMPLETED",
        paidAt: new Date(),
        stripePaymentIntentId:
          typeof session.payment_intent === "string" ? session.payment_intent : undefined,
      },
    }),
    prisma.rentalOrder.update({
      where: { id: payment.rentalOrderId },
      data: { status: "PAID" },
    }),
  ]);

  return updatedPayment;
};

const markPaymentFailed = async (session: Stripe.Checkout.Session) => {
  const payment = await prisma.payment.findUnique({ where: { stripeSessionId: session.id } });
  if (!payment || payment.status === "COMPLETED") return payment;
  return prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED" } });
};

/**
 * Non-webhook confirmation path: client calls this after redirect back from Stripe
 * Checkout with the session_id, and we verify the session status directly with Stripe.
 */
export const confirmPaymentBySession = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") {
    const payment = await markPaymentCompleted(session);
    if (!payment) throw ApiError.notFound("Payment record not found for this session");
    return payment;
  }

  const payment = await markPaymentFailed(session);
  if (!payment) throw ApiError.notFound("Payment record not found for this session");
  throw ApiError.badRequest("Payment has not completed successfully", {
    paymentStatus: session.payment_status,
  });
};

/**
 * Webhook handler logic invoked from the raw Stripe webhook route.
 */
export const handleStripeWebhookEvent = async (event: Stripe.Event) => {
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      await markPaymentCompleted(session);
      break;
    }
    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await markPaymentFailed(session);
      break;
    }
    default:
      break;
  }
};

export const getUserPayments = async (userId: string, role: Role) => {
  if (role === "ADMIN") {
    return prisma.payment.findMany({
      include: { rentalOrder: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  if (role === "PROVIDER") {
    return prisma.payment.findMany({
      where: { rentalOrder: { items: { some: { gearItem: { providerId: userId } } } } },
      include: { rentalOrder: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  return prisma.payment.findMany({
    where: { userId },
    include: { rentalOrder: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getPaymentById = async (paymentId: string, userId: string, role: Role) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      rentalOrder: { include: { items: { include: { gearItem: true } } } },
      user: { select: { id: true, name: true, email: true } },
    },
  });

  if (!payment) {
    throw ApiError.notFound("Payment not found");
  }

  const isOwner = payment.userId === userId;
  const isProviderInvolved = payment.rentalOrder.items.some(
    (item) => item.gearItem.providerId === userId
  );

  if (role !== "ADMIN" && !isOwner && !isProviderInvolved) {
    throw ApiError.forbidden("You do not have permission to view this payment");
  }

  return payment;
};
