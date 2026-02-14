
import { BrandType, ModelItem, Repair, QuoteRecord } from './repair-types';

export interface BrandInfo {
  icon: string | null;
  color: string;
}

export function getBrandInfo(brand: string): BrandInfo {
  const b = brand.toUpperCase();
  switch (b) {
    case 'APPLE': return { icon: 'https://cdn.simpleicons.org/apple/000000', color: '#000000' };
    case 'SAMSUNG': return { icon: 'https://cdn.simpleicons.org/samsung/1428A0', color: '#1428A0' };
    case 'XIAOMI': return { icon: 'https://cdn.simpleicons.org/xiaomi/FF6900', color: '#FF6900' };
    case 'OPPO': return { icon: 'https://cdn.simpleicons.org/oppo/009B77', color: '#009B77' };
    case 'HUAWEI': return { icon: 'https://cdn.simpleicons.org/huawei/FF0000', color: '#FF0000' };
    case 'HONOR': return { icon: 'https://cdn.simpleicons.org/honor/000000', color: '#000000' };
    case 'REALME': return { icon: 'https://cdn.simpleicons.org/realme/FFC915', color: '#FFC915' };
    case 'VIVO': return { icon: 'https://cdn.simpleicons.org/vivo/415FFF', color: '#415FFF' };
    case 'ONEPLUS': return { icon: 'https://cdn.simpleicons.org/oneplus/F5010C', color: '#F5010C' };
    case 'GOOGLE': return { icon: 'https://cdn.simpleicons.org/google/4285F4', color: '#4285F4' };
    case 'MOTOROLA': return { icon: 'https://cdn.simpleicons.org/motorola/E1140A', color: '#E1140A' };
    case 'NOKIA': return { icon: 'https://cdn.simpleicons.org/nokia/124191', color: '#124191' };
    case 'SONY': return { icon: 'https://cdn.simpleicons.org/sony/000000', color: '#000000' };
    case 'LG': return { icon: 'https://cdn.simpleicons.org/lg/A50034', color: '#A50034' };
    case 'HTC': return { icon: 'https://cdn.simpleicons.org/htc/99CC00', color: '#99CC00' };
    case 'ASUS': return { icon: 'https://cdn.simpleicons.org/asus/000000', color: '#000000' };
    case 'LENOVO': return { icon: 'https://cdn.simpleicons.org/lenovo/E2231A', color: '#E2231A' };
    case 'ZTE': return { icon: 'https://cdn.simpleicons.org/zte/0057B8', color: '#0057B8' };
    case 'ALCATEL': return { icon: 'https://cdn.simpleicons.org/alcatel/FF6600', color: '#FF6600' };
    case 'TCL': return { icon: 'https://cdn.simpleicons.org/tcl/003DA5', color: '#003DA5' };
    case 'MEIZU': return { icon: 'https://cdn.simpleicons.org/meizu/000000', color: '#000000' };
    case 'NOTHING': return { icon: 'https://cdn.simpleicons.org/nothing/000000', color: '#000000' };
    case 'REDMI': return { icon: 'https://cdn.simpleicons.org/xiaomi/FF6900', color: '#FF6900' };
    case 'POCO': return { icon: 'https://cdn.simpleicons.org/poco/FFC915', color: '#FFC915' };
    case 'IQOO': return { icon: 'https://cdn.simpleicons.org/vivo/415FFF', color: '#415FFF' };
    case 'ROG': return { icon: 'https://cdn.simpleicons.org/asus/FF0000', color: '#FF0000' };
    case 'NUBIA': return { icon: 'https://cdn.simpleicons.org/zte/FF0000', color: '#FF0000' };
    case 'FAIRPHONE': return { icon: 'https://cdn.simpleicons.org/fairphone/3AA95A', color: '#3AA95A' };
    case 'INFINIX': return { icon: 'https://cdn.simpleicons.org/infinix/FF5100', color: '#FF5100' };
    case 'TECNO': return { icon: 'https://cdn.simpleicons.org/tecno/0080FF', color: '#0080FF' };
    default: return { icon: null, color: '#64748b' };
  }
}

// Repair sort order
export function getRepairSortOrder(label: string, quality: string): number {
  if (label.includes('屏幕')) {
    if (quality === 'comp') return 1;
    if (quality === 'orig') return 2;
    return 3;
  }
  if (label.includes('电池')) {
    if (quality === 'comp') return 4;
    if (quality === 'orig') return 5;
    if (quality === 'altcap') return 6;
    return 7;
  }
  return 100;
}

