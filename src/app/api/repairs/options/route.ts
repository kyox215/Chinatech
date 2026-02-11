
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Fetch all distinct brands and models from Quotes (as they represent repairable devices)
    const quotes = await db.quote.findMany({
      select: {
        brand: true,
        model: true,
      },
      distinct: ['brand', 'model'],
      orderBy: [
        { brand: 'asc' },
        { model: 'asc' }
      ]
    });

    const brands = Array.from(new Set(quotes.map(q => q.brand)));
    const modelsByBrand: Record<string, string[]> = {};

    quotes.forEach(q => {
      if (!modelsByBrand[q.brand]) {
        modelsByBrand[q.brand] = [];
      }
      modelsByBrand[q.brand].push(q.model);
    });

    return NextResponse.json({
      brands,
      models: modelsByBrand
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch options" }, { status: 500 });
  }
}
