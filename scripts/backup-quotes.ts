import fs from "fs";
import path from "path";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3001";

async function main() {
  const res = await fetch(`${BASE_URL}/api/quotes?limit=0`);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const json = await res.json();
  const quotes = json.data;
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir = path.join(process.cwd(), "backups");
  const outPath = path.join(outDir, `quotes-${ts}.json`);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(quotes, null, 2));
  console.log("Backup written:", outPath);
}

main().catch(e => { console.error(e); process.exit(1); });
