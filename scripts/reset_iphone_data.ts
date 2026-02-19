import fs from 'fs';
import path from 'path';
import { SMARTPHONE_DB } from './data/model-db';

// 1. Read existing data
const pricesPath = path.join(process.cwd(), 'lib/data/repair-prices.ts');
const fileContent = fs.readFileSync(pricesPath, 'utf-8');
const match = fileContent.match(/export const REPAIR_PRICES: RepairItem\[\] = (\[[\s\S]*\]);/);
let oldData: any[] = [];
if (match) {
    try {
        oldData = eval(match[1]);
    } catch (e) {
        console.error("Failed to parse existing data.");
    }
}

// 2. Define Strict iPhone Items
const IPHONE_ITEMS = [
    { name: '屏幕 (原装)', quality: 'orig', type: 'screen', warranty: '6 MESI' },
    { name: '屏幕 (组装)', quality: 'comp', type: 'screen', warranty: '6 MESI' },
    { name: '电池 (原装)', quality: 'orig', type: 'battery', warranty: '6 MESI' },
    { name: '电池 (组装)', quality: 'comp', type: 'battery', warranty: '6 MESI' },
    { name: '电池 (扩容)', quality: 'high_cap', type: 'battery', warranty: '6 MESI' },
    { name: '尾插充电口', quality: 'standard', type: 'charging', warranty: '6 MESI' },
    { name: '后盖', quality: 'standard', type: 'back_glass', warranty: '6 MESI' }
];

// 3. Process Data
const newData: any[] = [];
// First, add all NON-iPhone items from oldData
oldData.forEach(item => {
    if (!(item.brand === 'APPLE' && item.category?.includes('iPhone'))) {
        newData.push(item);
    }
});

let idCounter = 1;

// Now, generate fresh iPhone data
SMARTPHONE_DB.forEach(phone => {
    if (phone.brand === 'APPLE' && phone.series === 'iPhone 系列') {
        IPHONE_ITEMS.forEach(template => {
            // Try to find existing price
            const existing = oldData.find(old => 
                old.brand === 'APPLE' && 
                old.model === phone.model && 
                (
                    old.repair_item === template.name ||
                    // Fuzzy match for legacy names
                    (template.name.includes('尾插') && old.repair_item.includes('尾插')) ||
                    (template.name.includes('后盖') && old.repair_item.includes('后盖')) ||
                    (template.name.includes('电池') && old.repair_item.includes('电池') && old.quality === template.quality) ||
                    (template.name.includes('屏幕') && old.repair_item.includes('屏幕') && old.quality === template.quality)
                )
            );

            newData.push({
                id: `repair-iphone-${Date.now()}-${idCounter++}`,
                brand: 'APPLE',
                model: phone.model,
                repair_item: template.name,
                quality: template.quality,
                price: existing ? existing.price : 0, // Preserve or 0
                warranty: template.warranty,
                repair_type: template.type,
                category: 'iPhone 系列',
                model_code: phone.codes ? phone.codes.join(', ') : undefined
            });
        });
    }
});

// 4. Write back
const output = `export interface RepairItem {
  id: string;
  brand: string;
  model: string;
  repair_item: string;
  quality: string;
  price: number;
  warranty: string;
  repair_type?: string;
  priority?: number;
  category?: string;
  model_code?: string;
}

export const REPAIR_PRICES: RepairItem[] = ${JSON.stringify(newData, null, 2)};
`;

fs.writeFileSync(pricesPath, output);
console.log(`Successfully reset iPhone data. Total items: ${newData.length}`);
