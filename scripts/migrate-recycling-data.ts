import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
// Note: In ES modules, __dirname is not available. We assume the script is run from project root or handle relative path carefully.
// Simplification: just use process.cwd() to find .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const connectionString = process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  console.error('Error: POSTGRES_URL_NON_POOLING environment variable is not defined.');
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const initialCsvData = `Model,ScreenPrice,BatteryPrice,BaseRecyclePrice,ReleaseYear
iPhone 17 Pro Max,499,139,800,2025
iPhone 17 Pro,419,139,700,2025
iPhone 17 Plus,419,109,580,2025
iPhone 17,419,109,520,2025
iPhone 16 Pro Max,499,139,680,2024
iPhone 16 Pro,419,139,580,2024
iPhone 16 Plus,419,109,480,2024
iPhone 16,349,109,400,2024
iPhone 15 Pro Max,499,109,580,2023
iPhone 15 Pro,419,109,480,2023
iPhone 15 Plus,419,109,380,2023
iPhone 15,349,109,320,2023
iPhone 14 Pro Max,499,109,480,2022
iPhone 14 Pro,419,109,400,2022
iPhone 14 Plus,419,109,280,2022
iPhone 14,349,109,250,2022
iPhone 13 Pro Max,419,99,350,2021
iPhone 13 Pro,349,99,300,2021
iPhone 13,349,99,200,2021
iPhone 13 mini,289,99,150,2021
iPhone 12 Pro Max,419,99,250,2020
iPhone 12 Pro,349,99,200,2020
iPhone 12,349,99,150,2020
iPhone 12 mini,289,99,100,2020
iPhone 11 Pro Max,419,99,160,2019
iPhone 11 Pro,349,99,130,2019
iPhone 11,249,99,90,2019`;

interface IPhoneModel {
    model: string;
    screenPrice: number;
    batteryPrice: number;
    baseRecyclePrice: number;
    releaseYear: number;
}

const parseCSV = (csvText: string): IPhoneModel[] => {
    const lines = csvText.trim().split('\n');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return {
            model: values[0],
            screenPrice: parseFloat(values[1]),
            batteryPrice: parseFloat(values[2]),
            baseRecyclePrice: parseFloat(values[3]),
            releaseYear: parseInt(values[4])
        };
    });
};

async function migrate() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully.');

    // 1. Create Table
    console.log('Creating table recycling_models if not exists...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS recycling_models (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        model TEXT UNIQUE NOT NULL,
        screen_price NUMERIC NOT NULL,
        battery_price NUMERIC NOT NULL,
        base_recycle_price NUMERIC NOT NULL,
        release_year INTEGER NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('Table created or already exists.');

    // 2. Parse Data
    const models = parseCSV(initialCsvData);
    console.log(`Parsed ${models.length} models from CSV.`);

    // 3. Insert Data
    console.log('Inserting data...');
    for (const m of models) {
      await client.query(`
        INSERT INTO recycling_models (model, screen_price, battery_price, base_recycle_price, release_year)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (model) DO UPDATE SET
          screen_price = EXCLUDED.screen_price,
          battery_price = EXCLUDED.battery_price,
          base_recycle_price = EXCLUDED.base_recycle_price,
          release_year = EXCLUDED.release_year;
      `, [m.model, m.screenPrice, m.batteryPrice, m.baseRecyclePrice, m.releaseYear]);
    }
    console.log('All data inserted/updated successfully.');

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
    console.log('Disconnected.');
  }
}

migrate();
