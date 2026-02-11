import { z } from "zod";

export const quoteSchema = z.object({
  id: z.string().optional(),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  repairId: z.string().min(1, "Repair ID is required"),
  repairLabel: z.string().min(1, "Repair Label is required"),
  repairType: z.enum(["screen", "battery", "other"], {
    errorMap: () => ({ message: "Invalid repair type" }),
  }),
  quality: z.enum(["orig", "comp", "altcap", "standard"], {
    errorMap: () => ({ message: "Invalid quality" }),
  }),
  price: z.coerce.number().min(0, "Price must be positive"),
  warranty: z.string().min(1, "Warranty is required"),
  isUnstable: z.boolean().default(false),
  priceSpread: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
});

export const createQuoteSchema = quoteSchema.omit({ id: true });
export const updateQuoteSchema = quoteSchema.partial().extend({
  id: z.string().min(1, "ID is required"),
});

export const quoteFilterSchema = z.object({
  brand: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  currency: z.string().default("EUR"),
});

export type Quote = z.infer<typeof quoteSchema>;
export type CreateQuoteInput = z.infer<typeof createQuoteSchema>;
export type UpdateQuoteInput = z.infer<typeof updateQuoteSchema>;
export type QuoteFilter = z.infer<typeof quoteFilterSchema>;
