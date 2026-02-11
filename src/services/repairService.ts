
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { nanoid } from "nanoid";

export class RepairService {
  static async list(params: { status?: string; search?: string; page?: number; limit?: number }) {
    const page = params.page || 1;
    const limit = params.limit || 50;
    const skip = (page - 1) * limit;

    const where: Prisma.RepairOrderWhereInput = {};

    if (params.status && params.status !== 'ALL') {
      where.status = params.status;
    }

    if (params.search) {
      where.OR = [
        { orderNo: { contains: params.search, mode: 'insensitive' } },
        { brand: { contains: params.search, mode: 'insensitive' } },
        { model: { contains: params.search, mode: 'insensitive' } },
        { imeiOrSn: { contains: params.search, mode: 'insensitive' } },
        { customer: { name: { contains: params.search, mode: 'insensitive' } } },
        { customer: { phone: { contains: params.search, mode: 'insensitive' } } },
      ];
    }

    const [data, total] = await Promise.all([
      db.repairOrder.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          customer: true,
          technician: {
            select: { id: true, email: true } // Assuming User has name/email
          }
        }
      }),
      db.repairOrder.count({ where })
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

  static async create(data: any) {
    // Generate readable ID
    // Format: REP-{Year}-{Random4}
    const year = new Date().getFullYear();
    const suffix = nanoid(4).toUpperCase();
    const orderNo = `REP-${year}-${suffix}`;

    // Handle Customer Linking
    let customerId = data.customerId;
    if (!customerId && data.customerPhone && data.customerName) {
      // Find or Create Customer
      const existing = await db.customer.findFirst({
        where: { phone: data.customerPhone }
      });
      
      if (existing) {
        customerId = existing.id;
      } else {
        const newCustomer = await db.customer.create({
          data: {
            name: data.customerName,
            phone: data.customerPhone,
            type: "RETAIL"
          }
        });
        customerId = newCustomer.id;
      }
    }

    return db.repairOrder.create({
      data: {
        orderNo,
        customerId,
        brand: data.brand,
        model: data.model,
        imeiOrSn: data.imeiOrSn,
        problem: data.problem,
        status: "PENDING",
        estimatedPrice: data.estimatedPrice ? parseFloat(data.estimatedPrice) : undefined,
        deposit: data.deposit ? parseFloat(data.deposit) : 0,
        pattern: data.pattern,
        passcode: data.passcode,
        intakeDate: new Date(),
      }
    });
  }

  static async updateStatus(id: string, status: string, userId?: string) {
    // Transaction to log change
    return db.$transaction(async (tx) => {
      const order = await tx.repairOrder.update({
        where: { id },
        data: { 
          status,
          completedDate: status === 'COMPLETED' ? new Date() : undefined,
          pickupDate: status === 'DELIVERED' ? new Date() : undefined
        }
      });

      await tx.orderLog.create({
        data: {
          repairOrderId: id,
          userId,
          action: "STATUS_CHANGE",
          details: `Status changed to ${status}`
        }
      });

      return order;
    });
  }
}
