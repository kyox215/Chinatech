import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { initialCsvData, parseCSV } from "@/modules/recycling/data";

export async function GET() {
  try {
    let models = await db.recycleModel.findMany({
      orderBy: { releaseYear: 'desc' },
    });
    
    // If database is empty, seed with initial data
    if (models.length === 0) {
      console.log("Seeding recycling database...");
      const parsedData = parseCSV(initialCsvData);
      
      await db.$transaction(
        parsedData.map(item => 
          db.recycleModel.create({
            data: {
              model: item.model,
              screenPrice: item.screenPrice,
              batteryPrice: item.batteryPrice,
              baseRecyclePrice: item.baseRecyclePrice,
              releaseYear: item.releaseYear,
            }
          })
        )
      );
      
      models = await db.recycleModel.findMany({
        orderBy: { releaseYear: 'desc' },
      });
    }
    
    return NextResponse.json(models);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const model = await db.recycleModel.create({
      data: {
        model: body.model,
        screenPrice: body.screenPrice,
        batteryPrice: body.batteryPrice,
        baseRecyclePrice: body.baseRecyclePrice,
        releaseYear: body.releaseYear,
      },
    });
    return NextResponse.json(model);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
