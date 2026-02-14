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

async function verify() {
  const { data, error } = await supabase
    .from('repair_quotes')
    .select('brand, model, model_code')
    .eq('brand', 'SAMSUNG')
    .limit(20);

  if (error) {
    console.error(error);
    return;
  }

  console.log('Sample Samsung Records:');
  console.table(data);
  
  // Check specifically for "A02s" and "A7 (2018)" related records
  const { data: a02sData } = await supabase
    .from('repair_quotes')
    .select('brand, model, model_code')
    .ilike('model', '%A02s%')
    .limit(5);
    
    console.log('Sample A02s Records:');
    console.table(a02sData);

  const { data: a7Data } = await supabase
    .from('repair_quotes')
    .select('brand, model, model_code')
    .ilike('model', '%A7 (2018)%')
    .limit(5);
    
    console.log('Sample A7 (2018) Records:');
    console.table(a7Data);
}

verify();