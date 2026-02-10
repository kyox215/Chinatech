
const { Pool } = require('pg');
require('dotenv').config();

async function checkConnection() {
  console.log("1. Checking Environment Variables...");
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing");
    process.exit(1);
  }
  console.log("✅ DATABASE_URL is present");

  console.log("\n2. Configuring Connection Pool...");
  const connectionString = process.env.DATABASE_URL.replace("sslmode=require", "");
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    console.log("\n3. Testing Network Connectivity & Authentication...");
    const client = await pool.connect();
    console.log("✅ Successfully connected to database");
    
    console.log("\n4. Verifying Permissions & Data...");
    const res = await client.query('SELECT count(*) FROM "recycle_models"');
    console.log(`✅ Query successful. Found ${res.rows[0].count} records in recycle_models table.`);
    
    client.release();
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    if (err.message.includes("certificate")) {
      console.error("   -> Hint: Check SSL configuration.");
    }
    if (err.message.includes("timeout")) {
      console.error("   -> Hint: Check firewall or network path.");
    }
  } finally {
    await pool.end();
  }
}

checkConnection();
