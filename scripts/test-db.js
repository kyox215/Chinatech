
const { Pool } = require('pg');

// User provided URL with port 6543 (Transaction Mode)
const connectionString = "postgres://postgres.xluzcoduqsdvjoouqhkc:rsF9Aki1Y6J3BDRw@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true";

// Simulate src/lib/db.ts logic
const pool = new Pool({
  connectionString: connectionString.replace("sslmode=require", ""),
  ssl: { rejectUnauthorized: false }, // Dev mode setting, or true for prod
  max: 1,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

async function test() {
  try {
    console.log("Connecting to DB...");
    const client = await pool.connect();
    console.log("Connected! Running query...");
    
    // Simple query
    const res = await client.query('SELECT NOW()');
    console.log("Result:", res.rows[0]);
    
    // Prepared statement simulation (what Prisma might do)
    // Note: 'pg' uses prepared statements if 'name' is provided in query config, 
    // OR sometimes for parameterized queries depending on implementation.
    // Let's try a parameterized query.
    const res2 = await client.query('SELECT $1::text as message', ['Hello']);
    console.log("Parameterized Result:", res2.rows[0]);

    client.release();
    await pool.end();
    console.log("Success!");
  } catch (err) {
    console.error("Connection Failed:", err);
    process.exit(1);
  }
}

test();
