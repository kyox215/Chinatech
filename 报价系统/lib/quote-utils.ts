import { BrandInfo, ModelItem, Repair, QuoteRecord } from './types';

export function getBrandInfo(brand: string): BrandInfo {
  const b = brand.toUpperCase();
  switch (b) {
    // Major brands with official logos
    case 'APPLE': return { icon: 'https://cdn.simpleicons.org/apple/000000', color: '#000000' };
    case 'SAMSUNG': return { icon: 'https://cdn.simpleicons.org/samsung/1428A0', color: '#1428A0' };
    case 'XIAOMI': return { icon: 'https://cdn.simpleicons.org/xiaomi/FF6900', color: '#FF6900' };
    case 'OPPO': return { icon: 'https://cdn.simpleicons.org/oppo/009B77', color: '#009B77' };
    case 'HUAWEI': return { icon: 'https://cdn.simpleicons.org/huawei/FF0000', color: '#FF0000' };
    case 'HONOR': return { icon: 'https://cdn.simpleicons.org/honor/000000', color: '#000000' };
    case 'REALME': return { icon: 'https://cdn.simpleicons.org/realme/FFC915', color: '#FFC915' };
    case 'VIVO': return { icon: 'https://cdn.simpleicons.org/vivo/415FFF', color: '#415FFF' };
    case 'ONEPLUS': return { icon: 'https://cdn.simpleicons.org/oneplus/F5010C', color: '#F5010C' };
    
    // Additional major brands
    case 'GOOGLE': return { icon: 'https://cdn.simpleicons.org/google/4285F4', color: '#4285F4' };
    case 'PIXEL': return { icon: 'https://cdn.simpleicons.org/google/4285F4', color: '#4285F4' };
    case 'MOTOROLA': return { icon: 'https://cdn.simpleicons.org/motorola/E1140A', color: '#E1140A' };
    case 'MOTO': return { icon: 'https://cdn.simpleicons.org/motorola/E1140A', color: '#E1140A' };
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
    
    // Xiaomi sub-brands
    case 'REDMI': return { icon: 'https://cdn.simpleicons.org/xiaomi/FF6900', color: '#FF6900' };
    case 'POCO': return { icon: 'https://cdn.simpleicons.org/poco/FFC915', color: '#FFC915' };
    case 'BLACK SHARK': return { icon: 'https://cdn.simpleicons.org/xiaomi/000000', color: '#000000' };
    case 'BLACKSHARK': return { icon: 'https://cdn.simpleicons.org/xiaomi/000000', color: '#000000' };
    
    // BBK Electronics brands (OPPO family)
    case 'IQOO': return { icon: 'https://cdn.simpleicons.org/vivo/415FFF', color: '#415FFF' };
    case 'ONEPLUS NORD': return { icon: 'https://cdn.simpleicons.org/oneplus/F5010C', color: '#F5010C' };
    
    // Gaming phones
    case 'ROG': return { icon: 'https://cdn.simpleicons.org/asus/FF0000', color: '#FF0000' };
    case 'ROG PHONE': return { icon: 'https://cdn.simpleicons.org/asus/FF0000', color: '#FF0000' };
    case 'NUBIA': return { icon: 'https://cdn.simpleicons.org/zte/FF0000', color: '#FF0000' };
    case 'RED MAGIC': return { icon: 'https://cdn.simpleicons.org/zte/FF0000', color: '#FF0000' };
    
    // Other known brands
    case 'FAIRPHONE': return { icon: 'https://cdn.simpleicons.org/fairphone/3AA95A', color: '#3AA95A' };
    case 'INFINIX': return { icon: 'https://cdn.simpleicons.org/infinix/FF5100', color: '#FF5100' };
    case 'TECNO': return { icon: 'https://cdn.simpleicons.org/tecno/0080FF', color: '#0080FF' };
    case 'WIKO': return { icon: null, color: '#00A0E9' };
    case 'CUBOT': return { icon: null, color: '#FF6600' };
    case 'DOOGEE': return { icon: null, color: '#1E90FF' };
    case 'ULEFONE': return { icon: null, color: '#FF6600' };
    case 'OUKITEL': return { icon: null, color: '#00BFFF' };
    case 'UMIDIGI': return { icon: null, color: '#3498DB' };
    case 'BLACKVIEW': return { icon: null, color: '#000000' };
    
    default: return { icon: null, color: '#64748b' };
  }
}

