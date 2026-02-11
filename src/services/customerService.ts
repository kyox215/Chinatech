
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class CustomerService {
  static async list(params: { search?: string; page?: number; limit?: number }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.CustomerWhereInput = {};
    
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { phone: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
        { taxId: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      db.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          _count: {
            select: { repairOrders: true }
          }
        }
      }),
      db.customer.count({ where })
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async create(data: Prisma.CustomerCreateInput) {
    // Check duplication by phone if provided
    if (data.phone) {
      const existing = await db.customer.findFirst({
        where: { phone: data.phone }
      });
      if (existing) throw new Error(`Customer with phone ${data.phone} already exists`);
    }

    return db.customer.create({ data });
  }

  static async update(id: string, data: Prisma.CustomerUpdateInput) {
    return db.customer.update({
      where: { id },
      data
    });
  }

  static async getById(id: string) {
    return db.customer.findUnique({
      where: { id },
      include: {
        repairOrders: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });
  }
}
