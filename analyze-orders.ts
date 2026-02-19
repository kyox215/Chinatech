
import * as fs from 'fs';
import * as path from 'path';

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
          i++; // Skip next quote
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
        if (currentRow.length > 1 || currentRow[0] !== '') { // Skip empty lines
             rows.push(currentRow);
        }
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

const csvPath = path.resolve(process.cwd(), 'orders_dump.csv');
const content = fs.readFileSync(csvPath, 'utf8');
const data = parseCSV(content);

console.log(`Total Rows: ${data.length}`);
if (data.length === 0) process.exit(0);

const numCols = data[0].length;
console.log(`Columns per row: ${numCols}`);

// Analyze each column
for (let colIndex = 0; colIndex < numCols; colIndex++) {
  const values = data.map(row => row[colIndex]).filter(v => v !== undefined && v !== '');
  const uniqueValues = new Set(values);
  const isNumeric = values.every(v => !isNaN(parseFloat(v.replace(/[€,]/g, ''))) && isFinite(Number(v.replace(/[€,]/g, ''))));
  
  console.log(`\n--- Column ${colIndex + 1} ---`);
  console.log(`Non-empty count: ${values.length}`);
  console.log(`Unique count: ${uniqueValues.size}`);
  
  if (uniqueValues.size < 20) {
    console.log('Unique Values:', Array.from(uniqueValues));
  } else {
    console.log('Sample Values:', values.slice(0, 5));
  }
}
