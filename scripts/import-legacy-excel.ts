
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error("DATABASE_URL is not defined");
    process.exit(1);
}

const pool = new Pool({ connectionString: connectionString.replace("sslmode=require", ""), ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const EXCEL_PATH = path.join(process.cwd(), 'ChinaTech_RIPARAZIONE.xlsx');

function excelDateToJSDate(serial: number) {
   if (!serial) return new Date();
   const utc_days  = Math.floor(serial - 25569);
   const utc_value = utc_days * 86400;                                        
   const date_info = new Date(utc_value * 1000);
   return date_info;
}

function mapStatus(raw: string) {
    if (!raw) return "PENDING";
    const s = raw.toUpperCase().trim();
    if (s.includes("FATTO") || s.includes("RITIRATO")) return "COMPLETED"; // Or DELIVERED if picked up
    if (s.includes("作废") || s.includes("ANNULLATO")) return "CANCELLED";
    if (s.includes("NON RIPARATO")) return "CANCELLED";
    return "PENDING";
}

async function main() {
    console.log("Starting legacy import...");
    
    if (!fs.existsSync(EXCEL_PATH)) {
        console.error("Excel file not found");
        return;
    }

    const workbook = XLSX.readFile(EXCEL_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log(`Found ${rows.length} rows to process.`);

    let count = 0;
    
    for (const row of rows as any[]) {
        const phone = row['NUMERO TELEFONO'] ? String(row['NUMERO TELEFONO']).trim() : null;
        const name = row['NOME'] ? String(row['NOME']).trim() : "Unknown Customer";
        
        // 1. Find or Create Customer
        let customerId: string | null = null;
        
        if (phone || name !== "Unknown Customer") {
            // Try to find by phone
            let customer;
            if (phone) {
                customer = await prisma.customer.findFirst({ where: { phone } });
            }
            
            if (!customer) {
                try {
                    customer = await prisma.customer.create({
                        data: {
                            name: name || (phone ? `Customer ${phone}` : "Unknown"),
                            phone: phone,
                            type: "LEGACY"
                        }
                    });
                } catch (e) {
                    // Retry or fetch if concurrent creation happened
                    if (phone) customer = await prisma.customer.findFirst({ where: { phone } });
                }
            }
            if (customer) customerId = customer.id;
        }

        // 2. Create Repair Order
        const intakeDate = row['DATA AGGIUNTA'] ? excelDateToJSDate(row['DATA AGGIUNTA']) : new Date();
        const completedDate = row['DATA RITIRO'] ? excelDateToJSDate(row['DATA RITIRO']) : null;
        const status = mapStatus(row['STATO']);
        
        // Generate Order No
        // Use nanoid to ensure uniqueness as legacy doesn't have ID
        const orderNo = `LEGACY-${nanoid(8)}`;

        try {
            await prisma.repairOrder.create({
                data: {
                    orderNo,
                    customerId,
                    brand: row['MARCA'] ? String(row['MARCA']) : "Unknown",
                    model: row['MODELLO'] ? String(row['MODELLO']) : "Unknown",
                    problem: row['PROBLEMA'] ? String(row['PROBLEMA']) : "Legacy Import",
                    status: completedDate ? "DELIVERED" : status, // If pickup date exists, it's delivered
                    
                    finalPrice: row['PREZZO TOTALE'] ? parseFloat(row['PREZZO TOTALE']) : 0,
                    deposit: row['ACCONTO'] ? parseFloat(row['ACCONTO']) : 0,
                    warranty: row['GARANZIA'] ? String(row['GARANZIA']) : undefined,
                    imeiOrSn: row['S/N o IMEI'] ? String(row['S/N o IMEI']) : undefined,
                    
                    intakeDate: intakeDate,
                    completedDate: completedDate || (status === 'COMPLETED' ? intakeDate : undefined),
                    pickupDate: completedDate,
                    
                    privateNotes: `Technician: ${row['TECNICO'] || 'Unknown'}. Legacy Status: ${row['STATO']}`,
                    createdAt: intakeDate
                }
            });
            count++;
            if (count % 100 === 0) console.log(`Processed ${count} orders...`);
        } catch (e) {
            console.error(`Failed to import row: ${JSON.stringify(row)}`, e);
        }
    }

    console.log(`Import completed. Imported ${count} orders.`);
}

main().catch(console.error);
