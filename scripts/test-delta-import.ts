import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomUUID } from "crypto";

const connectionString = process.env.DATABASE_URL as string | undefined;
const pool = new Pool({ connectionString: connectionString ? connectionString.replace("sslmode=require", "") : undefined, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3001";

async function postJSON(url: string, body: any) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function main() {
  const batchId = `batch-${randomUUID()}`;
  console.log("Batch:", batchId);

  // Initial dataset (3 items)
  const initial = [
    { brand: "APPLE", model: "iPhone 12", repair_label: "屏幕 (原装)", repair_type: "screen", quality: "orig", price: 200, warranty: "12M" },
    { brand: "APPLE", model: "iPhone 12", repair_label: "电池 (原装)", repair_type: "battery", quality: "orig", price: 80, warranty: "12M" },
    { brand: "SAMSUNG", model: "Galaxy S21", repair_label: "屏幕 (组装)", repair_type: "screen", quality: "comp", price: 150, warranty: "6M" },
  ];

  console.log("1) Initial import...");
  let r1 = await postJSON(`${BASE_URL}/api/quotes/import`, { batch_id: batchId, records: initial });
  console.log("Initial:", r1);

  console.log("Finalize after initial...");
  let f1 = await postJSON(`${BASE_URL}/api/quotes/import`, { batch_id: batchId, finalize: true });
  console.log("Finalize1:", f1);

  // Delta dataset: modify, add, remove
  const batchId2 = `batch-${randomUUID()}`;
  const delta = [
    { brand: "APPLE", model: "iPhone 12", repair_label: "屏幕 (原装)", repair_type: "screen", quality: "orig", price: 220, warranty: "12M" }, // price changed
    { brand: "APPLE", model: "iPhone 12", repair_label: "电池 (原装)", repair_type: "battery", quality: "orig", price: 80, warranty: "12M" }, // unchanged
    { brand: "APPLE", model: "iPhone 13", repair_label: "屏幕 (原装)", repair_type: "screen", quality: "orig", price: 240, warranty: "12M" }, // new
  ];

  console.log("2) Delta import...");
  let r2 = await postJSON(`${BASE_URL}/api/quotes/import`, { batch_id: batchId2, records: delta });
  console.log("Delta:", r2);

  console.log("Finalize after delta...");
  let f2 = await postJSON(`${BASE_URL}/api/quotes/import`, { batch_id: batchId2, finalize: true });
  console.log("Finalize2:", f2);

  // Validate results via API
  const res = await fetch(`${BASE_URL}/api/quotes?brand=APPLE&search=iPhone 12`);
  const json = await res.json();
  const iphone12Screen = json.data.find((q: any) => q.repair_label.includes("屏幕") && q.quality === "orig");
  if (!iphone12Screen || iphone12Screen.price !== 220) throw new Error("Price update failed for iPhone12 Screen");

  console.log("✅ Delta import test passed.");
}

main().catch(e => { console.error(e); process.exit(1); });
