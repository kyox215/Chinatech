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

async function main() {
  const { count, error, data } = await supabase
    .from('repair_quotes')
    .select('id,brand,model,repair_item,quality,model_code,category', { count: 'exact' })
    .eq('brand', 'REDMI')
    .eq('model', 'Redmi 14C')
    .order('repair_item', { ascending: true })
    .limit(10);

  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`REDMI Redmi 14C records: ${count}`);
  if (data && data.length > 0) {
    console.log(JSON.stringify(data[0], null, 2));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

