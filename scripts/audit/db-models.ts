import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const PAGE_SIZE = 1000;

type Row = {
  brand: string;
  model: string;
  model_code: string | null;
  category: string | null;
};

function keyOf(brand: string, model: string) {
  return `${(brand || '').trim().toUpperCase()}|${(model || '').trim()}`;
}

async function fetchAll(): Promise<Row[]> {
  const all: Row[] = [];
  let from = 0;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('repair_quotes')
      .select('brand,model,model_code,category')
      .order('created_at', { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) throw error;
    const rows = (data || []) as Row[];
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
  const rows = await fetchAll();

  const byModel = new Map<
    string,
    {
      brand: string;
      model: string;
      model_code?: string;
      category?: string;
      rows: number;
      missingModelCodeRows: number;
    }
  >();

  for (const r of rows) {
    const k = keyOf(r.brand, r.model);
    const existing = byModel.get(k);
    const code = (r.model_code || '').trim();
    const cat = (r.category || '').trim();
    if (!existing) {
      byModel.set(k, {
        brand: (r.brand || '').trim().toUpperCase(),
        model: (r.model || '').trim(),
        model_code: code || undefined,
        category: cat || undefined,
        rows: 1,
        missingModelCodeRows: code ? 0 : 1,
      });
      continue;
    }

    existing.rows += 1;
    if (!code) existing.missingModelCodeRows += 1;
    if (!existing.model_code && code) existing.model_code = code;
    if (!existing.category && cat) existing.category = cat;
  }

  const models = Array.from(byModel.values()).sort((a, b) => {
    const bc = a.brand.localeCompare(b.brand);
    if (bc !== 0) return bc;
    return a.model.localeCompare(b.model);
  });

  const reportsDir = path.join(process.cwd(), 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const outPath = path.join(reportsDir, 'db-models.json');
  fs.writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), models }, null, 2));

  const totalModels = models.length;
  const missingCodeModels = models.filter((m) => !m.model_code).length;
  const summary = {
    totalRows: rows.length,
    totalModels,
    missingCodeModels,
  };
  fs.writeFileSync(path.join(reportsDir, 'db-models-summary.json'), JSON.stringify(summary, null, 2));

  console.log(`Wrote ${outPath}`);
  console.log(`totalRows=${summary.totalRows}, totalModels=${summary.totalModels}, missingCodeModels=${summary.missingCodeModels}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

