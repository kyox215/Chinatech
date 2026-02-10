
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { initialCsvData, parseCSV } from "@/modules/recycling/data";

// GET: Retrieve all models
export async function GET() {
  try {
    let models = await db.recycleModel.findMany({
      orderBy: { releaseYear: 'desc' },
    });
    
    // Seed if empty
    if (models.length === 0) {
      console.log("Seeding recycling database...");
      try {
        const parsedData = parseCSV(initialCsvData);
        await db.recycleModel.createMany({
          data: parsedData.map(item => ({
            model: item.model,
            screenPrice: item.screenPrice,
            batteryPrice: item.batteryPrice,
            baseRecyclePrice: item.baseRecyclePrice,
            releaseYear: item.releaseYear,
          })),
          skipDuplicates: true, 
        });
        
        models = await db.recycleModel.findMany({
          orderBy: { releaseYear: 'desc' },
        });
      } catch (seedError) {
        console.warn("Seeding failed (database might be read-only or connecting):", seedError);
        // Continue returning empty array or whatever we found
      }
    }
    
    return NextResponse.json(models);
  } catch (error) {
    console.error("GET /api/recycling error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recycling models", details: (error as Error).message }, 
      { status: 500 }
    );
  }
}

// POST: Create a new model
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.model || typeof body.baseRecyclePrice !== 'number') {
      return NextResponse.json({ error: "Invalid data: 'model' and 'baseRecyclePrice' are required." }, { status: 400 });
    }

    const model = await db.recycleModel.create({
      data: {
        model: body.model,
        screenPrice: body.screenPrice || 0,
        batteryPrice: body.batteryPrice || 0,
        baseRecyclePrice: body.baseRecyclePrice,
        releaseYear: body.releaseYear || new Date().getFullYear(),
      },
    });
    return NextResponse.json(model);
  } catch (error) {
    console.error("POST /api/recycling error:", error);
    return NextResponse.json(
      { error: "Failed to create model", details: (error as Error).message }, 
      { status: 500 }
    );
  }
}
