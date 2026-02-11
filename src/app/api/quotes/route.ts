import { QuoteService } from "@/services/quotes";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Helper to convert Prisma result to API response format (snake_case)
function toApiResponse(quote: any) {
  return {
    id: quote.id,
    brand: quote.brand,
    model: quote.model,
    repair_id: quote.repairId,
    repair_label: quote.repairLabel,
    repair_type: quote.repairType,
    quality: quote.quality,
    price: quote.price,
    warranty: quote.warranty,
    count: quote.count,
    is_unstable: quote.isUnstable,
    price_spread: quote.priceSpread,
    created_at: quote.createdAt,
    updated_at: quote.updatedAt,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "0");
    const brand = searchParams.get("brand") || undefined;
    const search = searchParams.get("search") || undefined;
    const currency = searchParams.get("currency") || 'EUR';
    
    const result = await QuoteService.getQuotes({
      page,
      limit,
      brand,
      search,
      currency
    });
    
    const response = NextResponse.json(result);
    // Cache control is handled by the service (internal cache), but we can also set browser cache
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    
    return response;
  } catch (error) {
    console.error("GET /api/quotes Error:", error);
    return NextResponse.json({ error: "Failed to fetch quotes", details: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = new URL(request.url);
    const replaceAll = url.searchParams.get("replace") === "true";
    
    // Validate body
    if (!Array.isArray(body) && !body.brand) {
       return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (Array.isArray(body)) {
      console.log(`Processing bulk import: ${body.length} records. Replace: ${replaceAll}`);
      
      // Validate items in batch
      const validItems = body.filter(item => 
        item.brand && item.model && item.repair_id && typeof item.price === 'number'
      );
      
      if (validItems.length < body.length) {
        console.warn(`Filtered out ${body.length - validItems.length} invalid records.`);
      }

      if (validItems.length === 0) {
        return NextResponse.json({ error: "No valid records to save" }, { status: 400 });
      }

      // Transaction for bulk operations
      const result = await db.$transaction(async (tx) => {
        // Delete all if replaceAll is true
        if (replaceAll) {
          console.log("Deleting all existing quotes...");
          await tx.quote.deleteMany({});
        }

        // Chunk size for batch processing
        const CHUNK_SIZE = 1000; 
        let totalInserted = 0;
        
        if (replaceAll) {
           // Batch insert
           for (let i = 0; i < validItems.length; i += CHUNK_SIZE) {
             const chunk = validItems.slice(i, i + CHUNK_SIZE);
             console.log(`Inserting chunk ${i/CHUNK_SIZE + 1} (${chunk.length} items)...`);
             
             const insertResult = await tx.quote.createMany({
               data: chunk.map(item => ({
                 brand: item.brand,
                 model: item.model,
                 repairId: item.repair_id,
                 repairLabel: item.repair_label,
                 repairType: item.repair_type,
                 quality: item.quality,
                 price: item.price,
                 warranty: item.warranty,
                 count: item.count,
                 isUnstable: item.is_unstable,
                 priceSpread: item.price_spread,
               })),
               skipDuplicates: true 
             });
             totalInserted += insertResult.count;
           }
           return { count: totalInserted, operation: 'replace' };
        } else {
          // Upsert loop for non-replace bulk (slower but safer for updates)
          // Also chunk this to avoid memory issues if array is huge
          const upserted = [];
          for (const item of validItems) {
            const record = await tx.quote.upsert({
              where: { repairId: item.repair_id },
              update: {
                brand: item.brand,
                model: item.model,
                repairLabel: item.repair_label,
                repairType: item.repair_type,
                quality: item.quality,
                price: item.price,
                warranty: item.warranty,
                count: item.count,
                isUnstable: item.is_unstable,
                priceSpread: item.price_spread,
              },
              create: {
                brand: item.brand,
                model: item.model,
                repairId: item.repair_id,
                repairLabel: item.repair_label,
                repairType: item.repair_type,
                quality: item.quality,
                price: item.price,
                warranty: item.warranty,
                count: item.count,
                isUnstable: item.is_unstable,
                priceSpread: item.price_spread,
              },
            });
            upserted.push(record);
          }
          return { count: upserted.length, operation: 'upsert', data: upserted.map(toApiResponse) };
        }
      }, {
        maxWait: 10000, // 10s max wait
        timeout: 20000  // 20s timeout
      });
      
      await QuoteService.invalidateCache();
      return NextResponse.json(result);
    } else {
      // Single insert
      const item = body;
      const record = await db.quote.create({
        data: {
          brand: item.brand,
          model: item.model,
          repairId: item.repair_id,
          repairLabel: item.repair_label,
          repairType: item.repair_type,
          quality: item.quality,
          price: item.price,
          warranty: item.warranty,
          count: item.count,
          isUnstable: item.is_unstable,
          priceSpread: item.price_spread,
        },
      });
      
      await QuoteService.invalidateCache();
      return NextResponse.json(toApiResponse(record));
    }
  } catch (error: any) {
    console.error("POST /api/quotes Error:", error);
    // Enhanced error logging
    const errorDetails = {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    };
    return NextResponse.json({ error: "Database operation failed", details: errorDetails }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, brand, oldModel, newModel, oldBrand, newBrand, seriesModels, ...updates } = body;

  try {
    // Rename brand
    if (oldBrand && newBrand) {
      const result = await db.quote.updateMany({
        where: { brand: oldBrand },
        data: { brand: newBrand },
      });
      await QuoteService.invalidateCache();
      return NextResponse.json({ success: true, updated: result.count });
    }

    // Rename series (not implemented in original properly, but let's try)
    if (brand && seriesModels && Array.isArray(seriesModels) && newModel) {
      // This is complex in Prisma without raw SQL for string replacement
      // We'll iterate
      let totalUpdated = 0;
      await db.$transaction(async (tx) => {
        for (const oldModelName of seriesModels) {
          // Logic: replace series prefix
          const newModelName = oldModelName.replace(/^[^0-9]+/, newModel + ' ');
          const result = await tx.quote.updateMany({
            where: { brand, model: oldModelName },
            data: { model: newModelName },
          });
          totalUpdated += result.count;
        }
      });
      await QuoteService.invalidateCache();
      return NextResponse.json({ success: true, updated: totalUpdated });
    }

    // Rename model
    if (brand && oldModel && newModel) {
      const result = await db.quote.updateMany({
        where: { brand, model: oldModel },
        data: { model: newModel },
      });
      await QuoteService.invalidateCache();
      return NextResponse.json({ success: true, updated: result.count });
    }

    // Single record update
    if (id) {
      // Convert snake_case updates to camelCase if needed
      // Actually updates usually contain specific fields. 
      // The frontend sends `price`, `warranty` which match.
      const updateData: any = { ...updates };
      // Map fields if they exist in updates
      if (updates.repair_label) updateData.repairLabel = updates.repair_label;
      if (updates.repair_type) updateData.repairType = updates.repair_type;
      if (updates.is_unstable !== undefined) updateData.isUnstable = updates.is_unstable;
      if (updates.price_spread) updateData.priceSpread = updates.price_spread;

      // Clean up snake_case keys
      delete updateData.repair_label;
      delete updateData.repair_type;
      delete updateData.is_unstable;
      delete updateData.price_spread;

      // Find by repairId if id is not UUID (original code uses repair_id as id sometimes?)
      // The original code: .eq("id", id) where id comes from r.id.
      // In our schema, id is CUID, repairId is the CSV/System ID.
      // Frontend sends `id` which maps to `r.id` which maps to `quote.repairId` (from convertFromDbRecords)
      // Wait, let's check `utils.ts`: 
      // map[key].repairs.push({ id: r.repair_id || r.id ... })
      // So frontend ID is likely the repairId (CSV ID).
      
      // Try to find by id (CUID) or repairId
      // But update requires unique input.
      // Let's assume frontend sends the database ID if it exists, or repairId.
      // Actually, looking at `convertFromDbRecords`:
      // id: r.repair_id || r.id
      // It prefers repair_id.
      
      // Let's try to update by repairId first
      try {
        const record = await db.quote.update({
          where: { repairId: id },
          data: updateData,
        });
        await QuoteService.invalidateCache();
        return NextResponse.json(toApiResponse(record));
      } catch (e) {
        // Fallback to id if repairId fails (maybe it is a CUID)
        const record = await db.quote.update({
          where: { id: id },
          data: updateData,
        });
        await QuoteService.invalidateCache();
        return NextResponse.json(toApiResponse(record));
      }
    }

    return NextResponse.json({ error: "Missing id or rename parameters" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const repairId = searchParams.get("repair_id");

  try {
    if (repairId) {
      await db.quote.delete({
        where: { repairId: repairId },
      });
    } else if (brand && model) {
      await db.quote.deleteMany({
        where: { brand, model },
      });
    } else if (brand) {
      await db.quote.deleteMany({
        where: { brand },
      });
    } else if (id) {
      await db.quote.delete({
        where: { id },
      });
    } else {
      // Delete all (dangerous!)
      // Original code: .neq("id", "000...")
      await db.quote.deleteMany({});
    }

    await QuoteService.invalidateCache();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
