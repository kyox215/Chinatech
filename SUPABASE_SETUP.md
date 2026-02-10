# Supabase Database Setup & Connection Guide

This guide helps you connect your application to a Supabase PostgreSQL database, enabling full data persistence for the Recycling module.

## 1. Create Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **"New Project"**.
3. Enter a Name (e.g., `chinatech-recycling`), Database Password (save this!), and Region.
4. Click **"Create new project"** and wait for it to be ready.

## 2. Get Connection String
1. In your project dashboard, go to **Project Settings** (gear icon) -> **Database**.
2. Under **Connection string**, make sure **Transaction pooler** is checked (recommended for Serverless/Next.js).
3. Copy the URI. It looks like:
   `postgres://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true`
4. Replace `[password]` with the password you set in Step 1.

## 3. Configure Environment Variables
1. Open or create `.env` file in the project root.
2. Add/Update the `DATABASE_URL` variable:

```env
# Replace with your actual connection string
DATABASE_URL="postgres://postgres.xxxx:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

## 4. Sync Schema (Create Tables)
Run the following command in your terminal to push the Prisma schema to Supabase:

```bash
npx prisma db push
```

*Success Output:* `🚀  Your database is now in sync with your Prisma schema.`

## 5. Verify Connection & Data
You can inspect the database directly using Prisma Studio:

```bash
npx prisma studio
```

This will open a web interface at `http://localhost:5555` where you can see the `RecycleModel` table.

## 6. API Verification (CRUD)
The application now implements full CRUD operations:
- **GET** `/api/recycling`: List all models (auto-seeds if empty).
- **POST** `/api/recycling`: Create a new model.
- **PUT** `/api/recycling/[id]`: Update a model.
- **DELETE** `/api/recycling/[id]`: Delete a model.

### Manual Test Script
You can run the provided test script to verify all operations:

```bash
node scripts/test-recycling-api.js
```
