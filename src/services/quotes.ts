import { db } from "@/lib/db";
import { cache } from "@/lib/cache";
import { Prisma } from "@prisma/client";

// Currency rates (mock - in real app fetch from external API)
const EXCHANGE_RATES: Record<string, number> = {
  EUR: 1,
  USD: 1.08,
  CNY: 7.85,
  GBP: 0.85
};

export type QuoteFilter = {
  brand?: string;
  search?: string;
  page?: number;
  limit?: number;
  currency?: string;
};

export class QuoteService {
  private static CACHE_TTL = 300; // 5 minutes
  private static CACHE_KEY_PREFIX = 'quotes:';

  static async getQuotes(filter: QuoteFilter) {
    const page = filter.page || 1;
    const limit = filter.limit || 0;
    const currency = filter.currency || 'EUR';
    
    // Generate cache key based on all filter params
    const cacheKey = `${this.CACHE_KEY_PREFIX}list:${JSON.stringify(filter)}`;
    
    // Try cache first
    const cached = await cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Build query
    const where: Prisma.QuoteWhereInput = {};
    
    if (filter.brand && filter.brand !== 'all') {
      where.brand = { equals: filter.brand, mode: 'insensitive' };
    }
    
    if (filter.search) {
      where.OR = [
        { model: { contains: filter.search, mode: 'insensitive' } },
        { repairLabel: { contains: filter.search, mode: 'insensitive' } },
        { repairId: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    // Pagination
    const skip = (page - 1) * (limit > 0 ? limit : 0);
    const take = limit > 0 ? limit : undefined;

    // Execute DB query
    const [quotes, total] = await Promise.all([
      db.quote.findMany({
        where,
        orderBy: [
          { brand: 'asc' },
          { model: 'asc' },
        ],
        skip,
        take,
      }),
      db.quote.count({ where }),
    ]);

    // Transform data (currency conversion)
    const rate = EXCHANGE_RATES[currency] || 1;
    const transformedQuotes = quotes.map(q => ({
      ...this.toDTO(q),
      price: Number((q.price * rate).toFixed(2)),
      currency,
      display_price: `${this.getCurrencySymbol(currency)}${Number((q.price * rate).toFixed(2))}`
    }));

    const result = {
      data: transformedQuotes,
      meta: {
        total,
        page,
        limit,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      }
    };

    // Set cache
    await cache.set(cacheKey, result, this.CACHE_TTL);
    
    return result;
  }

  static async getBrands() {
    const cacheKey = `${this.CACHE_KEY_PREFIX}brands`;
    const cached = await cache.get(cacheKey);
    if (cached) return cached;

    const brands = await db.quote.findMany({
      select: { brand: true },
      distinct: ['brand'],
      orderBy: { brand: 'asc' }
    });

    const result = brands.map(b => b.brand);
    await cache.set(cacheKey, result, 3600); // Cache for 1 hour
    return result;
  }

  // Invalidate cache when data changes
  static async invalidateCache() {
    await cache.flushPattern(`${this.CACHE_KEY_PREFIX}*`);
  }

  private static toDTO(quote: any) {
    return {
      id: quote.id,
      brand: quote.brand,
      model: quote.model,
      repair_id: quote.repairId,
      repair_label: quote.repairLabel,
      repair_type: quote.repairType,
      quality: quote.quality,
      price: quote.price, // Base price in EUR
      warranty: quote.warranty,
      count: quote.count,
      is_unstable: quote.isUnstable,
      price_spread: quote.priceSpread,
      created_at: quote.createdAt,
      updated_at: quote.updatedAt,
    };
  }

  private static getCurrencySymbol(currency: string): string {
    switch (currency) {
      case 'EUR': return '€';
      case 'USD': return '$';
      case 'CNY': return '¥';
      case 'GBP': return '£';
      default: return currency + ' ';
    }
  }
}
