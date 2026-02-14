import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// --- Helper Functions ---

function inferRepairType(label: string): string {
  const l = label.toLowerCase();
  if (l.includes('屏幕') || l.includes('screen') || l.includes('lcd') || l.includes('display') || l.includes('glass') || l.includes('触摸') || l.includes('touch') || l.includes('vetro')) return 'screen';
  if (l.includes('电池') || l.includes('battery') || l.includes('batteria')) return 'battery';
  if (l.includes('主板') || l.includes('motherboard') || l.includes('logic board')) return 'motherboard';
  if (l.includes('摄像头') || l.includes('camera')) return 'camera';
  if (l.includes('尾插') || l.includes('充电') || l.includes('charging') || l.includes('connector') || l.includes('usb')) return 'charging';
  if (l.includes('后盖') || l.includes('back cover') || l.includes('rear glass')) return 'back_cover';
  return 'other';
}

function inferCategory(brand: string, model: string): string {
  const b = brand.toUpperCase().trim();
  const m = model.toUpperCase().trim();

  // 1. APPLE
  if (b === 'APPLE') {
    if (m.startsWith('IPHONE')) return 'iPhone 系列';
    if (m.startsWith('IPAD')) return 'iPad 系列';
    if (m.startsWith('WATCH') || m.startsWith('APPLE WATCH')) return 'Apple Watch 系列';
    if (m.startsWith('MAC') || m.startsWith('MACBOOK') || m.startsWith('IMAC')) return 'Mac 系列';
    return 'Apple 其他';
  }

  // 2. SAMSUNG
  if (b === 'SAMSUNG') {
    if (m.startsWith('S')) return 'Galaxy S 系列';
    if (m.startsWith('Z') || m.includes('FOLD') || m.includes('FLIP')) return 'Galaxy Z 折叠屏';
    if (m.startsWith('NOTE')) return 'Galaxy Note 系列';
    if (m.startsWith('A')) return 'Galaxy A 系列';
    if (m.startsWith('M') || m.startsWith('J') || m.startsWith('F')) return 'Galaxy 入门系列';
    if (m.startsWith('TAB') || m.startsWith('T')) return 'Galaxy Tab 平板';
    return 'Samsung 其他';
  }

  // 3. HUAWEI
  if (b === 'HUAWEI') {
    if (m.startsWith('MATE')) return 'Mate 系列';
    if (m.startsWith('P') && !m.startsWith('P SMART')) return 'P 系列';
    if (m.startsWith('NOVA')) return 'Nova 系列';
    if (m.startsWith('Y') || m.startsWith('畅享')) return '畅享/Y 系列';
    if (m.startsWith('HONOR')) return 'Honor (荣耀)';
    return 'Huawei 其他';
  }

  // 4. XIAOMI / REDMI
  if (b === 'XIAOMI' || b === 'REDMI' || b === 'POCO') {
    if (m.startsWith('MI') || b === 'XIAOMI') return 'Xiaomi 系列';
    if (m.startsWith('REDMI') || b === 'REDMI') return 'Redmi 系列';
    if (m.startsWith('POCO') || b === 'POCO') return 'Poco 系列';
    return 'Xiaomi/Poco 其他';
  }

  // 5. OPPO
  if (b === 'OPPO') {
    if (m.startsWith('FIND')) return 'Find 系列';
    if (m.startsWith('RENO')) return 'Reno 系列';
    if (m.startsWith('A')) return 'A 系列';
    return 'OPPO 其他';
  }

  // 6. HONOR
  if (b === 'HONOR') {
    if (m.startsWith('MAGIC')) return 'Magic 系列';
    if (m.startsWith('X')) return 'X 系列';
    if (!isNaN(parseInt(m.match(/\d+/)?.[0] || '0')) && parseInt(m.match(/\d+/)?.[0] || '0') > 50) return '数字系列';
    return 'Honor 其他';
  }
  
  // 7. VIVO (If present)
  if (b === 'VIVO') {
      if (m.startsWith('X')) return 'X 系列';
      if (m.startsWith('S')) return 'S 系列';
      if (m.startsWith('Y')) return 'Y 系列';
      if (m.startsWith('IQOO')) return 'iQOO 系列';
      return 'Vivo 其他';
  }

  // 8. ZTE / NUBIA
  if (b === 'ZTE' || b === 'NUBIA') {
      if (m.includes('AXON')) return 'Axon 系列';
      if (m.includes('REDMAGIC') || m.includes('RED MAGIC')) return '红魔 (RedMagic)';
      if (m.includes('BLADE')) return 'Blade 系列';
      return 'ZTE 其他';
  }

  // 9. TCL
  if (b === 'TCL') {
      if (m.includes('NXT')) return 'NXTPAPER 系列';
      return 'TCL 手机';
  }

  return '其他品牌';
}