// Normalize model name to handle space variations like "note 11 s" vs "note 11s"
export function smartNormalizeModel(model: string): string {
  if (!model) return '';
  
  // Remove all spaces and convert to lowercase for comparison key
  let normalized = model.toUpperCase().trim();
  
  // Common patterns to normalize:
  // 1. "11 S" -> "11S", "12 PRO" -> "12 PRO" (keep PRO/MAX/PLUS/ULTRA separate)
  // 2. "NOTE 11 S" -> "NOTE 11S"
  // 3. Handle single letter suffixes that might have space before them
  
  // First, normalize multiple spaces to single space
  normalized = normalized.replace(/\s+/g, ' ');
  
  // Pattern: number followed by space and single letter (like "11 S" -> "11S")
  // But keep words like "PRO", "MAX", "PLUS", "ULTRA", "LITE", "MINI" separate
  const keepSeparate = ['PRO', 'MAX', 'PLUS', 'ULTRA', 'LITE', 'MINI', 'FOLD', 'FLIP', 'FE', 'SE', 'GT', '5G', '4G', 'LTE'];
  
  // Split into parts
  const parts = normalized.split(' ');
  const result: string[] = [];
  
  for (let i = 0; i < parts.length; i++) {
    const current = parts[i];
    const next = parts[i + 1];
    
    // If current is a number/alphanumeric and next is a single letter (not in keepSeparate)
    if (next && next.length === 1 && /^[A-Z]$/.test(next) && !keepSeparate.includes(next)) {
      result.push(current + next);
      i++; // Skip next
    } 
    // If current ends with number and next is single letter
    else if (next && /\d$/.test(current) && next.length === 1 && /^[A-Z]$/.test(next)) {
      result.push(current + next);
      i++; // Skip next
    }
    else {
      result.push(current);
    }
  }
  
  return result.join(' ');
}

// Create a key for model matching (removes all spaces for comparison)
export function getModelKey(model: string): string {
  return model.toUpperCase().replace(/\s+/g, '').replace(/[^A-Z0-9]/g, '');
}

// Common storage capacities to remove
const STORAGE_SIZES = ['16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB', '16', '32', '64', '128', '256', '512', '1024'];

// Common colors to remove (in multiple languages)
const COLORS = [
  // English
  'BLACK', 'WHITE', 'BLUE', 'RED', 'GREEN', 'YELLOW', 'PURPLE', 'PINK', 'GOLD', 'SILVER', 
  'GRAY', 'GREY', 'ORANGE', 'BROWN', 'CORAL', 'MIDNIGHT', 'STARLIGHT', 'GRAPHITE',
  'SIERRA', 'ALPINE', 'SPACE', 'ROSE', 'PACIFIC', 'DEEP', 'CREAM', 'LAVENDER', 'MINT',
  'PHANTOM', 'BURGUNDY', 'TITANIUM', 'NATURAL', 'DESERT',
  // Italian
  'NERO', 'BIANCO', 'BLU', 'ROSSO', 'VERDE', 'GIALLO', 'VIOLA', 'ROSA', 'ORO', 'ARGENTO',
  'GRIGIO', 'ARANCIONE', 'MARRONE', 'CORALLO', 'MEZZANOTTE', 'GALASSIA',
  // Chinese
  '黑色', '白色', '蓝色', '红色', '绿色', '黄色', '紫色', '粉色', '金色', '银色', '灰色'
];

// Clean model name by removing storage capacity and colors
export function cleanModelName(model: string): string {
  if (!model) return '';
  
  let cleaned = model.toUpperCase().trim();
  
  // Remove storage sizes (with or without GB/TB suffix)
  // Pattern: standalone numbers that look like storage (16, 32, 64, 128, 256, 512, 1024)
  // followed by optional GB/TB
  cleaned = cleaned.replace(/\b(16|32|64|128|256|512|1024|2048)\s*(GB|TB)?\b/gi, '');
  
  // Remove color words
  for (const color of COLORS) {
    // Match color as a whole word
    const regex = new RegExp(`\\b${color}\\b`, 'gi');
    cleaned = cleaned.replace(regex, '');
  }
  
  // Remove common suffixes that indicate color variants
  cleaned = cleaned.replace(/\b(EDITION|COLOR|COLOUR)\b/gi, '');
  
  // Clean up multiple spaces and trim
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  // Remove trailing punctuation
  cleaned = cleaned.replace(/[,\.\-_]+$/, '').trim();
  
  return cleaned;
}

