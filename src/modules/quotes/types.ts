export interface Repair {
  id: string;
  label: string;
  type: 'screen' | 'battery' | 'other';
  quality: 'orig' | 'comp' | 'altcap' | 'standard';
  price: number;
  warranty: string;
  count: number;
  isUnstable?: boolean;
  priceSpread?: string;
}

export interface ModelItem {
  brand: string;
  model: string;
  repairs: Repair[];
}

export type BrandType = 'all' | 'APPLE' | 'SAMSUNG' | 'XIAOMI' | 'OPPO' | 'HUAWEI' | 'HONOR' | 'REALME' | 'VIVO' | 'ONEPLUS';

export interface BrandInfo {
  icon: string | null;
  color: string;
}

// Database quote record
export interface QuoteRecord {
  id?: string;
  brand: string;
  model: string;
  repair_id: string;
  repair_label: string;
  repair_type: 'screen' | 'battery' | 'other';
  quality: 'orig' | 'comp' | 'altcap' | 'standard';
  price: number;
  warranty: string;
  count: number;
  is_unstable: boolean;
  price_spread: string | null;
  created_at?: string;
  updated_at?: string;
}
