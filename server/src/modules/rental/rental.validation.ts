import { z } from "zod";

export const createRentalSchema = z.object({
  body: z
    .object({
      startDate: z.string().datetime({ message: "startDate must be a valid ISO date" }),
      endDate: z.string().datetime({ message: "endDate must be a valid ISO date" }),
      notes: z.string().optional(),
      items: z
        .array(
          z
            .object({
              gearItemId: z.string().uuid("Invalid gear item id"),
              quantity: z.number().int().positive("Quantity must be a positive integer"),
            })
            .strict()
        )
        .min(1, "At least one gear item is required"),
    })
    .strict()
    .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
      message: "endDate must be after startDate",
      path: ["endDate"],
    }),
});

export const rentalIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid rental order id"),
  }),
});
