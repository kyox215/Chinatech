
import { PhoneModel, currentYear } from './data';

export interface ValuationParams {
  model: PhoneModel;
  storageValue: number;
  conditionDeduction: number;
  batteryType: 'percent' | 'fixed';
  batteryValue: number;
  isScreenBroken: boolean;
  holdDays: number;
}

export interface ValuationResult {
  finalPrice: number;
  basePrice: number;
  deductions: {
    condition: number;
    battery: number;
    screen: number;
    depreciation: number;
  };
  nextMonthPrice: number;
  depreciationInfo: {
    monthlyRate: number;
    label: string; // We might want to return a key instead of translated string for pure logic
    color: string;
    bg: string;
  };
}

export const getDepreciationInfo = (model: PhoneModel) => {
  const age = currentYear - model.releaseYear;
  
  let monthlyRate = 0.015;
  let labelKey = 'stableDrop';
  let color = "text-yellow-600";
  let bg = "bg-yellow-100";

  if (age <= 1) { 
      monthlyRate = 0.025; 
      labelKey = 'fastDrop';
      color = "text-red-600";
      bg = "bg-red-100";
  } else if (age >= 3) {
      monthlyRate = 0.010; 
      labelKey = 'slowDrop';
      color = "text-green-600";
      bg = "bg-green-100";
  }

  return { monthlyRate, labelKey, color, bg };
};

export const calculateValuation = (params: ValuationParams): ValuationResult => {
  const { model, storageValue, conditionDeduction, batteryType, batteryValue, isScreenBroken, holdDays } = params;

  // 1. Base
  const basePrice = model.baseRecyclePrice + storageValue;
  let currentPrice = basePrice;
  const baseForCalc = basePrice; 

  // 2. Condition
  const conditionDed = Math.floor(baseForCalc * conditionDeduction);
  currentPrice -= conditionDed;

  // 3. Battery
  let batteryDed = 0;
  if (batteryType === 'percent') {
      batteryDed = Math.floor(baseForCalc * batteryValue);
  } else {
      batteryDed = model.batteryPrice;
  }
  currentPrice -= batteryDed;

  // 4. Screen
  const screenDed = isScreenBroken ? model.screenPrice : 0;
  currentPrice -= screenDed;

  // 5. Depreciation
  // Ensure we don't calculate negative depreciation (appreciation)
  const valueForDepreciation = Math.max(0, currentPrice);
  const { monthlyRate, labelKey, color, bg } = getDepreciationInfo(model);
  const depreciationDed = Math.floor(valueForDepreciation * (monthlyRate / 30 * holdDays));
  currentPrice -= depreciationDed;

  // Final Floor
  const finalPrice = currentPrice < 10 ? 10 : Math.floor(currentPrice);
  
  // Next Month Projection
  const nextMonthPrice = Math.max(10, Math.floor(finalPrice * (1 - monthlyRate)));

  return {
      finalPrice,
      basePrice,
      deductions: {
          condition: conditionDed,
          battery: batteryDed,
          screen: screenDed,
          depreciation: depreciationDed
      },
      nextMonthPrice,
      depreciationInfo: { monthlyRate, label: labelKey, color, bg }
  };
};