// Split combined model names like "iPhone 11 ,IPHONE 17 PRO" into separate models
export function splitCombinedModels(rawModel: string): string[] {
  if (!rawModel) return [];
  
  const models: string[] = [];
  
  // First, try splitting by common delimiters: comma, semicolon, slash, "and", "&"
  // But be careful not to split valid model names like "A52 5G"
  
  // Pattern to detect model names (iPhone, Galaxy, Redmi, etc.)
  const modelPrefixes = [
    'IPHONE', 'IPAD', 'GALAXY', 'SAMSUNG', 'REDMI', 'XIAOMI', 'MI', 'POCO',
    'OPPO', 'RENO', 'FIND', 'HUAWEI', 'HONOR', 'MATE', 'NOVA', 'REALME',
    'VIVO', 'ONEPLUS', 'PIXEL', 'NOKIA', 'MOTOROLA', 'LG', 'SONY', 'ASUS'
  ];
  
  let text = rawModel.toUpperCase().trim();
  
  // Check if there are multiple model prefixes in the text
  let prefixCount = 0;
  let foundPrefixes: { prefix: string; index: number }[] = [];
  
  for (const prefix of modelPrefixes) {
    let idx = 0;
    while ((idx = text.indexOf(prefix, idx)) !== -1) {
      // Make sure it's a word boundary
      const before = idx === 0 || /[\s,;\/\-]/.test(text[idx - 1]);
      if (before) {
        foundPrefixes.push({ prefix, index: idx });
        prefixCount++;
      }
      idx += prefix.length;
    }
  }
  
  // If multiple prefixes found, split at each prefix
  if (prefixCount > 1) {
    // Sort by index
    foundPrefixes.sort((a, b) => a.index - b.index);
    
    for (let i = 0; i < foundPrefixes.length; i++) {
      const start = foundPrefixes[i].index;
      const end = i < foundPrefixes.length - 1 ? foundPrefixes[i + 1].index : text.length;
      let modelPart = text.slice(start, end).trim();
      // Clean up trailing delimiters
      modelPart = modelPart.replace(/[,;\/\-\s]+$/, '').trim();
      if (modelPart) {
        models.push(modelPart);
      }
    }
  } else {
    // No multiple prefixes, try splitting by delimiters
    // But only if the delimiter is followed by what looks like a new model
    const parts = text.split(/[,;]+/).map(p => p.trim()).filter(p => p);
    
    if (parts.length > 1) {
      // Check if each part looks like a model name
      for (const part of parts) {
        if (part && part.length > 2) {
          models.push(part);
        }
      }
    } else {
      models.push(text);
    }
  }
  
  return models.length > 0 ? models : [rawModel.toUpperCase().trim()];
}

