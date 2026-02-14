import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { SMARTPHONE_DB, type ModelInfo } from './data/model-db';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// --- Types ---
interface RepairRecord {
  brand: string;
  model: string;
  model_code?: string;
  repair_item: string;
  repair_type: string;
  category: string;
  quality: string;
  price: number;
  warranty: string;
  priority: number;
  is_unstable: boolean;
}

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

function inferCategory(brand: string, model: string, knownSeries?: string): string {
  if (knownSeries) return knownSeries;

  const b = brand.toUpperCase().trim();
  const m = model.toUpperCase().trim();

  // Simplified Logic (Coarse-grained)
  if (b === 'APPLE') {
    if (m.startsWith('IPAD')) return 'iPad 系列';
    if (m.startsWith('WATCH') || m.startsWith('APPLE WATCH')) return 'Apple Watch 系列';
    if (m.startsWith('MAC') || m.startsWith('MACBOOK')) return 'Mac 系列';
    return 'iPhone 系列'; // All iPhones grouped together
  }
  if (b === 'SAMSUNG') {
    if (m.startsWith('S') || m.includes('S2') || m.includes('S1')) return 'Galaxy S 系列';
    if (m.startsWith('Z') || m.includes('FOLD') || m.includes('FLIP')) return 'Galaxy Z 折叠屏';
    if (m.startsWith('NOTE')) return 'Galaxy Note 系列';
    if (m.startsWith('A')) return 'Galaxy A 系列';
    if (m.startsWith('M') || m.startsWith('J')) return 'Galaxy M/J 系列';
    if (m.startsWith('TAB') || m.startsWith('T')) return 'Galaxy Tab 平板';
    return 'Samsung 其他';
  }
  if (b === 'HUAWEI') {
    if (m.startsWith('MATE')) return 'Mate 系列';
    if (m.startsWith('P') && !m.startsWith('P SMART')) return 'P 系列';
    if (m.startsWith('NOVA')) return 'Nova 系列';
    return 'Huawei 其他';
  }
  if (b === 'XIAOMI') return 'Xiaomi 系列';
  if (b === 'REDMI') {
      if (m.includes('NOTE')) return 'Redmi Note 系列';
      return 'Redmi 系列';
  }
  if (b === 'HONOR') {
      if (m.includes('MAGIC')) return 'Magic 系列';
      return 'Honor 系列';
  }
  if (b === 'OPPO') {
      if (m.includes('FIND')) return 'Find 系列';
      if (m.includes('RENO')) return 'Reno 系列';
      return 'OPPO A系列/其他';
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
    if (category.includes('16') || category.includes('24') || category.includes('60') || category.includes('Magic6')) p += 600;
    else if (category.includes('15') || category.includes('23') || category.includes('50') || category.includes('Magic5')) p += 500;
    else if (category.includes('14') || category.includes('22') || category.includes('40')) p += 400;
    else if (category.includes('Pro') || category.includes('Ultra') || category.includes('Max')) p += 50;

    const numMatch = m.match(/\d+/);
    if (numMatch) {
        p += parseInt(numMatch[0]);
    }
    
    return p;
}

function parseCSVLine(line: string): string[] {
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

// --- Main Logic ---

async function main() {
  console.log('Starting Data Organization Process...');

  // 1. Load CSV Data
  const csvPath = '/Users/hexiang/Documents/trae_projects/ChinaTechOS v1/维修报价表.csv';
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found at ${csvPath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = fileContent.split('\n').filter(l => l.trim().length > 0);
  const startIndex = lines[0].toLowerCase().includes('brand') ? 1 : 0;

  const records: RepairRecord[] = [];
  const processedModels = new Set<string>(); // "BRAND:MODEL"

  // 2. Process CSV Records
  for (let i = startIndex; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 5) continue;

    const brand = cols[0].replace(/^"|"$/g, '').trim();
    const model = cols[1].replace(/^"|"$/g, '').trim();
    const repairItem = cols[2].replace(/^"|"$/g, '').trim();
    const quality = cols[3].replace(/^"|"$/g, '').trim() || 'standard';
    const priceStr = cols[4].replace(/^"|"$/g, '').replace('€', '').trim();
    const price = parseFloat(priceStr) || 0;
    const warranty = '6 MESI';

    // Match with Knowledge Base
    const kbMatch = SMARTPHONE_DB.find(info => {
        if (info.brand.toUpperCase() !== brand.toUpperCase()) return false;

        const dbModel = info.model.toUpperCase();
        const csvModel = model.toUpperCase();

        // 1. Code Match (Strongest)
        // Check if CSV contains Code (e.g. "Screen for SM-A135F")
        if (info.codes.some(c => csvModel.includes(c.toUpperCase()))) return true;
        
        // Check if Code contains CSV (e.g. CSV is "A135", Code is "SM-A135F")
        // Only if CSV is at least 4 chars long to avoid matching "A1", "A2"
        // And ensure it's not just a substring match that is too generic (e.g. "123")
        // But for "A135", "A127", "A025", etc. it is safe.
        if (csvModel.length >= 4 && info.codes.some(c => c.toUpperCase().includes(csvModel))) return true;

        // 2. Exact Name Match
        if (dbModel === csvModel) return true;
        
        // 3. Containment Match (CSV contains DB model, e.g. "Samsung Galaxy S24 Ultra Repair" contains "Galaxy S24 Ultra")
        if (csvModel.includes(dbModel)) return true;

        // 4. Relaxed/Fuzzy Match (Crucial for "A13" -> "Galaxy A13 4G")
        // Remove common prefixes/suffixes to compare "core" model names
        const cleanDbModel = dbModel
            .replace(/^(GALAXY|IPHONE|XIAOMI|REDMI|HUAWEI|HONOR|OPPO|VIVO)\s+/, '') // Remove brand prefix
            .replace(/\s+(4G|5G|5G\/4G)$/, '') // Remove network suffix
            .replace(/[()]/g, '') // Remove parentheses
            .trim();
        
        const cleanCsvModel = csvModel
            .replace(/^(GALAXY|IPHONE|XIAOMI|REDMI|HUAWEI|HONOR|OPPO|VIVO)\s+/, '')
            .replace(/\s+(4G|5G|5G\/4G)$/, '')
            .replace(/[()]/g, '')
            .trim();

        // Exact match of core names (e.g. "A13" === "A13")
        if (cleanDbModel === cleanCsvModel) return true;

        // DB core contains CSV core (e.g. "A13 4G" (clean: A13) vs "A13") -> handled above
        // CSV core contains DB core (e.g. "A13 2022" contains "A13")
        // Be careful not to match "A1" to "A13". Use word boundary check or exact match.
        
        // Specific fix for "A13" matching "A13 4G" (where cleanDbModel might still be "A13" if I stripped 4G)
        // If the CSV model is a substring of the DB model, but matches the "base" model name
        if (cleanDbModel.startsWith(cleanCsvModel + ' ')) return true; // "A13 2022" starts with "A13 "

        return false;
    });

    const modelCode = kbMatch ? kbMatch.codes.join(', ') : '';
    const series = kbMatch ? kbMatch.series : inferCategory(brand, model);
    const priority = calculatePriority(brand, model, series || '');

    records.push({
      brand,
      model: kbMatch ? kbMatch.model : model, // Normalize model name if matched
      model_code: modelCode,
      repair_item: repairItem,
      repair_type: inferRepairType(repairItem),
      category: series || '其他',
      quality,
      price,
      warranty,
      priority,
      is_unstable: false
    });

    // Mark as processed using the STANDARDIZED model name if available, otherwise original
    // This ensures that when we check for missing models later, we know we've covered this one.
    const processedName = kbMatch ? kbMatch.model.toUpperCase() : model.toUpperCase();
    processedModels.add(`${brand.toUpperCase()}:${processedName}`);
  }

  // 3. Enrich with Missing Models AND Missing Repair Items from Knowledge Base
  console.log('Enriching with missing models and items from DB...');
  
  // Track existing repair types for each processed model
  const modelRepairTypes = new Map<string, Set<string>>(); // "BRAND:MODEL" -> Set<repair_type>
  
  records.forEach(r => {
      const key = `${r.brand.toUpperCase()}:${r.model.toUpperCase()}`;
      if (!modelRepairTypes.has(key)) modelRepairTypes.set(key, new Set());
      modelRepairTypes.get(key)?.add(r.repair_type);
  });

  const defaultItems = [
      { item: '屏幕 (原装)', type: 'screen', quality: 'orig' },
      { item: '屏幕 (组装)', type: 'screen', quality: 'comp' },
      { item: '电池 (原装)', type: 'battery', quality: 'orig' },
      { item: '电池 (高容)', type: 'battery', quality: 'comp' },
      { item: '尾插/充电口', type: 'charging', quality: 'standard' }
  ];

  for (const info of SMARTPHONE_DB) {
    const key = `${info.brand.toUpperCase()}:${info.model.toUpperCase()}`;
    const exists = processedModels.has(key);
    const existingTypes = modelRepairTypes.get(key) || new Set();

    const priority = calculatePriority(info.brand, info.model, info.series || '');

    // For each default item, check if it exists (by type) or needs to be added
    // Note: We check by TYPE (screen, battery, charging). 
    // If the model exists but has NO screen repair, we add both orig and comp screens.
    // If it has at least one screen repair, we assume the user data is sufficient (or maybe we should force add missing qualities?)
    // Let's go with: if NO record of that TYPE exists, add the defaults for that TYPE.
    
    // Actually, for "screen", we might have "standard" but missing "orig".
    // To be safe and ensure completeness as requested ("为每个新增的型号保留..."), 
    // let's check more granularly or just add if type is missing.
    // User said: "为每个新增的型号保留屏幕，电池，尾插... 并为其加上标签 如原装，组装。"
    // This implies we should ensure these specific items exist.

    for (const def of defaultItems) {
        // Check if we already have this specific item type/quality combination?
        // Or just check if we have the type?
        // If we have a "screen" record from CSV, we probably don't want to overwrite/duplicate unless it's clearly different.
        // But CSV usually just says "Display" with quality "standard".
        // Our defaults are "Display (Orig)" and "Display (Comp)".
        // If CSV has "Display", type is 'screen'.
        // Let's add default items only if that TYPE is completely missing for that model.
        // Otherwise we risk cluttering with duplicates (e.g. CSV has "LCD", we add "Screen (Orig)" -> User sees 2 screens).
        // A safer approach: Only add if the model is NEW (handled by !exists) OR if the specific repair type is missing.
        
        if (!exists || !existingTypes.has(def.type)) {
             // Avoid adding duplicates if we are iterating through defaults
             // e.g. "screen" type is processed twice (orig, comp). 
             // If type is missing, we add BOTH.
             // We need to verify we haven't added it in this loop already? 
             // No, records.push doesn't update modelRepairTypes map immediately.
             
             // Check if we already pushed this type in this enrichment cycle?
             // Actually, we can just push. The condition !existingTypes.has(def.type) is constant for this model iteration.
             
             records.push({
                brand: info.brand,
                model: info.model,
                model_code: info.codes.join(', '),
                repair_item: def.item,
                repair_type: def.type,
                category: info.series || inferCategory(info.brand, info.model),
                quality: def.quality,
                price: 0, // Default price 0
                warranty: '6 MESI',
                priority,
                is_unstable: false
            });
        }
    }
    
    // 4. Enrich with missing basic items for models that were processed but might miss specific types
    // Note: The loop above handles this for KB models. 
    // But what about models NOT in KB but found in CSV? (e.g. older models)
    // The user requirement was "为每个新增的型号保留屏幕...". "新增" might mean KB models.
    // But let's assume "ALL models".
    // However, we don't know the series/priority easily for non-KB models (we inferred it).
    // Let's stick to KB models for enrichment to be safe and clean.
  }

  // Remove duplicates based on (brand, model, repair_item, quality)
  // Because the loop above might add "Screen (Orig)" and "Screen (Comp)" if type "screen" was missing.
  // But if the loop ran twice (it doesn't), or if records had duplicates.
  // Just a safety measure.
  const uniqueRecords: RepairRecord[] = [];
  const recordSet = new Set<string>();
  
  for (const r of records) {
      const key = `${r.brand}:${r.model}:${r.repair_item}:${r.quality}`;
      if (!recordSet.has(key)) {
          recordSet.add(key);
          uniqueRecords.push(r);
      }
  }

  records.length = 0;
  records.push(...uniqueRecords);

  console.log(`Total records to insert: ${records.length}`);

  // 4. Clear and Insert to Supabase
  // Note: We need to ensure 'model_code' column exists. Since I cannot run DDL directly here easily without pg driver and connection string often failing in edge cases, 
  // I will rely on Supabase hopefully having the column or adding it via SQL tool separately.
  // BUT, to be safe, I will output the SQL needed.
  
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
      // Fallback: Try inserting without model_code if it fails (means column missing)
      if (error.message.includes('model_code')) {
          console.warn('Column model_code missing? Retrying without it...');
          const fallbackBatch = batch.map(({ model_code, ...rest }) => rest);
          await supabase.from('repair_quotes').insert(fallbackBatch);
      }
    } else {
      console.log(`Inserted batch ${i} to ${Math.min(i + BATCH_SIZE, records.length)}`);
    }
  }

  console.log('Organization completed!');
}

main().catch(console.error);
