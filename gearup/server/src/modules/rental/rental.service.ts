import { Prisma, Role } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

interface CreateRentalInput {
  startDate: string;
  endDate: string;
  notes?: string;
  items: { gearItemId: string; quantity: number }[];
}

const msPerDay = 1000 * 60 * 60 * 24;

export const createRentalOrder = async (customerId: string, input: CreateRentalInput) => {
  const startDate = new Date(input.startDate);
  const endDate = new Date(input.endDate);
  const days = Math.max(Math.ceil((endDate.getTime() - startDate.getTime()) / msPerDay), 1);

  return prisma.$transaction(async (tx) => {
    let totalAmount = new Prisma.Decimal(0);
    const orderItemsData: {
      gearItemId: string;
      quantity: number;
      pricePerDay: Prisma.Decimal;
      days: number;
      subtotal: Prisma.Decimal;
    }[] = [];

    for (const item of input.items) {
      const gear = await tx.gearItem.findUnique({ where: { id: item.gearItemId } });
      if (!gear) {
        throw ApiError.notFound(`Gear item not found: ${item.gearItemId}`);
      }
      if (gear.status !== "ACTIVE") {
        throw ApiError.badRequest(`Gear item is not available for rent: ${gear.name}`);
      }
      if (gear.quantityAvailable < item.quantity) {
        throw ApiError.badRequest(
          `Insufficient stock for "${gear.name}". Available: ${gear.quantityAvailable}`
        );
      }

      const subtotal = gear.pricePerDay.mul(item.quantity).mul(days);
      totalAmount = totalAmount.add(subtotal);

      orderItemsData.push({
        gearItemId: gear.id,
        quantity: item.quantity,
        pricePerDay: gear.pricePerDay,
        days,
        subtotal,
      });

      await tx.gearItem.update({
        where: { id: gear.id },
        data: { quantityAvailable: { decrement: item.quantity } },
      });
    }

    const order = await tx.rentalOrder.create({
      data: {
        customerId,
        startDate,
        endDate,
        totalAmount,
        notes: input.notes,
        items: { create: orderItemsData },
      },
      include: { items: { include: { gearItem: true } } },
    });

    return order;
  });
};

export const getUserRentalOrders = async (userId: string, role: Role) => {
  if (role === "ADMIN") {
    return prisma.rentalOrder.findMany({
      include: { items: { include: { gearItem: true } }, customer: true, payments: true },
      orderBy: { createdAt: "desc" },
    });
  }

  return prisma.rentalOrder.findMany({
    where: { customerId: userId },
    include: { items: { include: { gearItem: true } }, payments: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getRentalOrderById = async (orderId: string, userId: string, role: Role) => {
  const order = await prisma.rentalOrder.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { gearItem: true } },
      customer: { select: { id: true, name: true, email: true, phone: true } },
      payments: true,
      reviews: true,
    },
  });

  if (!order) {
    throw ApiError.notFound("Rental order not found");
  }

  const isOwner = order.customerId === userId;
  const isProviderOfAnItem = order.items.some((item) => item.gearItem.providerId === userId);

  if (role !== "ADMIN" && !isOwner && !isProviderOfAnItem) {
    throw ApiError.forbidden("You do not have permission to view this order");
  }

  return order;
};

export const cancelRentalOrder = async (orderId: string, customerId: string) => {
  const order = await prisma.rentalOrder.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    throw ApiError.notFound("Rental order not found");
  }
  if (order.customerId !== customerId) {
    throw ApiError.forbidden("You do not have permission to cancel this order");
  }
  if (!["PLACED", "CONFIRMED"].includes(order.status)) {
    throw ApiError.badRequest(`Order in status ${order.status} can no longer be cancelled`);
  }

  return prisma.$transaction(async (tx) => {
    for (const item of order.items) {
      await tx.gearItem.update({
        where: { id: item.gearItemId },
        data: { quantityAvailable: { increment: item.quantity } },
      });
    }
    return tx.rentalOrder.update({ where: { id: orderId }, data: { status: "CANCELLED" } });
  });
};
