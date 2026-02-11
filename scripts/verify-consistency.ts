import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';
import crypto from 'crypto';

// Load .env manually
try {
  const envPath = path.join(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
        if (key && !process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (e) {
  console.warn('⚠️ Could not read .env file');
}

// Initialize Prisma with Adapter (matching app logic)
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ 
  connectionString: connectionString ? connectionString.replace("sslmode=require", "") : undefined,
  ssl: { rejectUnauthorized: false } // For Supabase/Cloud DBs often needed in scripts
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Configuration
const REPORT_DIR = path.join(__dirname, '../reports');
const FIX_DIR = path.join(__dirname, '../fixes');

// Ensure directories exist
if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });
if (!fs.existsSync(FIX_DIR)) fs.mkdirSync(FIX_DIR, { recursive: true });

// --- Type Definitions (Simplified from App) ---
interface CSVRow {
  [key: string]: string;
}

interface ExpectedRecord {
  repairId: string;
  brand: string;
  model: string;
  repairLabel: string;
  repairType: string;
  quality: string;
  price: number;
  warranty: string;
  sourceHash: string; // For integrity check
}

// --- Helper Functions (Ported/Simplified from App) ---
function categorize(problem: string): { type: 'screen' | 'battery' | 'other'; label: string; quality: 'orig' | 'comp' | 'altcap' | 'standard' } {
  const p = (problem || '').toUpperCase();
  let type: 'screen' | 'battery' | 'other' = 'other';
  let label = '其他';
  let quality: 'orig' | 'comp' | 'altcap' | 'standard' = 'standard';

  if (p.includes('BATTERIA') || p.includes('BATTERY')) {
    type = 'battery';
    if (p.includes('ALT CAP') || p.includes('扩容')) { label = '电池 (扩容)'; quality = 'altcap'; }
    else if (p.includes('COMP') || p.includes('组装')) { label = '电池 (组装)'; quality = 'comp'; }
    else if (p.includes('ORIG') || p.includes('原装')) { label = '电池 (原装)'; quality = 'orig'; }
    else { label = '电池'; quality = 'standard'; }
  } else if (p.includes('LCD') || p.includes('DISPLAY') || p.includes('屏幕')) {
    type = 'screen';
    if (p.includes('COMP') || p.includes('组装')) { label = '屏幕 (组装)'; quality = 'comp'; }
    else if (p.includes('ORIG') || p.includes('原装')) { label = '屏幕 (原装)'; quality = 'orig'; }
    else { label = '屏幕'; quality = 'standard'; }
  } else {
    label = problem; // Simplified for script
  }
  return { type, label, quality };
}

function generateHash(record: any): string {
  const str = `${record.brand}|${record.model}|${record.repairLabel}|${record.price}|${record.warranty}`;
  return crypto.createHash('md5').update(str).digest('hex');
}

// --- Main Verification Logic ---
async function verifyConsistency(csvPath: string) {
  console.log(`🚀 Starting Data Consistency Verification...`);
  console.log(`📂 Source: ${csvPath}`);
  console.log(`🗄️  Target: Supabase Database (Quote Table)`);

  // 1. Load and Process CSV (Source of Truth)
  console.log(`\n1️⃣  Loading Source Data...`);
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const parsed = Papa.parse<CSVRow>(csvContent, { header: true, skipEmptyLines: true });
  
  const expectedMap = new Map<string, ExpectedRecord>();
  
  parsed.data.forEach((row, idx) => {
    const brand = (row['MARCA'] || row['Brand'] || '').trim().toUpperCase();
    const model = (row['MODELLO'] || row['Model'] || '').trim();
    const problem = (row['PROBLEMA'] || row['Repair Item'] || '').trim();
    const priceStr = row['PREZZO TOTALE'] || row['Price'] || '0';
    const price = parseFloat(priceStr.replace(',', '.').replace(/[^\d.]/g, ''));
    const warranty = (row['GARANZIA'] || row['Warranty'] || 'N/A').trim();

    if (!brand || !model || !problem) return;

    // Simulate App Logic (Simplified)
    const cat = categorize(problem);
    
    // In the real app, ID is generated. Here, we need a stable key to compare.
    // We'll use a composite key: Brand + Model + RepairLabel + Quality
    // NOTE: This assumes unique constraints on business logic, which might not strictly exist in DB (DB uses repairId).
    // For verification, we try to match by 'repairId' if available in CSV, else by Content.
    
    // Check if CSV has an ID (e.g. exported data)
    let repairId = row['repair_id'] || row['id']; 
    
    // If no ID in CSV, we can't do exact ID matching against DB unless we fetch by fields.
    // For this script, let's assume we are verifying an EXPORTED CSV which likely has IDs, 
    // OR we match by fields.
    
    // Strategy: Fetch ALL DB records and match by content hash if ID not present.
    const record: ExpectedRecord = {
      repairId: repairId || `GEN-${idx}`, // Temporary ID if missing
      brand,
      model,
      repairLabel: cat.label,
      repairType: cat.type,
      quality: cat.quality,
      price,
      warranty,
      sourceHash: ''
    };
    record.sourceHash = generateHash(record);
    
    // Use composite key for matching map
    const key = repairId || `${brand}|${model}|${cat.label}|${cat.quality}`;
    expectedMap.set(key, record);
  });

  console.log(`✅ Loaded ${expectedMap.size} valid records from Source.`);

  // 2. Load DB Data
  console.log(`\n2️⃣  Loading Database Data...`);
  const dbRecords = await prisma.quote.findMany();
  console.log(`✅ Loaded ${dbRecords.length} records from Database.`);

  // 3. Compare
  console.log(`\n3️⃣  Executing Comparison Logic...`);
  
  const missingInDb: ExpectedRecord[] = [];
  const missingInSource: any[] = [];
  const mismatches: { id: string; field: string; source: any; db: any }[] = [];
  
  // Index DB records for fast lookup
  const dbMap = new Map<string, any>();
  const dbContentMap = new Map<string, any>(); // Fallback for content matching

  dbRecords.forEach(r => {
    dbMap.set(r.repairId, r);
    const hash = generateHash(r);
    dbContentMap.set(hash, r);
  });

  // Check Source -> DB
  for (const [key, expected] of expectedMap.entries()) {
    let match = null;
    
    // Try ID match first
    if (expected.repairId && !expected.repairId.startsWith('GEN-')) {
      match = dbMap.get(expected.repairId);
    }
    
    // If no ID match, try content match
    if (!match) {
      match = dbContentMap.get(expected.sourceHash);
    }

    if (!match) {
      missingInDb.push(expected);
    } else {
      // Deep Compare Fields
      if (Math.abs(match.price - expected.price) > 0.01) {
        mismatches.push({ id: match.repairId, field: 'price', source: expected.price, db: match.price });
      }
      if (match.warranty !== expected.warranty) {
        mismatches.push({ id: match.repairId, field: 'warranty', source: expected.warranty, db: match.warranty });
      }
      // Add more field checks as needed
    }
  }

  // Check DB -> Source (Extra records in DB)
  // This is tricky if keys are generated. We'll skip this for "GEN-" keys scenario 
  // unless we are strictly verifying a full backup restore.
  // Assuming strict sync:
  dbRecords.forEach(r => {
    const hash = generateHash(r);
    // Reverse lookup is hard without full iteration or bidirectional map.
    // Simplified: If DB record ID is not in expectedMap (if expected has IDs)
    // For now, we focus on "Missing in DB" and "Mismatches".
  });

  // 4. Generate Report
  console.log(`\n4️⃣  Generating Consistency Report...`);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(REPORT_DIR, `consistency_report_${timestamp}.md`);
  
  let reportContent = `# Data Consistency Report\n\n`;
  reportContent += `**Date:** ${new Date().toLocaleString()}\n`;
  reportContent += `**Source:** ${path.basename(csvPath)}\n`;
  reportContent += `**Target:** Supabase (Quotes)\n\n`;
  
  reportContent += `## Summary\n`;
  reportContent += `- **Source Records:** ${expectedMap.size}\n`;
  reportContent += `- **DB Records:** ${dbRecords.length}\n`;
  reportContent += `- **Missing in DB:** ${missingInDb.length} (High Priority)\n`;
  reportContent += `- **Field Mismatches:** ${mismatches.length} (Medium Priority)\n\n`;

  if (missingInDb.length > 0) {
    reportContent += `## 🔴 Missing Records (Need Insert)\n`;
    reportContent += `| Brand | Model | Repair | Price |\n|---|---|---|---|\n`;
    missingInDb.slice(0, 10).forEach(r => {
      reportContent += `| ${r.brand} | ${r.model} | ${r.repairLabel} | ${r.price} |\n`;
    });
    if (missingInDb.length > 10) reportContent += `| ... | ... | ... | ... |\n`;
    reportContent += `\n`;
  }

  if (mismatches.length > 0) {
    reportContent += `## 🟡 Data Mismatches (Need Update)\n`;
    reportContent += `| ID | Field | Source Value | DB Value |\n|---|---|---|---|\n`;
    mismatches.slice(0, 10).forEach(m => {
      reportContent += `| ${m.id} | ${m.field} | ${m.source} | ${m.db} |\n`;
    });
    reportContent += `\n`;
  }

  fs.writeFileSync(reportPath, reportContent);
  console.log(`📄 Report saved to: ${reportPath}`);

  // 5. Generate Fix SQL
  if (missingInDb.length > 0 || mismatches.length > 0) {
    console.log(`\n5️⃣  Generating Repair SQL Script...`);
    const sqlPath = path.join(FIX_DIR, `fix_data_${timestamp}.sql`);
    let sqlContent = `-- Auto-generated repair script\n-- Date: ${new Date().toISOString()}\n\n`;

    if (missingInDb.length > 0) {
      sqlContent += `-- Insert Missing Records (${missingInDb.length})\n`;
      missingInDb.forEach(r => {
        // Use a real ID generator in production
        const newId = r.repairId.startsWith('GEN-') ? crypto.randomUUID() : r.repairId; 
        sqlContent += `INSERT INTO "quotes" ("id", "brand", "model", "repair_id", "repair_label", "repair_type", "quality", "price", "warranty", "count", "is_unstable", "created_at", "updated_at") VALUES (gen_random_uuid(), '${r.brand}', '${r.model}', '${newId}', '${r.repairLabel}', '${r.repairType}', '${r.quality}', ${r.price}, '${r.warranty}', 1, false, NOW(), NOW()) ON CONFLICT ("repair_id") DO NOTHING;\n`;
      });
    }

    if (mismatches.length > 0) {
      sqlContent += `\n-- Update Mismatched Records (${mismatches.length})\n`;
      mismatches.forEach(m => {
        const val = typeof m.source === 'string' ? `'${m.source}'` : m.source;
        sqlContent += `UPDATE "quotes" SET "${m.field}" = ${val}, "updated_at" = NOW() WHERE "repair_id" = '${m.id}';\n`;
      });
    }

    fs.writeFileSync(sqlPath, sqlContent);
    console.log(`🛠️  Fix SQL saved to: ${sqlPath}`);
  } else {
    console.log(`\n✨ Data is perfectly consistent! No fixes needed.`);
  }

  await prisma.$disconnect();
}

// Run
const csvArg = process.argv[2] || 'scripts/mock_source.csv'; // Default to a mock file if not provided

// Create a mock file if it doesn't exist for demonstration
if (!fs.existsSync(csvArg) && csvArg === 'scripts/mock_source.csv') {
  console.log(`ℹ️  Creating mock source file for demonstration...`);
  const header = 'Brand,Model,Repair Item,Quality,Price,Warranty,repair_id\n';
  const row1 = 'TEST_BRAND,Test Model 1,Screen Replacement,Original,100,12 Months,test-repair-1\n';
  const row2 = 'TEST_BRAND,Test Model 2,Battery Replacement,Original,50,6 Months,test-repair-2\n';
  fs.writeFileSync(csvArg, header + row1 + row2);
}

verifyConsistency(csvArg).catch(e => {
  console.error(e);
  process.exit(1);
});