// Extract series name and number from model for sorting
export function parseModelForSort(model: string): { series: string; num: number; suffix: string } {
  const m = model.toUpperCase().trim();
  const patterns = [
    /^(IPHONE|IPAD|WATCH)\s*(\d+)?\s*(.*)/i,
    /^(GALAXY\s*[SZAFM]|NOTE)\s*(\d+)?\s*(.*)/i,
    /^(REDMI\s*NOTE|REDMI|MI|POCO\s*[XFMC]|POCO)\s*(\d+)?\s*(.*)/i,
    /^(FIND\s*X|RENO|A)\s*(\d+)?\s*(.*)/i,
    /^(P|MATE|NOVA)\s*(\d+)?\s*(.*)/i,
    /^(HONOR)\s*(\d+)?\s*(.*)/i,
    /^([A-Z]+)\s*(\d+)?\s*(.*)/i,
  ];
  
  for (const pattern of patterns) {
    const match = m.match(pattern);
    if (match) {
      const series = (match[1] || '').trim();
      const num = match[2] ? parseInt(match[2]) : 0;
      const suffix = (match[3] || '').trim();
      return { series, num, suffix };
    }
  }
  
  const numMatch = m.match(/(\d+)/);
  return { 
    series: m.replace(/\d+.*/, '').trim() || m, 
    num: numMatch ? parseInt(numMatch[1]) : 0,
    suffix: ''
  };
}

// Sort models by series then by number
export function sortModelsByYear(models: ModelItem[]): ModelItem[] {
  return [...models].sort((a, b) => {
    if (a.brand !== b.brand) return a.brand.localeCompare(b.brand);
    const parsedA = parseModelForSort(a.model);
    const parsedB = parseModelForSort(b.model);
    if (parsedA.series !== parsedB.series) return parsedA.series.localeCompare(parsedB.series);
    if (parsedA.num !== parsedB.num) return parsedA.num - parsedB.num;
    return parsedA.suffix.localeCompare(parsedB.suffix);
  });
}

// Calculate priority based on brand and model popularity
export function calculatePriority(brand: string, model: string): number {
  let priority = 0;
  const POPULAR_BRANDS = ['APPLE', 'SAMSUNG', 'HUAWEI', 'XIAOMI'];
  const POPULAR_MODELS = ['IPHONE 15', 'IPHONE 14', 'IPHONE 13', 'IPHONE 12', 'S23', 'S22', 'P60', 'MATE 60'];
  
  if (POPULAR_BRANDS.includes(brand.toUpperCase())) priority += 10;
  if (POPULAR_MODELS.some(m => model.toUpperCase().includes(m))) priority += 20;
  
  return priority;
}

// Convert ModelItem[] to QuoteRecord[] for database storage
export function convertToDbRecords(data: ModelItem[]): Omit<QuoteRecord, 'id' | 'created_at' | 'updated_at'>[] {
  const records: Omit<QuoteRecord, 'id' | 'created_at' | 'updated_at'>[] = [];
  
  data.forEach(m => {
    m.repairs.forEach(r => {
      records.push({
        brand: m.brand,
        model: m.model,
        repair_item: r.label,
        repair_type: r.type,
        quality: r.quality,
        price: r.price,
        warranty: r.warranty,
        priority: calculatePriority(m.brand, m.model),
        is_unstable: r.isUnstable || false,
      });
    });
  });
  
  return records;
}

// Convert QuoteRecord[] from database to ModelItem[] for app use
export function convertFromDbRecords(records: QuoteRecord[]): ModelItem[] {
  const map: Record<string, ModelItem> = {};
  
  records.forEach(r => {
    const key = `${r.brand}|${r.model}`;
    
    if (!map[key]) {
      map[key] = {
        brand: r.brand,
        model: r.model,
        repairs: [],
      };
    }
    
    map[key].repairs.push({
      id: r.id,
      label: r.repair_item,
      type: r.repair_type,
      quality: r.quality,
      price: r.price,
      warranty: r.warranty,
      isUnstable: r.is_unstable,
    });
  });
  
  const result = Object.values(map);
  
  // Sort repairs within each model
  result.forEach(m => {
    m.repairs.sort((a, b) => {
      const orderA = getRepairSortOrder(a.label, a.quality);
      const orderB = getRepairSortOrder(b.label, b.quality);
      if (orderA !== orderB) return orderA - orderB;
      return a.label.localeCompare(b.label);
    });
  });
  
  // Sort models by brand and year
  return sortModelsByYear(result);
}
