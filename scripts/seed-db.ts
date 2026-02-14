
import { createClient } from '@supabase/supabase-js';
import { REPAIR_PRICES } from '../lib/data/repair-prices';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const POPULAR_BRANDS = ['APPLE', 'SAMSUNG', 'HUAWEI', 'XIAOMI'];
const POPULAR_MODELS = [
  'IPHONE 15', 'IPHONE 14', 'IPHONE 13', 'IPHONE 12', 'IPHONE 11',
  'S23', 'S22', 'S21', 'P60', 'MATE 60'
];

async function seed() {
  console.log('Starting seed process...');
  
  // Calculate priority
  const dataToInsert = REPAIR_PRICES.map(item => {
    let priority = 0;
    
    // Brand priority
    if (POPULAR_BRANDS.includes(item.brand.toUpperCase())) {
      priority += 10;
    }
    
    // Model priority (fuzzy match)
    const upperModel = item.model.toUpperCase();
    if (POPULAR_MODELS.some(m => upperModel.includes(m))) {
      priority += 20;
    }
    
    // Latest models get even higher
    if (upperModel.includes('15') || upperModel.includes('S24')) {
        priority += 5;
    }

    return {
      brand: item.brand,
      model: item.model,
      repair_item: item.repair_item,
      quality: item.quality,
      price: item.price,
      warranty: item.warranty,
      priority: priority
    };
  });

  // Batch insert (Supabase has a limit, usually safely 1000 rows)
  const BATCH_SIZE = 500;
  for (let i = 0; i < dataToInsert.length; i += BATCH_SIZE) {
    const batch = dataToInsert.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from('repair_prices').insert(batch);
    
    if (error) {
      console.error(`Error inserting batch ${i}:`, error);
    } else {
      console.log(`Inserted batch ${i} to ${i + batch.length}`);
    }
  }

  console.log('Seed completed!');
}

seed().catch(console.error);
