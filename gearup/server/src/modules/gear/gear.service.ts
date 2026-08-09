import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

interface GearQuery {
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  page?: string;
  limit?: string;
}

export const getAllGear = async (query: GearQuery) => {
  const page = Math.max(parseInt(query.page ?? "1", 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit ?? "10", 10) || 10, 1), 50);
  const skip = (page - 1) * limit;

  const where: Prisma.GearItemWhereInput = {
    status: "ACTIVE",
  };

  if (query.category) {
    where.category = { slug: query.category };
  }
  if (query.brand) {
    where.brand = { equals: query.brand, mode: "insensitive" };
  }
  if (query.minPrice || query.maxPrice) {
    where.pricePerDay = {};
    if (query.minPrice) where.pricePerDay.gte = parseFloat(query.minPrice);
    if (query.maxPrice) where.pricePerDay.lte = parseFloat(query.maxPrice);
  }
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
      { brand: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.gearItem.findMany({
      where,
      include: { category: true, provider: { select: { id: true, name: true } } },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.gearItem.count({ where }),
  ]);

  return {
    items,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

export const getGearById = async (id: string) => {
  const gear = await prisma.gearItem.findUnique({
    where: { id },
    include: {
      category: true,
      provider: { select: { id: true, name: true, email: true } },
      reviews: { include: { customer: { select: { id: true, name: true } } } },
    },
  });
  if (!gear) {
    throw ApiError.notFound("Gear item not found");
  }
  return gear;
};

export const createGear = async (
  providerId: string,
  data: {
    name: string;
    description?: string;
    brand?: string;
    categoryId: string;
    pricePerDay: number;
    quantityTotal: number;
    images?: string[];
    specifications?: Record<string, unknown>;
    location?: string;
  }
) => {
  const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
  if (!category) {
    throw ApiError.badRequest("Invalid categoryId: category does not exist");
  }

  return prisma.gearItem.create({
    data: {
      providerId,
      categoryId: data.categoryId,
      name: data.name,
      description: data.description,
      brand: data.brand,
      pricePerDay: data.pricePerDay,
      quantityTotal: data.quantityTotal,
      quantityAvailable: data.quantityTotal,
      images: data.images ?? [],
      specifications: data.specifications as Prisma.InputJsonValue | undefined,
      location: data.location,
    },
  });
};

const assertOwnership = async (gearId: string, providerId: string) => {
  const gear = await prisma.gearItem.findUnique({ where: { id: gearId } });
  if (!gear) {
    throw ApiError.notFound("Gear item not found");
  }
  if (gear.providerId !== providerId) {
    throw ApiError.forbidden("You do not have permission to modify this gear item");
  }
  return gear;
};

export const updateGear = async (
  gearId: string,
  providerId: string,
  data: Partial<{
    name: string;
    description: string;
    brand: string;
    categoryId: string;
    pricePerDay: number;
    quantityTotal: number;
    quantityAvailable: number;
    images: string[];
    specifications: Record<string, unknown>;
    location: string;
    status: "ACTIVE" | "INACTIVE";
  }>
) => {
  await assertOwnership(gearId, providerId);

  if (data.categoryId) {
    const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
    if (!category) {
      throw ApiError.badRequest("Invalid categoryId: category does not exist");
    }
  }

  const updateData: Prisma.GearItemUpdateInput = {
    ...(data.name !== undefined && { name: data.name }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.brand !== undefined && { brand: data.brand }),
    ...(data.categoryId !== undefined && { category: { connect: { id: data.categoryId } } }),
    ...(data.pricePerDay !== undefined && { pricePerDay: data.pricePerDay }),
    ...(data.quantityTotal !== undefined && { quantityTotal: data.quantityTotal }),
    ...(data.quantityAvailable !== undefined && { quantityAvailable: data.quantityAvailable }),
    ...(data.images !== undefined && { images: data.images }),
    ...(data.specifications !== undefined && { specifications: data.specifications as Prisma.InputJsonValue }),
    ...(data.location !== undefined && { location: data.location }),
    ...(data.status !== undefined && { status: data.status }),
  };
  return prisma.gearItem.update({ where: { id: gearId }, data: updateData });
};

export const deleteGear = async (gearId: string, providerId: string) => {
  await assertOwnership(gearId, providerId);
  await prisma.gearItem.delete({ where: { id: gearId } });
};

export const getProviderGear = async (providerId: string) => {
  return prisma.gearItem.findMany({
    where: { providerId },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};