function calculatePriority(brand: string, model: string, category: string): number {
    let p = 0;
    const b = brand.toUpperCase();
    const m = model.toUpperCase();
    
    // Brand Tier
    if (b === 'APPLE') p += 1000;
    else if (b === 'SAMSUNG') p += 900;
    else if (b === 'HUAWEI') p += 800;
    else if (b === 'XIAOMI' || b === 'REDMI') p += 700;
    else if (b === 'OPPO' || b === 'VIVO' || b === 'HONOR') p += 600;
    else p += 100;

    // Series/Category Tier
    if (category.includes('15') || category.includes('24') || category.includes('70') || category.includes('14')) p += 500; // Latest
    else if (category.includes('14') || category.includes('23') || category.includes('60') || category.includes('13')) p += 400; // Previous
    else if (category.includes('Pro') || category.includes('Ultra') || category.includes('Max')) p += 50; // High-end suffix

    // Model specific (extract number)
    const numMatch = m.match(/\d+/);
    if (numMatch) {
        p += parseInt(numMatch[0]); // e.g. iPhone 15 adds 15 points, iPhone 8 adds 8.
    }
    
    return p;
}

function parseCSVLine(line: string): string[] {
  // Simple CSV parser handling quotes
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// --- Main Script ---

async function main() {
  console.log('Starting CSV Import Process...');

  // 1. Apply Schema Migration
  if (connectionString) {
    console.log('Applying database migration (adding category column)...');
    const pool = new Pool({ connectionString });
    try {
      const sqlPath = path.join(process.cwd(), 'supabase', 'migrations', '20240601_add_category_column.sql');
      if (fs.existsSync(sqlPath)) {
          const sql = fs.readFileSync(sqlPath, 'utf-8');
          await pool.query(sql);
          console.log('Schema updated successfully.');
      } else {
          console.warn('Migration file not found, skipping schema update (assuming already applied).');
      }
    } catch (err) {
      console.error('Failed to apply schema:', err);
    } finally {
      await pool.end();
    }
  }

  // 2. Read CSV File
  const csvPath = '/Users/hexiang/Documents/trae_projects/ChinaTechOS v1/维修报价表.csv';
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found at ${csvPath}`);
    process.exit(1);
  }

  console.log('Reading CSV file...');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = fileContent.split('\n').filter(l => l.trim().length > 0);
  
  // Skip header if present (Brand,Model,Repair Item...)
  const startIndex = lines[0].toLowerCase().includes('brand') ? 1 : 0;
  
  const records = [];
  const POPULAR_BRANDS = ['APPLE', 'SAMSUNG', 'HUAWEI', 'XIAOMI', 'OPPO'];
  const POPULAR_MODELS = ['IPHONE 15', 'IPHONE 14', 'IPHONE 13', 'S24', 'S23', 'P60'];

  for (let i = startIndex; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 5) continue; // Skip invalid lines

    // CSV Columns: Brand, Model, Repair Item, Quality, Price, Warranty
    // Note: CSV might have "Quality" at index 3, "Price" at index 4.
    // Line 1: Brand,Model,Repair Item,Quality,Price,Warranty
    
    const brand = cols[0].replace(/^"|"$/g, '');
    const model = cols[1].replace(/^"|"$/g, '');
    const repairItem = cols[2].replace(/^"|"$/g, '');
    const quality = cols[3].replace(/^"|"$/g, '') || 'standard';
    const priceStr = cols[4].replace(/^"|"$/g, '').replace('€', '').trim();
    const warranty = '6 MESI'; // Force 6 MESI

    const price = parseFloat(priceStr);
    if (isNaN(price)) continue; // Skip invalid price rows

    // Determine Category
    const category = inferCategory(brand, model);
    
    // Determine Priority (Advanced)
    const priority = calculatePriority(brand, model, category);

    records.push({
      brand,
      model,
      repair_item: repairItem,
      repair_type: inferRepairType(repairItem),
      category,
      quality,
      price,
      warranty,
      priority,
      is_unstable: false
    });
  }

  console.log(`Parsed ${records.length} records.`);

  // 3. Clear and Insert Data
  console.log('Clearing existing data...');
  const { error: deleteError } = await supabase.from('repair_quotes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteError) {
    console.error('Error clearing table:', deleteError);
    return;
  }

  console.log('Inserting new data...');
  const BATCH_SIZE = 500;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from('repair_quotes').insert(batch);
    if (error) {
      console.error(`Error inserting batch ${i}:`, error);
    } else {
      console.log(`Inserted batch ${i} to ${Math.min(i + BATCH_SIZE, records.length)}`);
    }
  }

  console.log('Import completed successfully!');
}

main().catch(console.error);
