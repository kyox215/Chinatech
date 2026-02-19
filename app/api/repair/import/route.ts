import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization to avoid build errors if env vars are missing
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase credentials');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseServiceKey);
  return supabaseInstance;
}

// Helper functions (copied from script for consistency)
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
  if (!q) return 'standard';
  if (q === 'high_cap') return 'altcap';
  return q;
}

function parsePrice(raw: string) {
  const cleaned = (raw || '')
    .replace(/€/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(',', '.');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
}

function makeKey(brand: string, model: string, repairItem: string, quality: string) {
  return `${normalizeBrand(brand)}|${normalizeModel(model)}|${normalizeRepairItem(repairItem)}|${normalizeQuality(quality)}`;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = '';
  };
  const pushRow = () => {
    if (row.length === 1 && row[0].trim() === '') {
      row = [];
      return;
    }
    rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (ch === '"') {
      const next = text[i + 1];
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }

    if (!inQuotes && (ch === ',' || ch === '\t')) {
      pushField();
      continue;
    }

    if (!inQuotes && (ch === '\n' || ch === '\r')) {
      if (ch === '\r' && text[i + 1] === '\n') i += 1;
      pushField();
      pushRow();
      continue;
    }

    field += ch;
  }

  pushField();
  pushRow();

  return rows
    .map((r) => r.map((c) => (c || '').trim()))
    .filter((r) => r.some((c) => c.trim().length > 0));
}

type CsvHeaderKey =
  | 'brand'
  | 'model'
  | 'repair_item'
  | 'quality'
  | 'price'
  | 'warranty'
  | 'repair_type'
  | 'category'
  | 'model_code';

function normalizeHeaderName(value: string) {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[_-]/g, ' ');
}

function mapHeaderKey(header: string): CsvHeaderKey | null {
  const h = normalizeHeaderName(header);

  if (h === 'brand' || h === 'marca' || h === '品牌') return 'brand';
  if (h === 'model' || h === 'modello' || h === '型号') return 'model';

  if (
    h === 'repair item' ||
    h === 'repair' ||
    h === 'item' ||
    h === 'problema' ||
    h === 'problem' ||
    h === '故障' ||
    h === '维修项' ||
    h === 'repair item name'
  )
    return 'repair_item';

  if (h === 'quality' || h === '品质' || h === 'quality type') return 'quality';
  if (h === 'price' || h === 'prezzo totale' || h === 'total price' || h === '价格') return 'price';

  if (h === 'warranty' || h === 'garanzia' || h === '保修') return 'warranty';
  if (h === 'repair type' || h === 'repair_type' || h === 'type' || h === '类型') return 'repair_type';
  if (h === 'category' || h === '分类' || h === 'series') return 'category';
  if (h === 'model code' || h === 'model_code' || h === 'code' || h === '代号') return 'model_code';

  return null;
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
        p += parseInt(numMatch[0]);
    }
    
    return p;
}

