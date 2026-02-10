import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if ID exists
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Update
    const updatedModel = await db.recycleModel.update({
      where: { id },
      data: {
        model: body.model,
        screenPrice: body.screenPrice,
        batteryPrice: body.batteryPrice,
        baseRecyclePrice: body.baseRecyclePrice,
        releaseYear: body.releaseYear,
      },
    });

    return NextResponse.json(updatedModel);
  } catch (error) {
    console.error("PUT /api/recycling/[id] error:", error);
    // Handle "Record not found" specifically if needed, but 500 covers it for now or 404
    return NextResponse.json(
      { error: "Failed to update model", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.recycleModel.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/recycling/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete model", details: (error as Error).message },
      { status: 500 }
    );
  }
}
