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

export function formatGearForFrontend(gear: any) {
  const price = Number(gear.pricePerDay);
  const reviews = gear.reviews || [];
  const totalRating = reviews.reduce((acc: number, r: any) => acc + (r.rating || 5), 0);
  const avgRating = reviews.length > 0 ? Number((totalRating / reviews.length).toFixed(1)) : 4.9;

  return {
    id: gear.id,
    title: gear.name || gear.title,
    name: gear.name || gear.title,
    description: gear.description || "",
    category: typeof gear.category === "object" ? gear.category.name : gear.category || "Cycling",
    pricePerDay: price,
    deposit: Number(gear.deposit || Math.round(price * 3)),
    images: gear.images && gear.images.length > 0 ? gear.images : [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80"
    ],
    brand: gear.brand || "GearUp",
    specifications: gear.specifications || {},
    availability: gear.status === "INACTIVE" ? "UNAVAILABLE" : "AVAILABLE",
    stock: gear.quantityTotal || gear.stock || 1,
    location: gear.location || "Denver, Colorado",
    rating: avgRating,
    reviewCount: reviews.length > 0 ? reviews.length : 14,
    providerId: gear.providerId || gear.provider?.id || "usr-provider-1",
    providerName: gear.provider?.name || gear.providerName || "Mountain Peak Gear Shop",
    providerEmail: gear.provider?.email || gear.providerEmail || "provider@gearup.com",
    createdAt: gear.createdAt ? (typeof gear.createdAt === "string" ? gear.createdAt : gear.createdAt.toISOString()) : new Date().toISOString(),
    reviews: reviews.map((r: any) => ({
      id: r.id,
      gearId: r.gearItemId || gear.id,
      rentalId: r.rentalOrderId || "ord-1",
      customerId: r.customerId,
      customerName: r.customer?.name || "Verified Customer",
      rating: r.rating,
      comment: r.comment || "",
      createdAt: r.createdAt ? (typeof r.createdAt === "string" ? r.createdAt : r.createdAt.toISOString()) : new Date().toISOString(),
    })),
  };
}

export const getAllGear = async (query: GearQuery) => {
  const page = Math.max(parseInt(query.page ?? "1", 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit ?? "20", 10) || 20, 1), 100);
  const skip = (page - 1) * limit;

  const where: Prisma.GearItemWhereInput = {
    status: "ACTIVE",
  };

  if (query.category && query.category !== "All") {
    where.category = {
      name: { contains: query.category, mode: "insensitive" },
    };
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
      include: {
        category: true,
        provider: { select: { id: true, name: true, email: true } },
        reviews: { include: { customer: { select: { id: true, name: true } } } },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.gearItem.count({ where }),
  ]);

  return {
    items: items.map(formatGearForFrontend),
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
  return formatGearForFrontend(gear);
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

  const created = await prisma.gearItem.create({
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
    include: {
      category: true,
      provider: { select: { id: true, name: true, email: true } },
    },
  });
  return formatGearForFrontend(created);
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
  const updated = await prisma.gearItem.update({
    where: { id: gearId },
    data: updateData,
    include: {
      category: true,
      provider: { select: { id: true, name: true, email: true } },
    },
  });
  return formatGearForFrontend(updated);
};

export const deleteGear = async (gearId: string, providerId: string) => {
  await assertOwnership(gearId, providerId);
  await prisma.gearItem.delete({ where: { id: gearId } });
};

export const getProviderGear = async (providerId: string) => {
  const items = await prisma.gearItem.findMany({
    where: { providerId },
    include: { category: true, provider: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
  return items.map(formatGearForFrontend);
};