// Extract model generation/year for sorting
// Returns a sortable number based on model naming patterns
export function getModelSortOrder(brand: string, model: string): number {
  const m = model.toUpperCase();
  
  // Apple iPhone sorting (iPhone 6 = 2014, iPhone 15 = 2023)
  if (brand === 'APPLE') {
    // iPhone models
    const iphoneMatch = m.match(/IPHONE\s*(\d+)/i);
    if (iphoneMatch) {
      const num = parseInt(iphoneMatch[1]);
      // iPhone 6 (2014) = 2014, iPhone 7 (2016) = 2016, etc.
      if (num <= 8) return 2014 + (num - 6) * 1;
      if (num === 10 || m.includes('X')) return 2017;
      if (num === 11) return 2019;
      if (num === 12) return 2020;
      if (num === 13) return 2021;
      if (num === 14) return 2022;
      if (num === 15) return 2023;
      if (num === 16) return 2024;
      return 2014 + num - 6;
    }
    // iPhone X variants
    if (m.includes('IPHONE X') && !m.includes('XR') && !m.includes('XS')) return 2017;
    if (m.includes('XR')) return 2018;
    if (m.includes('XS')) return 2018;
    // iPhone SE
    if (m.includes('SE')) {
      if (m.includes('2020') || m.includes('2')) return 2020;
      if (m.includes('2022') || m.includes('3')) return 2022;
      return 2016;
    }
    // iPad
    if (m.includes('IPAD')) {
      const ipadMatch = m.match(/(\d+)/);
      if (ipadMatch) return 2010 + parseInt(ipadMatch[1]);
    }
    return 2015;
  }
  
  // Samsung Galaxy sorting
  if (brand === 'SAMSUNG') {
    // Galaxy S series: S8 (2017), S9 (2018), S10 (2019), S20 (2020), S21 (2021), S22 (2022), S23 (2023), S24 (2024)
    const sMatch = m.match(/S\s*(\d+)/i);
    if (sMatch) {
      const num = parseInt(sMatch[1]);
      if (num < 10) return 2010 + num; // S8=2017, S9=2018
      if (num >= 10 && num < 20) return 2019; // S10
      if (num >= 20 && num < 21) return 2020;
      if (num >= 21 && num < 22) return 2021;
      if (num >= 22 && num < 23) return 2022;
      if (num >= 23 && num < 24) return 2023;
      if (num >= 24) return 2024;
    }
    // Galaxy A series: A10, A20, A50, A51, A52, A53, A54
    const aMatch = m.match(/A\s*(\d+)/i);
    if (aMatch) {
      const num = parseInt(aMatch[1]);
      if (num < 20) return 2019;
      if (num >= 50 && num < 52) return 2019;
      if (num >= 51 && num < 53) return 2020;
      if (num >= 52 && num < 54) return 2021;
      if (num >= 53 && num < 55) return 2022;
      if (num >= 54 && num < 56) return 2023;
      if (num >= 55) return 2024;
      return 2019 + Math.floor((num - 20) / 10);
    }
    // Galaxy Note
    if (m.includes('NOTE')) {
      const noteMatch = m.match(/NOTE\s*(\d+)/i);
      if (noteMatch) {
        const num = parseInt(noteMatch[1]);
        if (num < 10) return 2011 + num;
        if (num === 10) return 2019;
        if (num === 20) return 2020;
      }
    }
    // Galaxy Z Fold/Flip
    if (m.includes('FOLD') || m.includes('FLIP')) {
      const foldMatch = m.match(/(\d+)/);
      if (foldMatch) return 2019 + parseInt(foldMatch[1]);
    }
    return 2018;
  }
  
  // Xiaomi sorting
  if (brand === 'XIAOMI') {
    // Xiaomi numbered series: Mi 9, Mi 10, Mi 11, Mi 12, Mi 13, Mi 14
    const miMatch = m.match(/MI\s*(\d+)/i);
    if (miMatch) {
      const num = parseInt(miMatch[1]);
      if (num <= 9) return 2019;
      return 2019 + (num - 9);
    }
    // Redmi Note series
    if (m.includes('NOTE')) {
      const noteMatch = m.match(/NOTE\s*(\d+)/i);
      if (noteMatch) {
        const num = parseInt(noteMatch[1]);
        if (num <= 7) return 2016 + num;
        if (num === 8) return 2019;
        if (num === 9) return 2020;
        if (num === 10) return 2021;
        if (num === 11) return 2022;
        if (num === 12) return 2023;
        if (num === 13) return 2024;
        return 2020 + (num - 9);
      }
    }
    // Redmi numbered series
    const redmiMatch = m.match(/REDMI\s*(\d+)/i);
    if (redmiMatch) {
      const num = parseInt(redmiMatch[1]);
      return 2018 + Math.floor(num / 2);
    }
    // POCO
    if (m.includes('POCO')) {
      const pocoMatch = m.match(/(\d+)/);
      if (pocoMatch) return 2020 + parseInt(pocoMatch[1]) - 1;
      return 2020;
    }
    return 2019;
  }
  
  // OPPO sorting
  if (brand === 'OPPO') {
    const findMatch = m.match(/FIND\s*X?\s*(\d+)/i);
    if (findMatch) return 2018 + parseInt(findMatch[1]);
    const renoMatch = m.match(/RENO\s*(\d+)/i);
    if (renoMatch) return 2019 + parseInt(renoMatch[1]) - 1;
    const aMatch = m.match(/A\s*(\d+)/i);
    if (aMatch) {
      const num = parseInt(aMatch[1]);
      if (num < 50) return 2019;
      return 2020 + Math.floor((num - 50) / 20);
    }
    return 2019;
  }
  
  // Huawei sorting
  if (brand === 'HUAWEI') {
    const pMatch = m.match(/P\s*(\d+)/i);
    if (pMatch) {
      const num = parseInt(pMatch[1]);
      if (num < 20) return 2015 + num;
      if (num >= 20 && num < 30) return 2017;
      if (num >= 30 && num < 40) return 2019;
      if (num >= 40 && num < 50) return 2020;
      if (num >= 50 && num < 60) return 2022;
      if (num >= 60) return 2024;
    }
    const mateMatch = m.match(/MATE\s*(\d+)/i);
    if (mateMatch) {
      const num = parseInt(mateMatch[1]);
      if (num < 20) return 2015 + num;
      if (num >= 20 && num < 30) return 2018;
      if (num >= 30 && num < 40) return 2019;
      if (num >= 40 && num < 50) return 2020;
      if (num >= 50) return 2022;
    }
    const novaMatch = m.match(/NOVA\s*(\d+)/i);
    if (novaMatch) return 2016 + parseInt(novaMatch[1]);
    return 2018;
  }
  
  // Honor sorting
  if (brand === 'HONOR') {
    const numMatch = m.match(/(\d+)/);
    if (numMatch) {
      const num = parseInt(numMatch[1]);
      if (num < 20) return 2018 + Math.floor(num / 2);
      if (num >= 50) return 2021 + Math.floor((num - 50) / 20);
      return 2020;
    }
    return 2020;
  }
  
  // Realme sorting
  if (brand === 'REALME') {
    const numMatch = m.match(/(\d+)/);
    if (numMatch) {
      const num = parseInt(numMatch[1]);
      if (num < 10) return 2019 + num - 1;
      if (num >= 10) return 2023;
      return 2020;
    }
    return 2020;
  }
  
  // Vivo sorting
  if (brand === 'VIVO') {
    const xMatch = m.match(/X\s*(\d+)/i);
    if (xMatch) return 2017 + parseInt(xMatch[1]) - 1;
    const yMatch = m.match(/Y\s*(\d+)/i);
    if (yMatch) {
      const num = parseInt(yMatch[1]);
      return 2018 + Math.floor(num / 20);
    }
    const vMatch = m.match(/V\s*(\d+)/i);
    if (vMatch) return 2017 + parseInt(vMatch[1]) - 1;
    return 2019;
  }
  
  // OnePlus sorting
  if (brand === 'ONEPLUS') {
    const numMatch = m.match(/(\d+)/);
    if (numMatch) {
      const num = parseInt(numMatch[1]);
      if (num < 9) return 2014 + num;
      if (num === 9) return 2021;
      if (num === 10) return 2022;
      if (num === 11) return 2023;
      if (num === 12) return 2024;
      return 2020 + num - 8;
    }
    return 2019;
  }
  
  // Default: try to extract any number
  const anyNum = m.match(/(\d+)/);
  if (anyNum) return 2015 + parseInt(anyNum[1]);
  return 2020;
}

