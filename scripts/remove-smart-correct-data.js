const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const fs = require('fs');
const path = require('path');

// Load .env manually since we are in a script
try {
  const envPath = path.join(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
        if (key && !process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (e) {
  console.warn('⚠️ Could not read .env file');
}

const connectionString = process.env.DATABASE_URL;

let db;

if (connectionString) {
  // Use adapter if possible, matching app logic
  const pool = new Pool({ 
    connectionString: connectionString.replace("sslmode=require", ""),
    ssl: { rejectUnauthorized: false } 
  });
  const adapter = new PrismaPg(pool);
  db = new PrismaClient({ adapter });
} else {
  // Fallback to default (might fail if generated client requires adapter)
  console.warn('⚠️ DATABASE_URL not found, trying default initialization...');
  db = new PrismaClient();
}

async function main() {
  console.log('🚀 Starting Smart Correction Data Cleanup...');

  try {
    // 1. Backup Phase (Simulated)
    console.log('📦 Creating backup of current Quotes data...');
    // Wrap in try-catch in case DB connection fails completely
    try {
      const quotes = await db.quote.findMany();
      const backupPath = path.join(__dirname, `../backups/quotes_backup_${Date.now()}.json`);
      
      if (!fs.existsSync(path.join(__dirname, '../backups'))) {
        fs.mkdirSync(path.join(__dirname, '../backups'));
      }
      
      fs.writeFileSync(backupPath, JSON.stringify(quotes, null, 2));
      console.log(`✅ Backup saved to ${backupPath}`);
    } catch (e) {
      console.error(`❌ Backup failed (DB Error): ${e.message}`);
      // Proceed to try cleanup anyway if possible
    }

    // 2. Cleanup Phase
    const legacyTables = ['smart_correction_logs', 'audit_records', 'correction_dictionary'];
    
    for (const table of legacyTables) {
      try {
        await db.$executeRawUnsafe(`DROP TABLE IF EXISTS "${table}" CASCADE;`);
        console.log(`🗑️  Dropped legacy table (if existed): ${table}`);
      } catch (e) {
        console.log(`ℹ️  Table ${table} check skipped: ${e.message}`);
      }
    }
    
    console.log('✅ Legacy tables cleanup attempt complete.');

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
  } finally {
    await db.$disconnect();
  }
}

main();
