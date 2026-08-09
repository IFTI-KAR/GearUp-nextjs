import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return users.map(({ password, ...rest }) => rest);
};

export const updateUserStatus = async (userId: string, status: "ACTIVE" | "SUSPENDED") => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  if (user.role === "ADMIN") {
    throw ApiError.forbidden("Admin accounts cannot be suspended");
  }
  const updated = await prisma.user.update({ where: { id: userId }, data: { status } });
  const { password, ...rest } = updated;
  return rest;
};

export const getAllGearItems = async () => {
  return prisma.gearItem.findMany({
    include: { category: true, provider: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
};

export const getAllRentalOrders = async () => {
  return prisma.rentalOrder.findMany({
    include: {
      customer: { select: { id: true, name: true, email: true } },
      items: { include: { gearItem: true } },
      payments: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
