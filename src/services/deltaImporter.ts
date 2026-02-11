import { db } from "@/lib/db";
import crypto from "crypto";

export type IncomingRecord = {
  brand: string;
  model: string;
  repair_label: string;
  repair_type: string;
  quality: string;
  price: number;
  warranty: string;
  count?: number;
  is_unstable?: boolean;
  price_spread?: string | null;
};

function computeHash(r: IncomingRecord): string {
  const base = `${r.brand}|${r.model}|${r.repair_label}|${r.quality}|${r.price}|${r.warranty}`;
  return crypto.createHash("md5").update(base).digest("hex");
}

export async function startBatch(batchId: string, fileName?: string, fileHash?: string) {
  await db.importBatch.upsert({
    where: { batchId },
    update: { status: "RUNNING", startedAt: new Date(), fileName, fileHash },
    create: { batchId, status: "RUNNING", fileName, fileHash },
  });
}

export async function processChunk(batchId: string, records: IncomingRecord[]) {
  let inserted = 0, updated = 0, unchanged = 0;

  await db.$transaction(async (tx) => {
    for (const rec of records) {
      const hash = computeHash(rec);
      const existing = await tx.quote.findFirst({
        where: {
          brand: rec.brand,
          model: rec.model,
          repairLabel: rec.repair_label,
          quality: rec.quality,
        },
      });

      if (!existing) {
        await tx.quote.create({
          data: {
            brand: rec.brand,
            model: rec.model,
            repairId: crypto.randomUUID(),
            repairLabel: rec.repair_label,
            repairType: rec.repair_type,
            quality: rec.quality,
            price: rec.price,
            warranty: rec.warranty,
            count: rec.count ?? 0,
            isUnstable: rec.is_unstable ?? false,
            priceSpread: rec.price_spread ?? null,
            sourceHash: hash,
            sourceVersion: 1,
            isActive: true,
            lastSeenAt: new Date(),
            lastSeenBatchId: batchId,
          },
        });
        inserted++;
        await tx.syncLog.create({ data: { batchId, operation: "INSERT", entity: "QUOTE", key: `${rec.brand}|${rec.model}|${rec.repair_label}|${rec.quality}`, count: 1 } });
      } else {
        if (existing.sourceHash === hash) {
          unchanged++;
          await tx.quote.update({ where: { id: existing.id }, data: { lastSeenAt: new Date(), lastSeenBatchId: batchId, isActive: true } });
        } else {
          // Price/fields changed -> update and add price history
          await tx.priceHistory.create({
            data: {
              item: { // Create a shadow item to track price changes if not using QuoteItem yet
                create: {
                  header: { create: { quoteNo: `DELTA-${batchId}`, status: "SYSTEM" } },
                  product: undefined,
                  repairLabel: rec.repair_label,
                  repairType: rec.repair_type,
                  quality: rec.quality,
                  unitPrice: rec.price,
                  warranty: rec.warranty,
                },
              },
              oldPrice: existing.price,
              newPrice: rec.price,
              changeReason: "Delta import",
              checksum: hash,
              version: (existing.sourceVersion ?? 1) + 1,
            },
          });

          await tx.quote.update({
            where: { id: existing.id },
            data: {
              price: rec.price,
              warranty: rec.warranty,
              count: rec.count ?? existing.count,
              isUnstable: rec.is_unstable ?? existing.isUnstable,
              priceSpread: rec.price_spread ?? existing.priceSpread,
              sourceHash: hash,
              sourceVersion: (existing.sourceVersion ?? 1) + 1,
              isActive: true,
              lastSeenAt: new Date(),
              lastSeenBatchId: batchId,
            },
          });
          updated++;
          await tx.syncLog.create({ data: { batchId, operation: "UPDATE", entity: "QUOTE", key: `${rec.brand}|${rec.model}|${rec.repair_label}|${rec.quality}`, count: 1 } });
        }
      }
    }
  }, { maxWait: 10000, timeout: 20000 });

  return { inserted, updated, unchanged };
}

export async function finalizeBatch(batchId: string) {
  // Mark records not seen in this batch as inactive (soft delete)
  const result = await db.quote.updateMany({
    where: {
      OR: [
        { lastSeenBatchId: { not: batchId } },
        { lastSeenBatchId: null },
      ],
    },
    data: { isActive: false },
  });

  await db.importBatch.update({ where: { batchId }, data: { status: "FINISHED", finishedAt: new Date() } });
  await db.syncLog.create({ data: { batchId, operation: "FINALIZE", entity: "QUOTE", message: `Deactivated ${result.count} records`, count: result.count } });

  return { deactivated: result.count };
}