// Extract series name and number from model for sorting
// e.g., "iPhone 13 PRO MAX" -> { series: "IPHONE", num: 13, suffix: "PRO MAX" }
export function parseModelForSort(model: string): { series: string; num: number; suffix: string } {
  const m = model.toUpperCase().trim();
  
  // Common patterns: "iPhone 13", "Galaxy S23", "Redmi Note 11", "Mi 12"
  // Extract the series prefix and the main number
  
  // Pattern: series name + number + optional suffix
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
  
  // Fallback: try to extract any number
  const numMatch = m.match(/(\d+)/);
  return { 
    series: m.replace(/\d+.*/, '').trim() || m, 
    num: numMatch ? parseInt(numMatch[1]) : 0,
    suffix: ''
  };
}

// Sort models by series then by number (smallest to largest)
export function sortModelsByYear(models: ModelItem[]): ModelItem[] {
  return [...models].sort((a, b) => {
    // First sort by brand
    if (a.brand !== b.brand) return a.brand.localeCompare(b.brand);
    
    const parsedA = parseModelForSort(a.model);
    const parsedB = parseModelForSort(b.model);
    
    // Then by series name
    if (parsedA.series !== parsedB.series) {
      return parsedA.series.localeCompare(parsedB.series);
    }
    
    // Then by number (smaller first = older models first)
    if (parsedA.num !== parsedB.num) {
      return parsedA.num - parsedB.num;
    }
    
    // Finally by suffix (PRO before PRO MAX, etc.)
    return parsedA.suffix.localeCompare(parsedB.suffix);
  });
}

export function normalizeModel(brand: string, rawModel: string): string {
  if (!rawModel) return 'Unknown';
  
  // First clean the model name (remove storage and colors)
  let m = cleanModelName(rawModel);
  
  m = m.replace(/[\s\t]+/g, ' ').trim();
  
  if (brand === 'APPLE') {
    m = m.replace(/^APPLE\s*/, '').replace(/^IPHONE\s*/, '');
    if (m.startsWith('IPAD')) return smartNormalizeModel(m.replace('IPAD', 'iPad'));
    if (m.startsWith('WATCH') || m.startsWith('IWATCH')) return 'Apple Watch ' + smartNormalizeModel(m.replace(/^(IWATCH|WATCH)\s*/, ''));
    return 'iPhone ' + smartNormalizeModel(m);
  }
  if (['SAMSUNG', 'XIAOMI', 'OPPO', 'HUAWEI', 'HONOR', 'REALME', 'VIVO', 'ONEPLUS'].includes(brand)) {
    return smartNormalizeModel(m.replace(new RegExp(`^${brand}\\s*`), ''));
  }
  return smartNormalizeModel(m);
}

// Repair sort order: 屏幕组装 -> 屏幕原装 -> 电池组装 -> 电池原装 -> 电池扩容 -> 其他
export function getRepairSortOrder(label: string, quality: string): number {
  if (label.includes('屏幕')) {
    if (quality === 'comp') return 1; // 屏幕组装
    if (quality === 'orig') return 2; // 屏幕原装
    return 3;
  }
  if (label.includes('电池')) {
    if (quality === 'comp') return 4; // 电池组装
    if (quality === 'orig') return 5; // 电池原装
    if (quality === 'altcap') return 6; // 电池扩容
    return 7;
  }
  // Other repairs sorted alphabetically after main categories
  return 100;
}

// Sort repairs within a model
export function sortRepairs(repairs: Repair[]): Repair[] {
  return [...repairs].sort((a, b) => {
    const orderA = getRepairSortOrder(a.label, a.quality);
    const orderB = getRepairSortOrder(b.label, b.quality);
    if (orderA !== orderB) return orderA - orderB;
    return a.label.localeCompare(b.label);
  });
}

