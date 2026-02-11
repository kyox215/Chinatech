"use server";

import { revalidatePath } from "next/cache";
import { quoteService } from "@/services/quote.service";
import { createQuoteSchema, quoteFilterSchema, updateQuoteSchema } from "@/lib/validations/quote";
import { z } from "zod";

export async function getQuotesAction(params: z.infer<typeof quoteFilterSchema>) {
  try {
    const validatedParams = quoteFilterSchema.parse(params);
    const result = await quoteService.getQuotes(validatedParams);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    return { success: false, error: "Failed to fetch quotes" };
  }
}

export async function getBrandsAction() {
  try {
    const brands = await quoteService.getBrands();
    return { success: true, data: brands };
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return { success: false, error: "Failed to fetch brands" };
  }
}

export async function createQuoteAction(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    
    // Handle specific fields that might need conversion
    const data = {
      ...rawData,
      price: Number(rawData.price),
      count: Number(rawData.count || 0),
      isUnstable: rawData.isUnstable === "true" || rawData.isUnstable === "on",
      isActive: rawData.isActive === "true" || rawData.isActive === "on",
    };

    const validatedData = createQuoteSchema.parse(data);
    
    await quoteService.createQuote(validatedData);
    
    revalidatePath("/quotes");
    return { success: true, message: "Quote created successfully" };
  } catch (error) {
    console.error("Failed to create quote:", error);
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: "Failed to create quote" };
  }
}

export async function updateQuoteAction(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    
    // Handle conversions
    const data = {
      ...rawData,
      price: rawData.price ? Number(rawData.price) : undefined,
      count: rawData.count ? Number(rawData.count) : undefined,
      isUnstable: rawData.isUnstable === "true" || rawData.isUnstable === "on",
      isActive: rawData.isActive === "true" || rawData.isActive === "on",
    };

    const validatedData = updateQuoteSchema.parse(data);
    
    await quoteService.updateQuote(validatedData);
    
    revalidatePath("/quotes");
    return { success: true, message: "Quote updated successfully" };
  } catch (error) {
    console.error("Failed to update quote:", error);
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: "Failed to update quote" };
  }
}

export async function updateRepairAction(repairId: string, price: number, warranty: string) {
  try {
    await quoteService.updateQuoteByRepairId(repairId, { price, warranty });
    revalidatePath("/quotes");
    return { success: true, message: "Repair updated successfully" };
  } catch (error) {
    console.error("Failed to update repair:", error);
    return { success: false, message: "Failed to update repair" };
  }
}

export async function deleteQuoteAction(id: string) {
  try {
    await quoteService.deleteQuote(id);
    revalidatePath("/quotes");
    return { success: true, message: "Quote deleted successfully" };
  } catch (error) {
    console.error("Failed to delete quote:", error);
    return { success: false, message: "Failed to delete quote" };
  }
}

export async function bulkCreateQuotesAction(data: any[]) {
  try {
    // Validate all items
    const validatedData = z.array(createQuoteSchema).parse(data);
    await quoteService.createManyQuotes(validatedData);
    revalidatePath("/quotes");
    return { success: true, message: "Quotes imported successfully" };
  } catch (error) {
    console.error("Failed to import quotes:", error);
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: "Failed to import quotes" };
  }
}

export async function deleteModelAction(brand: string, model: string) {
  try {
    await quoteService.deleteModel(brand, model);
    revalidatePath("/quotes");
    return { success: true, message: "Model deleted successfully" };
  } catch (error) {
    console.error("Failed to delete model:", error);
    return { success: false, message: "Failed to delete model" };
  }
}

export async function deleteBrandAction(brand: string) {
  try {
    await quoteService.deleteBrand(brand);
    revalidatePath("/quotes");
    return { success: true, message: "Brand deleted successfully" };
  } catch (error) {
    console.error("Failed to delete brand:", error);
    return { success: false, message: "Failed to delete brand" };
  }
}

export async function deleteRepairAction(repairId: string) {
  try {
    await quoteService.deleteRepair(repairId);
    revalidatePath("/quotes");
    return { success: true, message: "Repair deleted successfully" };
  } catch (error) {
    console.error("Failed to delete repair:", error);
    return { success: false, message: "Failed to delete repair" };
  }
}

export async function renameModelAction(brand: string, oldModel: string, newModel: string) {
  try {
    await quoteService.renameModel(brand, oldModel, newModel);
    revalidatePath("/quotes");
    return { success: true, message: "Model renamed successfully" };
  } catch (error) {
    console.error("Failed to rename model:", error);
    return { success: false, message: "Failed to rename model" };
  }
}

export async function renameBrandAction(oldBrand: string, newBrand: string) {
  try {
    await quoteService.renameBrand(oldBrand, newBrand);
    revalidatePath("/quotes");
    return { success: true, message: "Brand renamed successfully" };
  } catch (error) {
    console.error("Failed to rename brand:", error);
    return { success: false, message: "Failed to rename brand" };
  }
}
