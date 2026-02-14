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

async function checkDB() {
  // 1. Get Total Count
  const { count, error: countError } = await supabase
    .from('repair_quotes')
    .select('*', { count: 'exact', head: true });
    
  if (countError) {
      console.error('Error counting:', countError);
      return;
  }
  console.log(`Total records in DB: ${count}`);

  // 2. Get Brand Counts (with pagination to get ALL rows)
  let allData = [];
  let from = 0;
  const step = 1000;
  
  while (true) {
      const { data, error } = await supabase
        .from('repair_quotes')
        .select('brand, model')
        .range(from, from + step - 1);
        
      if (error) {
          console.error('Error fetching data:', error);
          break;
      }
      
      if (!data || data.length === 0) break;
      
      allData.push(...data);
      if (data.length < step) break;
      from += step;
  }

  const brandCounts: Record<string, Set<string>> = {};
  allData.forEach(r => {
      if (!brandCounts[r.brand]) brandCounts[r.brand] = new Set();
      brandCounts[r.brand].add(r.model);
  });

  console.log('\nModel counts per brand:');
  for (const [brand, models] of Object.entries(brandCounts)) {
      console.log(`${brand}: ${models.size} models`);
      if (brand === 'OPPO') {
          console.log('OPPO Models:', Array.from(models).sort());
      }
      if (brand === 'VIVO') {
          console.log('VIVO Models:', Array.from(models).sort());
      }
  }
}

checkDB();