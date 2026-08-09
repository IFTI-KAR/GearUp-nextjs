import { z } from "zod";

export const createReviewSchema = z.object({
  body: z
    .object({
      gearItemId: z.string().uuid("Invalid gear item id"),
      rentalOrderId: z.string().uuid("Invalid rental order id"),
      rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
      comment: z.string().max(1000).optional(),
    })
    .strict(),
});