export function categorize(problem: string, price: number = 0): { type: 'screen' | 'battery' | 'other'; label: string; quality: 'orig' | 'comp' | 'altcap' | 'standard' } {
  const p = (problem || '').toUpperCase();
  const res: { type: 'screen' | 'battery' | 'other'; label: string; quality: 'orig' | 'comp' | 'altcap' | 'standard' } = { type: 'other', label: '其他', quality: 'standard' };

  // Battery repairs
  if (p.includes('BATTERIA') || p.includes('BATTERY')) {
    res.type = 'battery';
    if (p.includes('ALT CAP') || p.includes('MAGGIORATA') || p.includes('扩容')) { 
      res.label = '电池 (扩容)'; 
      res.quality = 'altcap'; 
    }
    else if (p.includes('COMP') || p.includes('组装') || p.includes('兼容')) { 
      res.label = '电池 (组装)'; 
      res.quality = 'comp'; 
    }
    else if (p.includes('ORIG') || p.includes('原装')) { 
      res.label = '电池 (原装)'; 
      res.quality = 'orig'; 
    }
    else { res.label = '电池'; res.quality = 'standard'; }
  } 
  // Screen repairs
  else if (p.includes('LCD') || p.includes('DISPLAY') || p.includes('SCHERMO') || p.includes('屏幕')) {
    res.type = 'screen';
    if (p.includes('COMP') || p.includes('INCELL') || p.includes('组装') || p.includes('兼容')) { 
      res.label = '屏幕 (组装)'; 
      res.quality = 'comp'; 
    }
    else if (p.includes('ORIG') || p.includes('原装')) { 
      res.label = '屏幕 (原装)'; 
      res.quality = 'orig'; 
    }
    else { res.label = '屏幕'; res.quality = 'standard'; }
  } 
  // Other repairs with translations
  else {
    // Earpiece / 听筒
    if (p.includes('EARSPEAKER') || p.includes('EAR SPEAKER') || p.includes('EARPIECE') || p.includes('CAPSULA') || p.includes('听筒')) {
      res.label = '听筒';
    }
    // Speaker / 扬声器
    else if (p.includes('ALTOPARLANTE') || p.includes('SPEAKER') || p.includes('LOUDSPEAKER') || p.includes('扬声器') || p.includes('喇叭')) {
      res.label = '扬声器';
    }
    // Charging port / 尾插
    else if (p.includes('CONNETTORE') || p.includes('CHARGING') || p.includes('DOCK') || p.includes('尾插') || p.includes('充电口')) {
      res.label = '尾插/充电口';
    }
    // Back cover / 后盖
    else if (p.includes('BACK') || p.includes('SCOCCA') || p.includes('VETRO POST') || p.includes('后盖') || p.includes('背板')) {
      res.label = '后盖';
    }
    // Camera / 摄像头
    else if (p.includes('CAMERA') || p.includes('FOTOCAMERA') || p.includes('摄像头') || p.includes('镜头')) {
      res.label = '摄像头';
    }
    // Vibrator / 马达
    else if (p.includes('VIBRA') || p.includes('MOTORE') || p.includes('马达') || p.includes('振动')) {
      res.label = '马达/振动器';
    }
    // Microphone / 麦克风
    else if (p.includes('MICROFONO') || p.includes('MIC') || p.includes('麦克风') || p.includes('话筒')) {
      res.label = '麦克风';
    }
    // SIM tray / SIM卡槽
    else if (p.includes('SIM') || p.includes('卡槽')) {
      res.label = 'SIM卡槽';
    }
    // Face ID / 面容
    else if (p.includes('FACE') || p.includes('面容') || p.includes('TRUEDEPTH')) {
      res.label = '面容ID';
    }
    // Touch ID / 指纹
    else if (p.includes('TOUCH ID') || p.includes('FINGERPRINT') || p.includes('IMPRONTA') || p.includes('指纹')) {
      res.label = '指纹识别';
    }
    // Motherboard issues (boot problems, restart issues, etc.) - only if price > 0
    else if (price > 0 && (
      p.includes('NON SI ACCENDE') || p.includes('NON ACCENDE') ||
      p.includes('RIAVVIA') || p.includes('RESTART') || p.includes('REBOOT') ||
      p.includes('BOOT') || p.includes('不开机') || p.includes('重启') ||
      p.includes('SCHEDA MADRE') || p.includes('MOTHERBOARD') || p.includes('MAINBOARD') ||
      p.includes('主板') || p.includes('LOGIC BOARD') || p.includes('LOGICA')
    )) {
      res.label = '主板';
    }
    // Default - keep original or translate common terms
    else {
      let label = problem || '其他';
      // Additional translations for common Italian terms
      label = label.replace(/SOSTITUZIONE/gi, '更换');
      label = label.replace(/RIPARAZIONE/gi, '维修');
      res.label = label;
    }
  }
  return res;
}

