import { quoteRepository } from "@/repositories/quote.repository";
import { CreateQuoteInput, QuoteFilter, UpdateQuoteInput } from "@/lib/validations/quote";
import { cache } from "@/lib/cache";

const EXCHANGE_RATES: Record<string, number> = {
  EUR: 1,
  USD: 1.08,
  CNY: 7.85,
  GBP: 0.85,
};

export class QuoteService {
  private static CACHE_TTL = 300; // 5 minutes
  private static CACHE_KEY_PREFIX = "quotes:";

  async getQuotes(filter: QuoteFilter) {
    const cacheKey = `${QuoteService.CACHE_KEY_PREFIX}list:${JSON.stringify(filter)}`;
    const cached = await cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const { data, total } = await quoteRepository.findMany(filter);

    const rate = EXCHANGE_RATES[filter.currency] || 1;
    const transformedQuotes = data.map((q) => ({
      ...q,
      price: Number((q.price * rate).toFixed(2)),
      currency: filter.currency,
      display_price: `${this.getCurrencySymbol(filter.currency)}${Number((q.price * rate).toFixed(2))}`,
    }));

    const result = {
      data: transformedQuotes,
      meta: {
        total,
        page: filter.page,
        limit: filter.limit,
        totalPages: Math.ceil(total / filter.limit),
      },
    };

    await cache.set(cacheKey, result, QuoteService.CACHE_TTL);
    return result;
  }

  async createQuote(input: CreateQuoteInput) {
    const quote = await quoteRepository.create(input);
    await this.invalidateCache();
    return quote;
  }

  async createManyQuotes(inputs: CreateQuoteInput[]) {
    // Prisma createMany is faster
    const result = await quoteRepository.createMany(inputs);
    await this.invalidateCache();
    return result;
  }

  async updateQuote(input: UpdateQuoteInput) {
    if (!input.id) throw new Error("ID is required for update");
    const quote = await quoteRepository.update(input.id, input);
    await this.invalidateCache();
    return quote;
  }

  async updateQuoteByRepairId(repairId: string, data: Partial<UpdateQuoteInput>) {
    // We need to find the ID first because Prisma update requires unique where input, and repairId is unique
    // But repository.update takes id.
    // I can use repository.updateMany (which takes where) or add updateByRepairId to repo.
    // updateMany is safer as it works with any where clause.
    const result = await quoteRepository.updateMany({ repairId }, data);
    await this.invalidateCache();
    return result;
  }

  async renameModel(brand: string, oldModel: string, newModel: string) {
    const result = await quoteRepository.updateMany(
      { brand, model: oldModel },
      { model: newModel }
    );
    await this.invalidateCache();
    return result;
  }

  async renameBrand(oldBrand: string, newBrand: string) {
    const result = await quoteRepository.updateMany(
      { brand: oldBrand },
      { brand: newBrand }
    );
    await this.invalidateCache();
    return result;
  }

  async deleteQuote(id: string) {
    const quote = await quoteRepository.delete(id);
    await this.invalidateCache();
    return quote;
  }

  async deleteModel(brand: string, model: string) {
    const result = await quoteRepository.deleteMany({ brand, model });
    await this.invalidateCache();
    return result;
  }

  async deleteBrand(brand: string) {
    const result = await quoteRepository.deleteMany({ brand });
    await this.invalidateCache();
    return result;
  }

  async deleteRepair(repairId: string) {
    // repairId is unique across the table? schema says @unique @map("repair_id")
    // Yes, repairId is unique.
    // However, the schema says repairId is String @unique.
    // Wait, let's check schema again.
    // repairId    String   @unique @map("repair_id")
    // So we can delete by repairId directly.
    // But repository doesn't have deleteByRepairId, only delete (by id - primary key).
    // I need to find the ID first or add deleteMany support (which I did).
    const result = await quoteRepository.deleteMany({ repairId });
    await this.invalidateCache();
    return result;
  }

  async getBrands() {
    const cacheKey = `${QuoteService.CACHE_KEY_PREFIX}brands`;
    const cached = await cache.get(cacheKey);
    if (cached) return cached;

    const brands = await quoteRepository.findDistinctBrands();
    await cache.set(cacheKey, brands, 3600);
    return brands;
  }

  private async invalidateCache() {
    await cache.flushPattern(`${QuoteService.CACHE_KEY_PREFIX}*`);
  }

  private getCurrencySymbol(currency: string): string {
    switch (currency) {
      case "EUR": return "€";
      case "USD": return "$";
      case "CNY": return "¥";
      case "GBP": return "£";
      default: return currency + " ";
    }
  }
}

export const quoteService = new QuoteService();
