
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { SMARTPHONE_DB } from './data/model-db';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

type RepairQuoteRow = {
  id: string;
  brand: string;
  model: string;
  repair_item: string;
  quality: string;
  price: number | null;
  warranty: string | null;
  repair_type: string | null;
  category: string | null;
  model_code: string | null;
};

type DesiredRow = {
  brand: string;
  model: string;
  repair_item: string;
  quality: string;
  price: number;
  warranty: string;
  repair_type: string;
  category?: string;
  model_code?: string;
};

const PAGE_SIZE = 1000;

function normalizeBrand(value: string) {
  return (value || '').trim().toUpperCase();
}

function normalizeModel(value: string) {
  return (value || '').trim();
}

function normalizeRepairItem(value: string) {
  return (value || '').trim();
}

function normalizeQuality(value: string) {
  const q = (value || '').trim().toLowerCase();
  if (q === 'high_cap') return 'altcap';
  return q;
}

function makeKey(brand: string, model: string, repairItem: string, quality: string) {
  return `${normalizeBrand(brand)}|${normalizeModel(model)}|${normalizeRepairItem(repairItem)}|${normalizeQuality(quality)}`;
}

function parseArgs() {
  const rawArgs = process.argv.slice(2);
  const args = new Set(rawArgs);
  const brandsArg = rawArgs.find((a) => a.startsWith('--brands='));

  const brands = brandsArg
    ? brandsArg
        .slice('--brands='.length)
        .split(',')
        .map((b) => normalizeBrand(b))
        .filter((b) => b.length > 0)
    : undefined;

  return {
    fullReset: args.has('--full-reset'),
    brands,
  };
}

async function fetchAllQuotes(brands?: string[]): Promise<RepairQuoteRow[]> {
  const all: RepairQuoteRow[] = [];
  let from = 0;
  let hasMore = true;

  while (hasMore) {
    let query = supabase
      .from('repair_quotes')
      .select('id,brand,model,repair_item,quality,price,warranty,repair_type,category,model_code')
      .order('created_at', { ascending: true });

    if (brands && brands.length > 0) query = query.in('brand', brands);

    const { data, error } = await query.range(from, from + PAGE_SIZE - 1);

    if (error) throw error;
    const rows = (data || []) as RepairQuoteRow[];
    all.push(...rows);

    if (rows.length < PAGE_SIZE) {
      hasMore = false;
    } else {
      from += PAGE_SIZE;
    }
  }

  return all;
}