export function processCSV(data: Record<string, string>[]): ModelItem[] {
  // Use modelKey for grouping to merge similar models
  const map: Record<string, { brand: string; model: string; modelKey: string; repairs: Record<string, { id: string; label: string; type: 'screen' | 'battery' | 'other'; quality: 'orig' | 'comp' | 'altcap' | 'standard'; priceHistory: number[]; warrantyHistory: Record<string, number>; count: number }> }> = {};
  
  // Track which display name to use for each modelKey (prefer the one that appears most often)
  const modelNameCounts: Record<string, Record<string, number>> = {};
  
  data.forEach(row => {
    // Support both Italian column names (original CSV) and English column names (exported CSV)
    let baseBrand = (row['MARCA'] || row['Brand'] || '').trim().toUpperCase();
    const rawModel = (row['MODELLO'] || row['Model'] || '').trim();
    const problem = (row['PROBLEMA'] || row['Repair Item'] || '').trim();
    const priceStr = row['PREZZO TOTALE'] || row['Price'] || '0';
    const price = parseFloat(priceStr.replace(',', '.').replace(/[^\d.]/g, ''));
    const warranty = (row['GARANZIA'] || row['Warranty'] || 'N/A').trim();
    // For exported CSV, also get quality directly if available
    const exportedQuality = (row['Quality'] || '').trim().toLowerCase();

    if (!baseBrand || !rawModel || !problem || isNaN(price)) return;

    // Split combined models (e.g., "iPhone 11 ,IPHONE 17 PRO")
    const modelParts = splitCombinedModels(rawModel);
    
    for (const modelPart of modelParts) {
      let brand = baseBrand;
      
      // Brand Normalization
      if (brand.includes('IPHONE') || brand.includes('APPLE')) brand = 'APPLE';
      else if (brand.includes('SAMSUNG')) brand = 'SAMSUNG';
      else if (brand.includes('XIAOMI') || brand.includes('REDMI')) brand = 'XIAOMI';
      else if (brand.includes('OPPO')) brand = 'OPPO';
      else if (brand.includes('HUAWEI')) brand = 'HUAWEI';
      else if (brand.includes('HONOR')) brand = 'HONOR';
      else if (brand.includes('REALME')) brand = 'REALME';
      
      // Also detect brand from model part if it contains brand name
      if (modelPart.includes('IPHONE') || modelPart.includes('IPAD')) brand = 'APPLE';
      else if (modelPart.includes('GALAXY') || modelPart.startsWith('S2') || modelPart.startsWith('A5')) brand = 'SAMSUNG';
      else if (modelPart.includes('REDMI') || modelPart.includes('POCO') || modelPart.includes('MI ')) brand = 'XIAOMI';

      const model = normalizeModel(brand, modelPart);
      const modelKey = getModelKey(model); // Use normalized key for grouping
      const cat = categorize(problem, price); // Pass price for motherboard detection
      
      // If exported quality is available, use it; otherwise use categorized quality
      const qualityMap: Record<string, 'orig' | 'comp' | 'altcap' | 'standard'> = {
        'orig': 'orig', 'original': 'orig',
        'comp': 'comp', 'compatible': 'comp',
        'altcap': 'altcap', 'max': 'altcap',
        'standard': 'standard'
      };
      const finalQuality = qualityMap[exportedQuality] || cat.quality;
      
      const key = `${brand}|${modelKey}`; // Use modelKey instead of model
      
      // Track model name occurrences to pick the most common one
      if (!modelNameCounts[key]) modelNameCounts[key] = {};
      modelNameCounts[key][model] = (modelNameCounts[key][model] || 0) + 1;

      if (!map[key]) map[key] = { brand, model, modelKey, repairs: {} };
      const rKey = cat.label;

      if (!map[key].repairs[rKey]) {
        map[key].repairs[rKey] = {
          id: Math.random().toString(36).substr(2, 9),
          label: cat.label, type: cat.type, quality: finalQuality,
          priceHistory: [], warrantyHistory: {}, count: 0
        };
      }
      const r = map[key].repairs[rKey];
      r.priceHistory.push(price);
      r.warrantyHistory[warranty] = (r.warrantyHistory[warranty] || 0) + 1;
      r.count++;
    }
  });

  const appData = Object.entries(map).map(([key, m]) => {
    // Pick the most common model name for this modelKey
    const nameCounts = modelNameCounts[key] || {};
    let bestName = m.model;
    let maxCount = 0;
    for (const [name, count] of Object.entries(nameCounts)) {
      if (count > maxCount) {
        maxCount = count;
        bestName = name;
      }
    }
    
    const repairList: Repair[] = Object.values(m.repairs).map(r => {
      const pMap: Record<number, number> = {}; let maxP = 0, modeP = r.priceHistory[0];
      r.priceHistory.forEach(p => pMap[p] = (pMap[p] || 0) + 1);
      for (const [p, c] of Object.entries(pMap)) if (c > maxP) { maxP = c; modeP = parseFloat(p); }

      let maxW = 0, modeW = 'N/A';
      for (const [w, c] of Object.entries(r.warrantyHistory)) if (c > maxW) { maxW = c; modeW = w; }

      const minP = Math.min(...r.priceHistory);
      const maxPVal = Math.max(...r.priceHistory);
      const isUnstable = (maxPVal - minP) > 20 && (maxPVal > minP * 1.5);

      return {
        id: r.id, label: r.label, type: r.type, quality: r.quality,
        price: modeP, warranty: modeW, count: r.count,
        isUnstable: isUnstable, priceSpread: `${minP}-${maxPVal}`
      };
    });

    // Sort repairs: 屏幕组装 -> 屏幕原装 -> 电池组装 -> 电池原装 -> 电池扩容 -> 其他
    repairList.sort((a, b) => {
      const orderA = getRepairSortOrder(a.label, a.quality);
      const orderB = getRepairSortOrder(b.label, b.quality);
      if (orderA !== orderB) return orderA - orderB;
      return a.label.localeCompare(b.label);
    });

    return { brand: m.brand, model: bestName, repairs: repairList };
  });

  // Sort by brand first, then by year (oldest to newest)
  return sortModelsByYear(appData);
}

