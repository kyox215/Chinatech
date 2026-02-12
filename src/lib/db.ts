import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

if (!connectionString) {
  console.error("Database connection string is missing! Please set DATABASE_URL or POSTGRES_PRISMA_URL.");
}

const pool = new Pool({ 
  connectionString: connectionString ? connectionString.replace("sslmode=require", "") : undefined,
  ssl: process.env.NODE_ENV === "production" ? true : { rejectUnauthorized: false },
  max: process.env.NODE_ENV === "production" ? 1 : 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Increased timeout to 10s
  keepAlive: true, // Enable TCP Keep-Alive
  retry: {
    max: 3, // Max retries
  } as any // pg doesn't strictly support retry config here, handled by application logic or pool internals if extended
});

// Implement manual retry logic for initial connection if needed, 
// but Pool handles reconnection. We just ensure parameters are robust.
// Actually, 'pg' pool will retry on new client creation if database is down? No, it throws.
// We can add an 'error' listener to the pool.

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // process.exit(-1); // Do not exit, let it reconnect
});

const adapter = new PrismaPg(pool);
export const db = globalThis.prisma || new PrismaClient({ 
  adapter,
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
