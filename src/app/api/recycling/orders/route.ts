
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { model, storage, condition, battery, screen, price } = body;

    // Validation
    if (!model || !storage || !condition || !battery || typeof price !== 'number') {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderNo = `REC-${nanoid(8).toUpperCase()}`;

    const order = await db.recycleOrder.create({
      data: {
        orderNo,
        model,
        storage,
        condition,
        battery,
        screen: screen ? "BROKEN" : "OK",
        price,
        status: "PENDING"
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("POST /api/recycling/orders error:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await db.recycleOrder.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
