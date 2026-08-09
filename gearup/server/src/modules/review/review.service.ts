import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

export const createReview = async (
  customerId: string,
  input: { gearItemId: string; rentalOrderId: string; rating: number; comment?: string }
) => {
  const order = await prisma.rentalOrder.findUnique({
    where: { id: input.rentalOrderId },
    include: { items: true },
  });

  if (!order) {
    throw ApiError.notFound("Rental order not found");
  }
  if (order.customerId !== customerId) {
    throw ApiError.forbidden("You can only review orders you placed");
  }
  if (order.status !== "RETURNED") {
    throw ApiError.badRequest("You can only leave a review after the gear has been returned");
  }
  const itemInOrder = order.items.some((item) => item.gearItemId === input.gearItemId);
  if (!itemInOrder) {
    throw ApiError.badRequest("This gear item was not part of the specified rental order");
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      customerId,
      gearItemId: input.gearItemId,
      rentalOrderId: input.rentalOrderId,
    },
  });
  if (existingReview) {
    throw ApiError.conflict("You have already reviewed this gear item for this order");
  }

  return prisma.review.create({
    data: {
      customerId,
      gearItemId: input.gearItemId,
      rentalOrderId: input.rentalOrderId,
      rating: input.rating,
      comment: input.comment,
    },
  });
};