export function analyzeErrors(data: ModelItem[]): { data: ModelItem[]; totalIssues: number } {
  let totalIssues = 0;
  
  const analyzedData = data.map(m => {
    let modelHasError = false;
    let modelHasWarning = false;

    const getPrice = (type: string, qual: string) => {
      const r = m.repairs.find(x => x.type === type && x.quality === qual);
      return r ? r.price : null;
    };

    const origScreenPrice = getPrice('screen', 'orig');
    const compScreenPrice = getPrice('screen', 'comp');

    const repairs = m.repairs.map(r => {
      const issues: { type: 'red' | 'yellow'; msg: string }[] = [];
      
      if (r.type === 'screen' && r.quality === 'orig' && compScreenPrice && r.price < compScreenPrice) {
        issues.push({ type: 'red', msg: '原装比组装便宜' }); modelHasError = true; totalIssues++;
      }
      if (r.type === 'screen' && r.quality === 'comp' && origScreenPrice && r.price > origScreenPrice) {
        issues.push({ type: 'red', msg: '组装比原装贵' }); modelHasError = true; totalIssues++;
      }
      if (r.price === 0) {
        issues.push({ type: 'red', msg: '价格为0' }); modelHasError = true; totalIssues++;
      } else if (r.price < 10) {
        issues.push({ type: 'yellow', msg: '价格过低' }); modelHasWarning = true; totalIssues++;
      }
      if (r.price > 20 && (!r.warranty || r.warranty === 'N/A' || r.warranty === '')) {
        issues.push({ type: 'yellow', msg: '缺保修信息' }); modelHasWarning = true; totalIssues++;
      }
      if (r.isUnstable) {
        issues.push({ type: 'yellow', msg: `历史波动大 (${r.priceSpread})` }); modelHasWarning = true; totalIssues++;
      }
      
      return { ...r, issues };
    });

    return { ...m, repairs, hasError: modelHasError, hasWarning: modelHasWarning };
  });

  return { data: analyzedData, totalIssues };
}

export function exportToCSV(data: ModelItem[], currentBrand: string): void {
  const csvRows = [['Brand', 'Model', 'Repair Item', 'Quality', 'Price', 'Warranty']];
  data.forEach(m => {
    if (currentBrand !== 'all' && m.brand !== currentBrand) return;
    m.repairs.forEach(r => {
      csvRows.push([`"${m.brand}"`, `"${m.model}"`, `"${r.label}"`, `"${r.quality}"`, String(r.price), `"${r.warranty}"`]);
    });
  });
  const blob = new Blob([csvRows.map(e => e.join(",")).join("\n")], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `ChinaTech_Quote_Fixed_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Convert ModelItem[] to QuoteRecord[] for database storage
export function convertToDbRecords(data: ModelItem[]): Omit<QuoteRecord, 'id' | 'created_at' | 'updated_at'>[] {
  const records: Omit<QuoteRecord, 'id' | 'created_at' | 'updated_at'>[] = [];
  
  data.forEach(m => {
    m.repairs.forEach(r => {
      records.push({
        brand: m.brand,
        model: m.model,
        repair_id: r.id,
        repair_label: r.label,
        repair_type: r.type,
        quality: r.quality,
        price: r.price,
        warranty: r.warranty,
        count: r.count,
        is_unstable: r.isUnstable || false,
        price_spread: r.priceSpread || null,
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
      id: r.repair_id || r.id || Math.random().toString(36).substr(2, 9),
      label: r.repair_label,
      type: r.repair_type,
      quality: r.quality,
      price: r.price,
      warranty: r.warranty,
      count: r.count,
      isUnstable: r.is_unstable,
      priceSpread: r.price_spread || undefined,
    });
  });
  
  const result = Object.values(map);
  
  // Sort repairs within each model: 屏幕组装 -> 屏幕原装 -> 电池组装 -> 电池原装 -> 电池扩容 -> 其他
  result.forEach(m => {
    m.repairs.sort((a, b) => {
      const orderA = getRepairSortOrder(a.label, a.quality);
      const orderB = getRepairSortOrder(b.label, b.quality);
      if (orderA !== orderB) return orderA - orderB;
      return a.label.localeCompare(b.label);
    });
  });
  
  // Sort models by brand and year (oldest to newest)
  return sortModelsByYear(result);
}
