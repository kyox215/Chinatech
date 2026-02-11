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
  connectionTimeoutMillis: 5000, // Increased timeout
});

const adapter = new PrismaPg(pool);
export const db = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
