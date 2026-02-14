
export interface Issue {
  type: 'red' | 'yellow';
  msg: string;
}

export interface Repair {
  id: string; // Database UUID
  label: string; // Display name (e.g. "屏幕 (组装)")
  type: 'screen' | 'battery' | 'other';
  quality: 'orig' | 'comp' | 'altcap' | 'standard';
  price: number;
  warranty: string;
  isUnstable?: boolean;
  issues?: Issue[];
}

export interface ModelItem {
  brand: string;
  model: string;
  repairs: Repair[];
  hasError?: boolean;
  hasWarning?: boolean;
}

export type BrandType = 'all' | 'APPLE' | 'SAMSUNG' | 'XIAOMI' | 'OPPO' | 'HUAWEI' | 'HONOR' | 'REALME' | 'VIVO' | 'ONEPLUS';

// Database record matching 'repair_quotes' table
export interface QuoteRecord {
  id: string;
  brand: string;
  model: string;
  repair_item: string;
  repair_type: 'screen' | 'battery' | 'other';
  quality: 'orig' | 'comp' | 'altcap' | 'standard';
  price: number;
  warranty: string;
  priority: number;
  is_unstable: boolean;
  created_at?: string;
  updated_at?: string;
}
