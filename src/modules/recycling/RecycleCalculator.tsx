
"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import { storageTiers, currentYear } from './data';
import { PhoneModel } from './types';
import { Smartphone, Battery, AlertTriangle, ShieldAlert, ArrowRight, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function RecycleCalculator() {
  const t = useTranslations("Recycling");

  // Data Fetching
  const { data: apiData, error, isLoading } = useSWR<PhoneModel[]>('/api/recycling', fetcher);
  const data = apiData || [];

  // Selections
  const [selectedModel, setSelectedModel] = React.useState<PhoneModel | null>(null);
  const [selectedStorage, setSelectedStorage] = React.useState(storageTiers[0]);
  const [isScreenBroken, setIsScreenBroken] = React.useState(false);
  const [holdDays, setHoldDays] = React.useState(7);

  // Dynamic Options
  const conditionGrades = React.useMemo(() => [
    { id: 'A', label: t('cond_A'), deductionPercent: 0, color: "text-green-600" },
    { id: 'B', label: t('cond_B'), deductionPercent: 0.05, color: "text-blue-600" },
    { id: 'C', label: t('cond_C'), deductionPercent: 0.15, color: "text-orange-600" },
    { id: 'D', label: t('cond_D'), deductionPercent: 0.30, color: "text-red-600" }
  ], [t]);

  const batteryLevels = React.useMemo(() => [
    { label: "98% - 100%", desc: t('bat_98'), type: 'percent', value: 0 },
    { label: "90% - 97%", desc: t('bat_90'), type: 'percent', value: 0.03 },
    { label: "85% - 89%", desc: t('bat_85'), type: 'percent', value: 0.06 },
    { label: "80% - 84%", desc: t('bat_80'), type: 'percent', value: 0.10 },
    { label: "< 80% / Rep.", desc: t('bat_bad'), type: 'fixed', value: 1.0 }
  ], [t]);

  const [selectedCondition, setSelectedCondition] = React.useState(conditionGrades[0]);
  const [selectedBattery, setSelectedBattery] = React.useState(batteryLevels[0]);

  // Initial Data Load
  React.useEffect(() => {
    // Only set initial model if data is loaded, we have data, and no model is selected yet
    if (data && data.length > 0 && !selectedModel) {
      setSelectedModel(data[0]);
    }
  }, [data, selectedModel]);

  // Update selections when options change (e.g., language change)
  React.useEffect(() => {
    // Re-find current selection in new language array by index or ID
    const currentCondIndex = conditionGrades.findIndex(g => g.id === selectedCondition?.id);
    if (currentCondIndex !== -1) setSelectedCondition(conditionGrades[currentCondIndex]);

    const currentBatIndex = batteryLevels.findIndex(b => b.label.split(' ')[0] === selectedBattery?.label.split(' ')[0]);
    if (currentBatIndex !== -1) setSelectedBattery(batteryLevels[currentBatIndex]);
  }, [t, conditionGrades, batteryLevels]);


  // ==========================================
  // Core Logic: Time Depreciation
  // ==========================================
  const getDepreciationInfo = React.useCallback(() => {
    if (!selectedModel) return { monthlyRate: 0, label: t('stableDrop'), color: "text-gray-400" };
    
    const age = currentYear - selectedModel.releaseYear;
    
    let monthlyRate = 0.015; // Default 1.5%
    let label = t('stableDrop');
    let color = "text-yellow-600";

    if (age <= 1) { 
        monthlyRate = 0.025; // New models drop fast (2.5%)
        label = t('fastDrop');
        color = "text-red-600";
    } else if (age >= 3) {
        monthlyRate = 0.010; // Old models drop slow (1.0%)
        label = t('slowDrop');
        color = "text-green-600";
    }

    return { monthlyRate, label, color };
  }, [selectedModel, t]);

  const calculateQuote = () => {
    if (!selectedModel) return 0;
    
    // 1. Base
    let price = selectedModel.baseRecyclePrice + selectedStorage.value;
    const baseForCalc = price;

    // 2. Condition Deduction
    price -= baseForCalc * selectedCondition.deductionPercent;

    // 3. Battery Deduction
    if (selectedBattery.type === 'percent') {
        price -= baseForCalc * selectedBattery.value;
    } else {
        price -= selectedModel.batteryPrice;
    }

    // 4. Screen Deduction
    if (isScreenBroken) price -= selectedModel.screenPrice;

    // 5. Time/Inventory Risk Deduction (Depreciation)
    const { monthlyRate } = getDepreciationInfo();
    // Formula: Price * (MonthlyRate / 30 * HoldDays)
    const depreciationAmount = price * (monthlyRate / 30 * holdDays);
    price -= depreciationAmount;

    return price < 10 ? 10 : Math.floor(price);
  };

  const finalQuote = calculateQuote();
  const basePrice = selectedModel ? (selectedModel.baseRecyclePrice + selectedStorage.value) : 0;
  const depInfo = getDepreciationInfo();
  
  // Calculate depreciation cost for display
  const calcDepreciationCost = () => {
      if (!selectedModel) return 0;
      // Rough estimate based on current price before depreciation
      const tempPrice = basePrice * (1 - selectedCondition.deductionPercent); 
      return Math.floor(tempPrice * (depInfo.monthlyRate / 30 * holdDays));
  };
  const depreciationCost = calcDepreciationCost();

  // Forecast next month price
  const nextMonthPrice = Math.floor(finalQuote * (1 - depInfo.monthlyRate));

  if (error) return (
    <div className="p-8 text-center">
      <div className="text-red-500 font-bold mb-2">Error loading data</div>
      <div className="text-sm text-slate-500">{error.message}</div>
      <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-slate-900 text-white rounded">Retry</button>
    </div>
  );

  if (isLoading && data.length === 0) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      <span className="ml-3 font-bold text-slate-500">Loading recycling data...</span>
    </div>
  );

  // If data loaded but empty
  if (!isLoading && data.length === 0) return (
    <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl m-4">
      <h3 className="text-lg font-bold text-slate-600">No Data Available</h3>
      <p className="text-slate-400 mt-2">The recycling database appears to be empty.</p>
      <p className="text-xs text-slate-400 mt-1">Please check the database connection or run seed script.</p>
    </div>
  );

  if (data.length > 0 && !selectedModel) {
      return (
         <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
          <span className="ml-3 font-bold text-slate-500">Initializing calculator...</span>
        </div>
      );
  }

  // Ensure selectedModel is not null for main render
  if (!selectedModel) {
    return (
      <div className="p-12 text-center text-red-500">
        Internal Error: State synchronization failed. Please refresh.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans text-slate-800 animate-in fade-in duration-500">
        
        <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Left Configuration Area */}
            <div className="lg:col-span-8 flex flex-col gap-4">
                
                {/* 1. Model */}
                <div className="bg-white/98 border border-black/5 shadow-sm p-6 rounded-xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4 relative z-10">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('configTitle')}</h3>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            {storageTiers.map((tier) => (
                                <button 
                                    key={tier.label} 
                                    onClick={() => setSelectedStorage(tier)} 
                                    className={cn(
                                        "px-3 py-1 text-xs font-bold rounded-md transition-all",
                                        selectedStorage.value === tier.value ? 'bg-white text-black shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                    )}
                                >
                                    {tier.label.split('/')[0]}
                                </button>
                            ))}
                        </div>
                    </div>
                    <select 
                        className="w-full p-3 text-xl font-bold bg-white border border-slate-200 rounded-xl outline-none appearance-none relative z-10" 
                        onChange={(e) => {
                            const model = data.find(m => m.model === e.target.value);
                            if(model) setSelectedModel(model);
                        }} 
                        value={selectedModel?.model || ''}
                    >
                        {data.map(m => <option key={m.model} value={m.model}>{m.model}</option>)}
                    </select>
                    
                    {/* Trend Label */}
                    <div className={cn(
                        "absolute top-0 right-0 px-4 py-2 text-[10px] font-bold uppercase rounded-bl-xl z-0 bg-opacity-10",
                        depInfo.color.replace('text', 'bg'),
                        depInfo.color
                    )}>
                        {t('marketTrend')}: {depInfo.label} (-{(depInfo.monthlyRate*100).toFixed(1)}%/mo)
                    </div>
                </div>

                {/* 4. Risk Control (New Core Feature) */}
                <div className="bg-white/98 border border-black/5 shadow-sm p-6 rounded-xl border-l-4 border-l-slate-800">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                        <ShieldAlert className="mr-2 h-4 w-4" /> {t('riskTitle')}
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-slate-700">{t('holdPeriod')}</label>
                            <span className="text-2xl font-bold text-slate-900">{holdDays} <span className="text-xs font-normal text-slate-500">{t('days')}</span></span>
                        </div>
                        
                        <input 
                            type="range" min="0" max="60" step="1" 
                            value={holdDays}
                            onChange={(e) => setHoldDays(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                        />
                        
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                            <span>0 {t('days')} (Quick)</span>
                            <span>30 {t('days')}</span>
                            <span>60 {t('days')} (Slow)</span>
                        </div>

                        {depreciationCost > 0 && (
                            <div className="bg-slate-100 p-3 rounded-lg flex justify-between items-center text-xs">
                                <span className="text-slate-500 flex items-center"><AlertTriangle className="mr-1 h-3 w-3" /> {t('depreciationLoss')}</span>
                                <span className="font-bold text-red-600">- €{depreciationCost}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Battery */}
                <div className="bg-slate-50 border border-slate-200 shadow-sm p-6 rounded-xl">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t('batteryTitle')}</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {batteryLevels.map((level, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => setSelectedBattery(level)} 
                                className={cn(
                                    "p-2 rounded-lg border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center",
                                    selectedBattery?.label === level.label ? 'border-slate-900 bg-white shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                                )}
                            >
                                <div className="font-bold text-xs mb-1">{level.label}</div>
                                <div className={cn(
                                    "text-[10px] font-mono font-bold",
                                    level.value === 0 ? 'text-green-600' : 'text-red-500'
                                )}>
                                    {level.value === 0 ? 'OK' : level.type === 'fixed' ? 'Rep.' : `-${level.value*100}%`}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Condition & Screen */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/98 border border-black/5 shadow-sm p-6 rounded-xl">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('conditionTitle')}</h3>
                        <div className="space-y-2">
                            {conditionGrades.map((grade) => (
                                <div 
                                    key={grade.id} 
                                    onClick={() => setSelectedCondition(grade)} 
                                    className={cn(
                                        "flex justify-between p-3 rounded-lg border cursor-pointer transition-all",
                                        selectedCondition?.id === grade.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-100 hover:bg-slate-50'
                                    )}
                                >
                                    <span className="text-sm font-bold">{grade.label}</span>
                                    <span className="text-xs opacity-70">{grade.deductionPercent === 0 ? 'OK' : `-${grade.deductionPercent*100}%`}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/98 border border-black/5 shadow-sm p-6 rounded-xl flex flex-col">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('screenTitle')}</h3>
                        <div 
                            onClick={() => setIsScreenBroken(!isScreenBroken)} 
                            className={cn(
                                "flex-1 rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center p-4 text-center transition-all",
                                isScreenBroken ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                            )}
                        >
                            <Smartphone className="h-8 w-8 mb-2" />
                            <div className="font-bold text-sm">{isScreenBroken ? t('screenBrokenYes') : t('screenBrokenQuestion')}</div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Right: Quote Panel */}
            <div className="lg:col-span-4 flex flex-col">
                <div className="bg-slate-900 text-white rounded-xl p-6 flex-1 flex flex-col relative overflow-hidden shadow-2xl sticky top-6">
                    
                    <div className="mt-2 text-center border-b border-white/10 pb-6 relative z-10">
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{t('finalPriceTitle')}</div>
                        <div className="flex items-center justify-center">
                            <span className="text-3xl font-bold mr-1 text-green-500">€</span>
                            <span className="text-7xl font-bold tracking-tighter leading-none">{finalQuote}</span>
                        </div>
                        {/* Forecast */}
                        <div className="mt-4 text-xs bg-white/5 rounded px-2 py-1 inline-block backdrop-blur-sm">
                            <span className="opacity-60 mr-2">{t('nextMonthPred')}:</span>
                            <span className="font-mono text-yellow-400 font-bold">€ {nextMonthPrice}</span>
                            <span className="ml-1 text-red-400 text-[10px] animate-pulse">↓</span>
                        </div>
                    </div>

                    <div className="space-y-3 mt-6 flex-1 text-sm relative z-10 overflow-y-auto max-h-[350px] scrollbar-hide">
                        <div className="flex justify-between opacity-70 py-1"><span>{t('basePrice')}</span><span className="font-mono">€ {basePrice}</span></div>
                        
                        {depreciationCost > 0 && (
                            <div className="flex justify-between text-red-300 py-1 border-b border-white/5 bg-red-900/20 px-1 -mx-1 rounded">
                                <span>- {t('depreciationLoss')} ({holdDays}d)</span>
                                <span className="font-mono">- {depreciationCost}</span>
                            </div>
                        )}
                        
                        {selectedBattery?.value > 0 && (
                            <div className="flex justify-between text-blue-300 py-1 border-b border-white/5">
                                <span>- {t('batteryLoss')} ({selectedBattery.type === 'fixed' ? 'Fix' : '%'})</span>
                                <span className="font-mono">- {selectedBattery.type === 'percent' ? Math.floor(basePrice*selectedBattery.value) : selectedModel.batteryPrice}</span>
                            </div>
                        )}
                        
                        {selectedCondition?.deductionPercent > 0 && (
                            <div className="flex justify-between text-yellow-300 py-1 border-b border-white/5">
                                <span>- {t('conditionLoss')} ({selectedCondition.id})</span>
                                <span className="font-mono">- {Math.floor(basePrice * selectedCondition.deductionPercent)}</span>
                            </div>
                        )}
                        
                        {isScreenBroken && (
                            <div className="flex justify-between text-red-400 py-1 border-b border-white/5">
                                <span>- {t('screenLoss')}</span>
                                <span className="font-mono">- {selectedModel.screenPrice}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto relative z-10 pt-4">
                        <button className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 flex items-center justify-center gap-2 group transition-all">
                            <span className="group-hover:hidden">{t('confirmDeal')}</span>
                            <span className="hidden group-hover:inline flex items-center gap-2">
                                <Printer className="h-5 w-5" /> {t('printReceipt')}
                            </span>
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}
