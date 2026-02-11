
import { NextResponse } from "next/server";
import { RepairService } from "@/services/repairService";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (body.status) {
      const result = await RepairService.updateStatus(id, body.status);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Invalid update data" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
