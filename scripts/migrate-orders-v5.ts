
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Simple CSV parser
function parseCSV(text: string) {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentField += '"';
          i++; 
        } else {
          inQuotes = false;
        }
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\n' || char === '\r') {
        currentRow.push(currentField.trim());
        if (currentRow.length > 1 || currentRow[0] !== '') rows.push(currentRow);
        currentRow = [];
        currentField = '';
        if (char === '\r' && nextChar === '\n') i++;
      } else {
        currentField += char;
      }
    }
  }
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }
  return rows;
}

// Map Excel Status to DB Status
function mapStatus(status: string): string {
  const s = status.toUpperCase().trim();
  if (s.includes('FATTO') || s.includes('修好')) return 'completed';
  if (s.includes('作废') || s.includes('已取消')) return 'cancelled';
  if (s.includes('到货已通知') || s.includes('修好已通知')) return 'notified';
  if (s.includes('到货')) return 'parts_arrived';
  if (s.includes('IN CORSO') || s.includes('寄修') || s.includes('返修')) return 'in_progress';
  if (s.includes('下单') || s.includes('订购')) return 'parts_ordered';
  if (s.includes('久等')) return 'long_wait';
  return 'pending'; // Default
}

// Map Service Type to boolean
function mapIsLeft(type: string): boolean {
  const t = type.toUpperCase().trim();
  if (t.includes('NON LASCIATTO') || t.includes('RIPARAZIONE VELOCE')) return false;
  if (t.includes('LASCIATTO')) return true;
  return false; // Default
}

// Clean price string to number
function cleanPrice(p: string): number {
  if (!p) return 0;
  return parseFloat(p.replace(/[€,]/g, '')) || 0;
}

async function migrate() {
  const csvPath = path.resolve(process.cwd(), 'orders_dump.csv');
  console.log(`Reading ${csvPath}...`);
  const content = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(content);
  
  console.log(`Found ${rows.length} rows.`);
  
  const batchSize = 100;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const records = batch.map((row, idx) => {
      // Row mapping based on analysis
      const statusRaw = row[0] || '';
      const name = row[1] || 'Guest';
      const serviceTypeRaw = row[2] || '';
      const category = row[3] || '';
      const phone = row[4] || '';
      const price = cleanPrice(row[5]);
      const deposit = cleanPrice(row[6]);
      const brand = row[7] || '';
      const model = row[8] || '';
      const issue = row[9] || '';
      const sourceCode = row[10] || '';
      const warranty = row[11] || '';
      const completedAtRaw = row[12];
      const createdAtRaw = row[13];
      const technician = row[14] || '';
      const imei = row[15] || '';

      // Generate a unique ticket number: YYYYMMDD-{index}
      // Since created_at might be missing, use current date fallback or parse it
      let datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      if (createdAtRaw && !isNaN(Date.parse(createdAtRaw))) {
          datePrefix = new Date(createdAtRaw).toISOString().slice(0, 10).replace(/-/g, '');
      }
      const ticketNo = `${datePrefix}-${(i + idx + 1).toString().padStart(4, '0')}`;

      return {
        ticket_no: ticketNo,
        status: mapStatus(statusRaw),
        customer_name: name,
        customer_phone: phone,
        service_type: mapIsLeft(serviceTypeRaw) ? 'leave_in' : 'quick',
        category,
        brand,
        model,
        issue,
        price,
        deposit,
        source_code: sourceCode,
        warranty,
        technician,
        imei,
        is_device_left: mapIsLeft(serviceTypeRaw),
        created_at: createdAtRaw && !isNaN(Date.parse(createdAtRaw)) ? new Date(createdAtRaw) : new Date(),
        completed_at: completedAtRaw && !isNaN(Date.parse(completedAtRaw)) ? new Date(completedAtRaw) : null,
        // Default values
        accessories_left: ''
      };
    });

    const { error } = await supabase.from('orders').insert(records);

    if (error) {
      console.error(`Error inserting batch ${i}:`, error);
      errorCount += batch.length;
    } else {
      successCount += batch.length;
      process.stdout.write(`\rImported ${successCount}/${rows.length}`);
    }
  }

  console.log(`\nMigration completed. Success: ${successCount}, Failed: ${errorCount}`);
}

migrate();
