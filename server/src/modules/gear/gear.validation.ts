import { z } from "zod";

export const createGearSchema = z.object({
  body: z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      description: z.string().optional(),
      brand: z.string().optional(),
      categoryId: z.string().uuid("Invalid category id"),
      pricePerDay: z.number().positive("Price per day must be a positive number"),
      quantityTotal: z.number().int().positive("Quantity must be a positive integer").default(1),
      images: z.array(z.string().url("Each image must be a valid URL")).optional().default([]),
      specifications: z.record(z.any()).optional(),
      location: z.string().optional(),
    })
    .strict(),
});

export const updateGearSchema = z.object({
  body: z
    .object({
      name: z.string().min(2).optional(),
      description: z.string().optional(),
      brand: z.string().optional(),
      categoryId: z.string().uuid().optional(),
      pricePerDay: z.number().positive().optional(),
      quantityTotal: z.number().int().positive().optional(),
      quantityAvailable: z.number().int().min(0).optional(),
      images: z.array(z.string().url()).optional(),
      specifications: z.record(z.any()).optional(),
      location: z.string().optional(),
      status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
    })
    .strict(),
  params: z.object({
    id: z.string().uuid("Invalid gear id"),
  }),
});

export const gearIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid gear id"),
  }),
});

export const gearQuerySchema = z.object({
  query: z
    .object({
      category: z.string().optional(),
      brand: z.string().optional(),
      minPrice: z.string().optional(),
      maxPrice: z.string().optional(),
      search: z.string().optional(),
      page: z.string().optional(),
      limit: z.string().optional(),
    })
    .partial(),
});
