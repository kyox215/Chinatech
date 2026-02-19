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

const targets = [
  { brand: 'ONEPLUS', model: 'OnePlus 12R' },
  { brand: 'OPPO', model: 'Reno 12' },
  { brand: 'XIAOMI', model: 'Xiaomi 14T Pro' },
  { brand: 'REDMI', model: 'Redmi 13' },
  { brand: 'REDMI', model: 'Redmi Note 10 Pro' },
  { brand: 'HONOR', model: 'Honor 10 Lite' },
  { brand: 'HONOR', model: 'Honor Magic 6 Pro' },
  { brand: 'REALME', model: 'realme GT 2 Pro 5G' },
  { brand: 'REALME', model: 'realme 6 Pro' },
  { brand: 'VIVO', model: 'X100 Pro' },
  { brand: 'VIVO', model: 'V30' },
  { brand: 'MOTOROLA', model: 'Edge 30 Pro' },
  { brand: 'MOTOROLA', model: 'Moto G6' },
  { brand: 'REDMI', model: 'Redmi 14C' },
  { brand: 'REDMI', model: 'Redmi Note 7' },
  { brand: 'REDMI', model: 'Redmi Note 8 Pro' },
  { brand: 'XIAOMI', model: 'Mi 9T Pro' },
  { brand: 'XIAOMI', model: 'Mi 11 Ultra' },
  { brand: 'REDMI', model: 'Redmi Note 6 Pro' },
  { brand: 'REDMI', model: 'Redmi Note 5' },
  { brand: 'XIAOMI', model: 'Mi 8' },
  { brand: 'XIAOMI', model: 'Mi 8 Pro' },
  { brand: 'OPPO', model: 'Find X2 Pro' },
  { brand: 'OPPO', model: 'Reno 7 Pro' },
  { brand: 'XIAOMI', model: 'Mi A3' },
  { brand: 'XIAOMI', model: 'Mi A2' },
  { brand: 'XIAOMI', model: 'Mi A2 Lite' },
  { brand: 'REDMI', model: 'Redmi 6A' },
  { brand: 'REDMI', model: 'Redmi 6' },
  { brand: 'OPPO', model: 'Find X2 Neo' },
  { brand: 'OPPO', model: 'Find X2 Lite' },
  { brand: 'OPPO', model: 'Reno6 5G' },
];

async function main() {
  for (const t of targets) {
    const { count, error, data } = await supabase
      .from('repair_quotes')
      .select('id,brand,model,repair_item,quality,model_code,category', { count: 'exact' })
      .eq('brand', t.brand)
      .eq('model', t.model)
      .limit(1);

    if (error) {
      console.error(`Error checking ${t.brand} ${t.model}:`, error);
      continue;
    }

    console.log(`${t.brand} ${t.model}: ${count}`);
    if (data && data[0]) console.log(JSON.stringify(data[0], null, 2));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
