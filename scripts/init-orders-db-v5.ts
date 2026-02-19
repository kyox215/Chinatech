
import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const connectionString = 
  process.env.POSTGRES_URL_NON_POOLING || 
  process.env.POSTGRES_URL || 
  process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: No database connection string found in .env.local');
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  try {
    console.log('Connecting to database...');
    await client.connect();

    // 1. Drop old table if exists (user approved full reset previously)
    console.log('Dropping old orders table...');
    await client.query('DROP TABLE IF EXISTS orders CASCADE');
    await client.query('DROP TABLE IF EXISTS order_events CASCADE');
    await client.query('DROP TABLE IF EXISTS inventory_items CASCADE');
    
    // 2. Create new table
    const migrationFile = path.resolve(process.cwd(), 'supabase/migrations/20260218_create_orders_v5.sql');
    const sql = fs.readFileSync(migrationFile, 'utf8');
    console.log('Creating new orders table (V5)...');
    await client.query(sql);
    
    console.log('Migration successful: orders table created.');

  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
