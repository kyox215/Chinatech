
import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Fix import issue by reading file directly or mocking
// In a real env, we would fix tsconfig. For now, let's try to import with extension
// if that fails, we might need another strategy.
// Actually, let's try to use dynamic import() which might handle it better or just use the relative path correctly.
// The error was ERR_MODULE_NOT_FOUND.
import { REPAIR_PRICES } from '../lib/data/repair-prices';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function inferRepairType(label: string): string {
  const l = label.toLowerCase();
  if (l.includes('屏幕') || l.includes('screen') || l.includes('lcd') || l.includes('display') || l.includes('glass')) return 'screen';
  if (l.includes('电池') || l.includes('battery')) return 'battery';
  return 'other';
}

async function migrate() {
  console.log('Starting migration to repair_quotes...');

  // 1. Create Table using pg driver if connection string available
  if (connectionString) {
    console.log('Connecting to database via Postgres URL to apply schema...');
    const pool = new Pool({ connectionString });
    try {
      const sqlPath = path.join(process.cwd(), 'supabase', 'migrations', '20240601_create_repair_quotes.sql');
      const sql = fs.readFileSync(sqlPath, 'utf-8');
      await pool.query(sql);
      console.log('Schema applied successfully. Waiting for schema cache to update...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (err) {
      console.error('Failed to apply schema via pg:', err);
    } finally {
      await pool.end();
    }
  } else {
    console.warn('No DATABASE_URL found. Skipping schema creation. Please ensure "repair_quotes" table exists.');
  }

  // 2. Insert Data
  const POPULAR_BRANDS = ['APPLE', 'SAMSUNG', 'HUAWEI', 'XIAOMI'];
  const POPULAR_MODELS = ['IPHONE 15', 'IPHONE 14', 'IPHONE 13', 'IPHONE 12', 'S23', 'S22', 'P60', 'MATE 60'];

  const dataToInsert = REPAIR_PRICES.map(item => {
    let priority = 0;
    if (POPULAR_BRANDS.includes(item.brand.toUpperCase())) priority += 10;
    if (POPULAR_MODELS.some(m => item.model.toUpperCase().includes(m))) priority += 20;

    return {
      brand: item.brand,
      model: item.model,
      repair_item: item.repair_item,
      repair_type: inferRepairType(item.repair_item),
      quality: item.quality || 'standard',
      price: item.price,
      warranty: item.warranty || '',
      priority: priority,
      is_unstable: false
    };
  });

  // Clear existing data to avoid duplicates
  const { error: deleteError } = await supabase.from('repair_quotes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (deleteError) {
     if (deleteError.code === '42P01') { // undefined_table
        console.error("Table 'repair_quotes' does not exist. Migration failed.");
     } else {
        console.error("Error clearing table:", deleteError);
     }
  } else {
     console.log("Table cleared. Inserting data...");
     
     const BATCH_SIZE = 500;
     for (let i = 0; i < dataToInsert.length; i += BATCH_SIZE) {
        const batch = dataToInsert.slice(i, i + BATCH_SIZE);
        const { error } = await supabase.from('repair_quotes').insert(batch);
        if (error) console.error(`Error inserting batch ${i}:`, error);
        else console.log(`Inserted batch ${i} to ${i + batch.length}`);
     }
     console.log('Migration completed!');
  }
}

migrate().catch(console.error);
