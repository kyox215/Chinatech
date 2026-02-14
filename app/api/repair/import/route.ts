import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper functions (copied from script for consistency)
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

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    
    // Skip header if present
    const startIndex = lines[0].toLowerCase().includes('brand') ? 1 : 0;
    
    const records = [];
    
    for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i];
        // Simple CSV parser handling quotes
        const cols = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
            inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
            cols.push(current.trim());
            current = '';
            } else {
            current += char;
            }
        }
        cols.push(current.trim());

        if (cols.length < 5) continue;

        const brand = cols[0].replace(/^"|"$/g, '');
        const model = cols[1].replace(/^"|"$/g, '');
        const repairItem = cols[2].replace(/^"|"$/g, '');
        const quality = cols[3].replace(/^"|"$/g, '') || 'standard';
        const priceStr = cols[4].replace(/^"|"$/g, '').replace('€', '').trim();
        const warranty = '6 MESI'; // Force 6 MESI

        const price = parseFloat(priceStr);
        if (isNaN(price)) continue;

        const category = inferCategory(brand, model);
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

    // Insert data
    const BATCH_SIZE = 500;
    let insertedCount = 0;
    
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const batch = records.slice(i, i + BATCH_SIZE);
        const { error } = await supabase.from('repair_quotes').insert(batch);
        if (error) {
            console.error('Insert error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        insertedCount += batch.length;
    }

    return NextResponse.json({ message: 'Success', count: insertedCount });
  } catch (err) {
    console.error('Import error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}