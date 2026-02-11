import { db } from "@/lib/db";
import { Prisma, Quote } from "@prisma/client";
import { QuoteFilter } from "@/lib/validations/quote";

export class QuoteRepository {
  async findMany(filter: QuoteFilter) {
    const { brand, search, page = 1, limit = 0 } = filter;
    
    const where: Prisma.QuoteWhereInput = {
      isActive: true, // Default to showing only active quotes
    };

    if (brand && brand !== "all") {
      where.brand = { equals: brand, mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { model: { contains: search, mode: "insensitive" } },
        { repairLabel: { contains: search, mode: "insensitive" } },
        { repairId: { contains: search, mode: "insensitive" } },
      ];
    }

    const take = limit > 0 ? limit : undefined;
    const skip = take ? (Math.max(1, page) - 1) * take : undefined;

    const [data, total] = await Promise.all([
      db.quote.findMany({
        where,
        orderBy: [
          { brand: "asc" },
          { model: "asc" },
        ],
        skip,
        take,
      }),
      db.quote.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<Quote | null> {
    return db.quote.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.QuoteCreateInput): Promise<Quote> {
    return db.quote.create({
      data,
    });
  }

  async createMany(data: Prisma.QuoteCreateManyInput[]): Promise<Prisma.BatchPayload> {
    return db.quote.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async update(id: string, data: Prisma.QuoteUpdateInput): Promise<Quote> {
    return db.quote.update({
      where: { id },
      data,
    });
  }

  async updateMany(where: Prisma.QuoteWhereInput, data: Prisma.QuoteUpdateManyMutationInput): Promise<Prisma.BatchPayload> {
    return db.quote.updateMany({
      where,
      data,
    });
  }

  async delete(id: string): Promise<Quote> {
    // Soft delete usually better, but sticking to hard delete or status update based on requirements.
    // Here we'll implement hard delete as requested "rebuild", or maybe soft delete via isActive?
    // Let's stick to standard delete for now, or update isActive if preferred.
    // Looking at the schema, there is an isActive field. Let's support soft delete as an option, 
    // but the basic delete method usually means remove from DB.
    // However, to be safe, I'll check if the user wants soft delete.
    // For now, I'll implement a hard delete, but in the Service I might use update to set isActive=false.
    return db.quote.delete({
      where: { id },
    });
  }

  async deleteMany(where: Prisma.QuoteWhereInput): Promise<Prisma.BatchPayload> {
    return db.quote.deleteMany({
      where,
    });
  }

  async findDistinctBrands(): Promise<string[]> {
    const brands = await db.quote.findMany({
      select: { brand: true },
      distinct: ["brand"],
      orderBy: { brand: "asc" },
      where: { isActive: true },
    });
    return brands.map((b) => b.brand);
  }
}

export const quoteRepository = new QuoteRepository();