async function fetchExistingForImport(brands: string[], models: string[]) {
  const supabase = getSupabase();
  const existing: Array<{
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
    priority: number | null;
  }> = [];

  let query = supabase
    .from('repair_quotes')
    .select('id,brand,model,repair_item,quality,price,warranty,repair_type,category,model_code,priority')
    .in('brand', brands);

  if (models.length > 0 && models.length <= 500) {
    query = query.in('model', models);
  }

  let from = 0;
  const PAGE_SIZE = 1000;
  while (true) {
    const { data, error } = await query.range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    const rows = (data || []) as typeof existing;
    existing.push(...rows);
    if (rows.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  const byKey = new Map<string, (typeof existing)[number]>();
  for (const row of existing) {
    const key = makeKey(row.brand, row.model, row.repair_item, row.quality);
    if (!byKey.has(key)) byKey.set(key, row);
  }

  return byKey;
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const dryRun = url.searchParams.get('dryRun') === '1' || url.searchParams.get('dryRun') === 'true';

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const text = await file.text();
    const rows = parseCsv(text);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Empty CSV' }, { status: 400 });
    }

    const headerRow = rows[0];
    const headerMap = new Map<number, CsvHeaderKey>();
    for (let i = 0; i < headerRow.length; i++) {
      const key = mapHeaderKey(headerRow[i]);
      if (key) headerMap.set(i, key);
    }
    const hasHeader = headerMap.size >= 3 && (Array.from(headerMap.values()).includes('brand') || Array.from(headerMap.values()).includes('model'));

    const dataRows = hasHeader ? rows.slice(1) : rows;

    const errors: Array<{ row: number; message: string }> = [];
    const fileDedupe = new Map<string, Record<string, unknown>>();
    let skippedEmpty = 0;

    for (let idx = 0; idx < dataRows.length; idx++) {
      const row = dataRows[idx];
      const rowNo = hasHeader ? idx + 2 : idx + 1;

      const getCellByKey = (k: CsvHeaderKey): string | undefined => {
        for (const [i, mapped] of headerMap.entries()) {
          if (mapped === k) return row[i];
        }
        return undefined;
      };

      const rawBrand = hasHeader ? getCellByKey('brand') : row[0];
      const rawModel = hasHeader ? getCellByKey('model') : row[1];
      const rawRepairItem = hasHeader ? getCellByKey('repair_item') : row[2];
      const rawQuality = hasHeader ? getCellByKey('quality') : row[3];
      const rawPrice = hasHeader ? getCellByKey('price') : row[4];
      const rawWarranty = hasHeader ? getCellByKey('warranty') : row[5];
      const rawRepairType = hasHeader ? getCellByKey('repair_type') : row[6];
      const rawCategory = hasHeader ? getCellByKey('category') : row[7];
      const rawModelCode = hasHeader ? getCellByKey('model_code') : row[8];

      const brand = normalizeBrand(rawBrand || '');
      const model = normalizeModel(rawModel || '');
      const repairItem = normalizeRepairItem(rawRepairItem || '');
      const quality = normalizeQuality(rawQuality || '');

      if (!brand && !model && !repairItem) {
        skippedEmpty += 1;
        continue;
      }

      if (!brand || !model || !repairItem) {
        errors.push({ row: rowNo, message: 'Missing required fields (brand/model/repair_item).' });
        continue;
      }

      const price = parsePrice(rawPrice || '');
      if (price === null) {
        errors.push({ row: rowNo, message: `Invalid price: ${rawPrice || ''}` });
        continue;
      }

      const category = (rawCategory || '').trim();
      const warranty = (rawWarranty || '').trim();
      const repairType = (rawRepairType || '').trim();
      const modelCode = (rawModelCode || '').trim();

      const finalCategory = category || inferCategory(brand, model);
      const finalWarranty = warranty || '6 MESI';
      const finalRepairType = repairType || inferRepairType(repairItem);
      const priority = calculatePriority(brand, model, finalCategory);

      const key = makeKey(brand, model, repairItem, quality);
      fileDedupe.set(key, {
        brand,
        model,
        repair_item: repairItem,
        repair_type: finalRepairType,
        category: finalCategory,
        quality,
        price,
        warranty: finalWarranty,
        priority,
        is_unstable: false,
        model_code: modelCode || undefined,
      });
    }

    const records = Array.from(fileDedupe.values()) as Array<{
      brand: string;
      model: string;
      repair_item: string;
      repair_type: string;
      category: string;
      quality: string;
      price: number;
      warranty: string;
      priority: number;
      is_unstable: boolean;
      model_code?: string;
    }>;

    const brands = Array.from(new Set(records.map((r) => r.brand)));
    const models = Array.from(new Set(records.map((r) => r.model)));
    const existingByKey = brands.length > 0 ? await fetchExistingForImport(brands, models) : new Map();

    let willInsert = 0;
    let willUpdate = 0;
    for (const r of records) {
      const key = makeKey(r.brand, r.model, r.repair_item, r.quality);
      const existing = existingByKey.get(key);
      if (!existing) {
        willInsert += 1;
        continue;
      }

      const incomingModelCode = (r.model_code || '').trim();
      const hasIncomingModelCode = incomingModelCode.length > 0;

      if (!hasIncomingModelCode && (existing.model_code || '').trim()) {
        r.model_code = existing.model_code || undefined;
      }
      if (!r.category && existing.category) r.category = existing.category;
      if (!r.warranty && existing.warranty) r.warranty = existing.warranty;
      if (!r.repair_type && existing.repair_type) r.repair_type = existing.repair_type || 'other';
      if (!r.priority && typeof existing.priority === 'number') r.priority = existing.priority;

      const changed =
        (existing.price ?? 0) !== r.price ||
        (existing.warranty || '') !== r.warranty ||
        (existing.repair_type || '') !== r.repair_type ||
        (existing.category || '') !== r.category ||
        (existing.model_code || '') !== (r.model_code || '');

      if (changed) willUpdate += 1;
    }

    if (dryRun) {
      return NextResponse.json({
        message: 'Dry run',
        totalRows: dataRows.length,
        parsed: records.length,
        skippedEmpty,
        deduped: dataRows.length - skippedEmpty - records.length,
        willInsert,
        willUpdate,
        errors: errors.slice(0, 50),
      });
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: 'CSV contains invalid rows. Fix errors or use dryRun to inspect.',
          errors: errors.slice(0, 50),
        },
        { status: 400 }
      );
    }

    const BATCH_SIZE = 500;
    let affected = 0;
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);
      const { error } = await getSupabase()
        .from('repair_quotes')
        .upsert(batch, { onConflict: 'brand,model,repair_item,quality' });
      if (error) {
        console.error('Upsert error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      affected += batch.length;
    }

    return NextResponse.json({ message: 'Success', count: affected, willInsert, willUpdate });
  } catch (err) {
    console.error('Import error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
