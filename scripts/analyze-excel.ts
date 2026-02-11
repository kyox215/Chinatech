
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const filePath = path.join(process.cwd(), 'ChinaTech_RIPARAZIONE.xlsx');

if (!fs.existsSync(filePath)) {
  console.error("File not found:", filePath);
  process.exit(1);
}

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Get headers (Row 1)
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
if (jsonData.length === 0) {
  console.log("Empty sheet");
  process.exit(0);
}

const headers = jsonData[0] as string[];
console.log("Headers:", headers);

// Sample first 3 rows
console.log("Sample Data:");
const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" }).slice(0, 3);
console.log(JSON.stringify(rows, null, 2));

// Analyze unique values for potential enums (e.g. Status)
// Assuming headers might contain 'Stato', 'Status', 'Marca', etc.
const fullData = XLSX.utils.sheet_to_json(worksheet);
console.log(`Total Rows: ${fullData.length}`);