async function main() {
  const { fullReset, brands } = parseArgs();
  console.log(`Sync mode: ${fullReset ? 'FULL RESET' : 'INCREMENTAL'}`);
  if (brands && brands.length > 0) console.log(`Brands filter: ${brands.join(', ')}`);

  console.log('Fetching existing data from Supabase (paginated)...');
  let oldData: RepairQuoteRow[] = [];
  try {
    oldData = await fetchAllQuotes(brands);
  } catch (err) {
    console.error('Error fetching data:', err);
    return;
  }
  console.log(`Fetched ${oldData.length} existing records.`);

    // 2. Define Templates
const IPHONE_ITEMS = [
    { name: '屏幕 (原装)', quality: 'orig', type: 'screen', warranty: '6 MESI' },
    { name: '屏幕 (组装)', quality: 'comp', type: 'screen', warranty: '6 MESI' },
    { name: '电池 (原装)', quality: 'orig', type: 'battery', warranty: '6 MESI' },
    { name: '电池 (组装)', quality: 'comp', type: 'battery', warranty: '6 MESI' },
    { name: '电池 (扩容)', quality: 'altcap', type: 'battery', warranty: '6 MESI' },
    { name: '尾插充电口', quality: 'standard', type: 'charging', warranty: '6 MESI' },
    { name: '后盖', quality: 'standard', type: 'back_glass', warranty: '6 MESI' }
];

const OTHER_ITEMS = [
    { name: '屏幕 (原装)', quality: 'orig', type: 'screen', warranty: '6 MESI' },
    { name: '屏幕 (组装)', quality: 'comp', type: 'screen', warranty: '6 MESI' },
    { name: '电池 (原装)', quality: 'orig', type: 'battery', warranty: '6 MESI' },
    { name: '电池 (组装)', quality: 'comp', type: 'battery', warranty: '6 MESI' },
    { name: '尾插充电口', quality: 'standard', type: 'charging', warranty: '6 MESI' }
];

// 3. Generate New Data
  const existingByKey = new Map<string, RepairQuoteRow>();
  for (const row of oldData) {
    const key = makeKey(row.brand, row.model, row.repair_item, row.quality);
    if (!existingByKey.has(key)) existingByKey.set(key, row);
  }

  const desiredRows: DesiredRow[] = [];

SMARTPHONE_DB.forEach(phone => {
    if (brands && brands.length > 0 && !brands.includes(normalizeBrand(phone.brand))) return;
    let templates = OTHER_ITEMS;
    
    if (phone.brand === 'APPLE' && phone.series === 'iPhone 系列') {
        templates = IPHONE_ITEMS;
    } else if (phone.brand === 'APPLE') {
        // iPad / Watch - Use OTHER items for now but maybe just preserve old logic?
        // Let's use OTHER_ITEMS as base for simplicity, ensuring they have basic repairs
        templates = OTHER_ITEMS; 
    }

    templates.forEach(template => {
      const modelCode = phone.codes && phone.codes.length > 0 ? phone.codes.join(', ') : undefined;
      const key = makeKey(phone.brand, phone.model, template.name, template.quality);
      const existing = existingByKey.get(key);
      const existingPrice = typeof existing?.price === 'number' && !Number.isNaN(existing.price) ? existing.price : 0;

      desiredRows.push({
        brand: normalizeBrand(phone.brand),
        model: normalizeModel(phone.model),
        repair_item: template.name,
        quality: template.quality,
        price: existingPrice,
        warranty: template.warranty,
        repair_type: template.type,
        category: phone.series,
        model_code: modelCode,
      });
    });
});

  const finalRowsForFile: Array<{
    id: string;
    brand: string;
    model: string;
    repair_item: string;
    quality: string;
    price: number;
    warranty: string;
    repair_type?: string;
    priority?: number;
    category?: string;
    model_code?: string;
  }> = [];

  if (fullReset) {
    console.log('Syncing to Supabase (FULL RESET)...');
    const deleteQuery = supabase.from('repair_quotes').delete();
    const { error: deleteError } =
      brands && brands.length > 0
        ? await deleteQuery.in('brand', brands)
        : await deleteQuery.neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteError) {
      console.error('Error clearing table:', deleteError);
      return;
    }

    const BATCH_SIZE = 500;
    for (let i = 0; i < desiredRows.length; i += BATCH_SIZE) {
      const batch = desiredRows.slice(i, i + BATCH_SIZE).map((item) => ({
        brand: item.brand,
        model: item.model,
        repair_item: item.repair_item,
        quality: item.quality,
        price: item.price,
        warranty: item.warranty,
        repair_type: item.repair_type || 'other',
        category: item.category,
        model_code: item.model_code,
        priority: 0,
      }));

      const { error } = await supabase.from('repair_quotes').insert(batch);
      if (error) {
        console.error(`Error inserting batch ${i}:`, error);
        return;
      }
      console.log(`Inserted batch ${i} to ${i + batch.length}`);
    }

    let counter = 1;
    for (const item of desiredRows) {
      finalRowsForFile.push({
        id: `repair-${item.brand.toLowerCase()}-${Date.now()}-${counter++}`,
        brand: item.brand,
        model: item.model,
        repair_item: item.repair_item,
        quality: item.quality,
        price: item.price,
        warranty: item.warranty,
        repair_type: item.repair_type,
        category: item.category,
        model_code: item.model_code,
        priority: 0,
      });
    }

    const pricesPath = path.join(process.cwd(), 'lib/data/repair-prices.ts');
    const output = `export interface RepairItem {
      id: string;
      brand: string;
      model: string;
      repair_item: string;
      quality: string;
      price: number;
      warranty: string;
      repair_type?: string;
      priority?: number;
      category?: string;
      model_code?: string;
    }

    export const REPAIR_PRICES: RepairItem[] = ${JSON.stringify(finalRowsForFile, null, 2)};
    `;
    fs.writeFileSync(pricesPath, output);
    console.log(`Updated local file with ${finalRowsForFile.length} items.`);
    console.log('Supabase sync complete!');
    return;
  }

  console.log('Syncing to Supabase (INCREMENTAL)...');

  const inserts: DesiredRow[] = [];
  const updates: Array<{ id: string; patch: Partial<RepairQuoteRow> }> = [];

  for (const desired of desiredRows) {
    const key = makeKey(desired.brand, desired.model, desired.repair_item, desired.quality);
    const existing = existingByKey.get(key);
    if (!existing) {
      inserts.push(desired);
      continue;
    }

    const patch: Partial<RepairQuoteRow> = {};
    const desiredModelCode = (desired.model_code || '').trim();
    const desiredCategory = (desired.category || '').trim();
    const desiredRepairType = (desired.repair_type || '').trim();
    const desiredWarranty = (desired.warranty || '').trim();

    if ((existing.model_code || '').trim() !== desiredModelCode) patch.model_code = desiredModelCode;
    if ((existing.category || '').trim() !== desiredCategory) patch.category = desiredCategory;
    if ((existing.repair_type || '').trim() !== desiredRepairType) patch.repair_type = desiredRepairType;
    if ((existing.warranty || '').trim() !== desiredWarranty) patch.warranty = desiredWarranty;

    if (Object.keys(patch).length > 0) {
      updates.push({ id: existing.id, patch });
    }
  }

  const INSERT_BATCH_SIZE = 500;
  for (let i = 0; i < inserts.length; i += INSERT_BATCH_SIZE) {
    const batch = inserts.slice(i, i + INSERT_BATCH_SIZE).map((item) => ({
      brand: item.brand,
      model: item.model,
      repair_item: item.repair_item,
      quality: item.quality,
      price: item.price,
      warranty: item.warranty,
      repair_type: item.repair_type || 'other',
      category: item.category,
      model_code: item.model_code,
      priority: 0,
    }));
    const { error } = await supabase.from('repair_quotes').insert(batch);
    if (error) {
      console.error(`Error inserting batch ${i}:`, error);
      return;
    }
    console.log(`Inserted batch ${i} to ${i + batch.length}`);
  }

  let updatedCount = 0;
  for (const u of updates) {
    const { error } = await supabase.from('repair_quotes').update(u.patch).eq('id', u.id);
    if (error) {
      console.error('Error updating row:', error);
      return;
    }
    updatedCount += 1;
  }

  console.log(`Incremental sync done. inserts=${inserts.length}, updates=${updatedCount}`);

  const refreshed = await fetchAllQuotes();
  let counter = 1;
  for (const row of refreshed) {
    finalRowsForFile.push({
      id: row.id || `repair-${normalizeBrand(row.brand).toLowerCase()}-${Date.now()}-${counter++}`,
      brand: row.brand,
      model: row.model,
      repair_item: row.repair_item,
      quality: row.quality,
      price: typeof row.price === 'number' ? row.price : 0,
      warranty: row.warranty || '6 MESI',
      repair_type: row.repair_type || undefined,
      category: row.category || undefined,
      model_code: row.model_code || undefined,
      priority: 0,
    });
  }

  const pricesPath = path.join(process.cwd(), 'lib/data/repair-prices.ts');
  const output = `export interface RepairItem {
      id: string;
      brand: string;
      model: string;
      repair_item: string;
      quality: string;
      price: number;
      warranty: string;
      repair_type?: string;
      priority?: number;
      category?: string;
      model_code?: string;
    }

    export const REPAIR_PRICES: RepairItem[] = ${JSON.stringify(finalRowsForFile, null, 2)};
    `;
  fs.writeFileSync(pricesPath, output);
  console.log(`Updated local file with ${finalRowsForFile.length} items.`);
  console.log('Supabase sync complete!');
}

main().catch(console.error);
