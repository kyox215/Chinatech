import { NextResponse } from "next/server";
import { startBatch, processChunk, finalizeBatch } from "@/services/deltaImporter";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const batchId = body.batch_id as string;
    const records = (body.records || []) as any[];
    const finalize = !!body.finalize;
    const fileName = body.file_name as string | undefined;
    const fileHash = body.file_hash as string | undefined;

    if (!batchId) {
      return NextResponse.json({ error: "Missing batch_id" }, { status: 400 });
    }

    if (finalize) {
      const res = await finalizeBatch(batchId);
      return NextResponse.json({ batch_id: batchId, ...res });
    }

    if (!Array.isArray(records) || records.length === 0) {
      return NextResponse.json({ error: "No records provided" }, { status: 400 });
    }

    await startBatch(batchId, fileName, fileHash);
    const result = await processChunk(batchId, records);
    return NextResponse.json({ batch_id: batchId, ...result });
  } catch (error: any) {
    console.error("POST /api/quotes/import Error:", error);
    return NextResponse.json({ error: "Import failed", details: { message: error.message, stack: error.stack } }, { status: 500 });
  }
}
