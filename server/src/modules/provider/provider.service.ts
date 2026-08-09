import { OrderStatus } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

// Which statuses a PROVIDER is allowed to move an order into, from which current status.
const ALLOWED_PROVIDER_TRANSITIONS: Record<string, OrderStatus[]> = {
  PLACED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["CANCELLED"],
  PAID: ["PICKED_UP", "CANCELLED"],
  PICKED_UP: ["RETURNED"],
};

export const getProviderOrders = async (providerId: string) => {
  return prisma.rentalOrder.findMany({
    where: { items: { some: { gearItem: { providerId } } } },
    include: {
      customer: { select: { id: true, name: true, email: true, phone: true } },
      items: { include: { gearItem: true } },
      payments: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateOrderStatus = async (
  orderId: string,
  providerId: string,
  nextStatus: OrderStatus
) => {
  const order = await prisma.rentalOrder.findUnique({
    where: { id: orderId },
    include: { items: { include: { gearItem: true } } },
  });

  if (!order) {
    throw ApiError.notFound("Rental order not found");
  }

  const ownsAnItem = order.items.some((item) => item.gearItem.providerId === providerId);
  if (!ownsAnItem) {
    throw ApiError.forbidden("You do not have permission to manage this order");
  }

  const allowedNext = ALLOWED_PROVIDER_TRANSITIONS[order.status] ?? [];
  if (!allowedNext.includes(nextStatus)) {
    throw ApiError.badRequest(
      `Cannot transition order from ${order.status} to ${nextStatus}`
    );
  }

  // If the order is cancelled before pickup, restock gear quantities.
  if (nextStatus === "CANCELLED") {
    await prisma.$transaction([
      ...order.items.map((item) =>
        prisma.gearItem.update({
          where: { id: item.gearItemId },
          data: { quantityAvailable: { increment: item.quantity } },
        })
      ),
      prisma.rentalOrder.update({ where: { id: orderId }, data: { status: nextStatus } }),
    ]);
  } else {
    await prisma.rentalOrder.update({ where: { id: orderId }, data: { status: nextStatus } });
  }

  return prisma.rentalOrder.findUnique({
    where: { id: orderId },
    include: { items: { include: { gearItem: true } }, customer: true, payments: true },
  });
};
