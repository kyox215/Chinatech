"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Battery, AlertTriangle, ShieldAlert, ArrowRight, Printer } from 'lucide-react';
import { cn } from "@/lib/utils";
import { 
  PhoneModel, 
  currentYear, 
  initialCsvData, 
  parseCSV, 
  storageTiers 
} from './data';

export function RecycleCalculator() {
  const t = useTranslations("Recycling");
  
  // State
  const [data, setData] = React.useState<PhoneModel[]>([]);
  const [selectedModel, setSelectedModel] = React.useState<PhoneModel | null>(null);
  const [selectedStorage, setSelectedStorage] = React.useState(storageTiers[0]);
  const [isScreenBroken, setIsScreenBroken] = React.useState(false);
  const [holdDays, setHoldDays] = React.useState(7);
  
  // Options
  const conditionGrades = React.useMemo(() => [
    { id: 'A', label: t('cond_A'), deductionPercent: 0, color: "text-green-600", bg: "bg-green-50" },
    { id: 'B', label: t('cond_B'), deductionPercent: 0.05, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 'C', label: t('cond_C'), deductionPercent: 0.15, color: "text-orange-600", bg: "bg-orange-50" },
    { id: 'D', label: t('cond_D'), deductionPercent: 0.30, color: "text-red-600", bg: "bg-red-50" }
  ], [t]);

  const batteryLevels = React.useMemo(() => [
    { label: "98% - 100%", desc: t('bat_98'), type: 'percent', value: 0, color: "text-green-600" },
    { label: "90% - 97%", desc: t('bat_90'), type: 'percent', value: 0.03, color: "text-emerald-600" },
    { label: "85% - 89%", desc: t('bat_85'), type: 'percent', value: 0.06, color: "text-yellow-600" },
    { label: "80% - 84%", desc: t('bat_80'), type: 'percent', value: 0.10, color: "text-orange-600" },
    { label: "< 80% / Rep.", desc: t('bat_bad'), type: 'fixed', value: 1.0, color: "text-red-600" }
  ], [t]);

  const [selectedCondition, setSelectedCondition] = React.useState(conditionGrades[0]);
  const [selectedBattery, setSelectedBattery] = React.useState(batteryLevels[0]);

  // Initial Data Load
  React.useEffect(() => {
    const parsedData = parseCSV(initialCsvData);
    setData(parsedData);
    if(parsedData.length > 0) setSelectedModel(parsedData[0]);
  }, []);

  // Update selections when language changes
  React.useEffect(() => {
    // Re-find current selection in new language array by index or ID
    // For simplicity, reset to default if not found, or keep index
    const currentCondIndex = conditionGrades.findIndex(g => g.id === selectedCondition?.id);
    if (currentCondIndex !== -1) setSelectedCondition(conditionGrades[currentCondIndex]);

    const currentBatIndex = batteryLevels.findIndex(b => b.label === selectedBattery?.label);
    if (currentBatIndex !== -1) setSelectedBattery(batteryLevels[currentBatIndex]);
  }, [t, conditionGrades, batteryLevels]);


  // Logic
  const getDepreciationInfo = () => {
    if (!selectedModel) return { monthlyRate: 0, label: t('stableDrop'), color: "text-slate-400", bg: "bg-slate-100" };
    
    const age = currentYear - selectedModel.releaseYear;
    
    let monthlyRate = 0.015;
    let label = t('stableDrop');
    let color = "text-yellow-600";
    let bg = "bg-yellow-100";

    if (age <= 1) { 
        monthlyRate = 0.025; 
        label = t('fastDrop');
        color = "text-red-600";
        bg = "bg-red-100";
    } else if (age >= 3) {
        monthlyRate = 0.010; 
        label = t('slowDrop');
        color = "text-green-600";
        bg = "bg-green-100";
    }

    return { monthlyRate, label, color, bg };
  };

  const calculateQuote = () => {
    if (!selectedModel) return 0;
    
    // 1. Base
    let price = selectedModel.baseRecyclePrice + selectedStorage.value;
    const baseForCalc = price;

    // 2. Condition
    price -= baseForCalc * selectedCondition.deductionPercent;

    // 3. Battery
    if (selectedBattery.type === 'percent') {
        price -= baseForCalc * selectedBattery.value;
    } else {
        price -= selectedModel.batteryPrice;
    }

    // 4. Screen
    if (isScreenBroken) price -= selectedModel.screenPrice;

    // 5. Depreciation
    const { monthlyRate } = getDepreciationInfo();
    const depreciationAmount = price * (monthlyRate / 30 * holdDays);
    price -= depreciationAmount;

    return price < 10 ? 10 : Math.floor(price);
  };

  const finalQuote = calculateQuote();
  const basePrice = selectedModel ? (selectedModel.baseRecyclePrice + selectedStorage.value) : 0;
  const depInfo = getDepreciationInfo();

  const calcDepreciationCost = () => {
      if (!selectedModel) return 0;
      const tempPrice = basePrice * (1 - selectedCondition.deductionPercent); 
      return Math.floor(tempPrice * (depInfo.monthlyRate / 30 * holdDays));
  };
  const depreciationCost = calcDepreciationCost();
  const nextMonthPrice = Math.floor(finalQuote * (1 - depInfo.monthlyRate));

  if (!selectedModel) return <div>Loading...</div>;

  return (
    <div className="grid lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
      
      {/* LEFT COLUMN: Configuration */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* 1. Model & Storage */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('configTitle')}</CardTitle>
             <Badge variant="outline" className={`${depInfo.bg} ${depInfo.color} border-0 font-bold`}>
                {t('marketTrend')}: {depInfo.label} (-{(depInfo.monthlyRate*100).toFixed(1)}%/mo)
             </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-wrap gap-2 mb-2">
                {storageTiers.map((tier) => (
                    <button 
                        key={tier.label} 
                        onClick={() => setSelectedStorage(tier)} 
                        className={cn(
                            "px-4 py-2 text-sm font-bold rounded-lg transition-all border",
                            selectedStorage.value === tier.value 
                                ? "bg-slate-900 text-white border-slate-900 shadow-md transform scale-105" 
                                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                        )}
                    >
                        {tier.label.split('/')[0]}
                    </button>
                ))}
             </div>
             <select 
                className="w-full p-4 text-xl font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                onChange={(e) => {
                    const model = data.find(m => m.model === e.target.value);
                    if(model) setSelectedModel(model);
                }} 
                value={selectedModel.model}
             >
                {data.map(m => <option key={m.model} value={m.model}>{m.model}</option>)}
             </select>
          </CardContent>
        </Card>

        {/* 4. Risk Control */}
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-slate-800">
             <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" /> {t('riskTitle')}
                 </CardTitle>
             </CardHeader>
             <CardContent className="space-y-6">
                 <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-slate-700">{t('holdPeriod')}</label>
                    <span className="text-3xl font-bold text-slate-900 font-mono">{holdDays} <span className="text-xs font-sans font-normal text-slate-500">{t('days')}</span></span>
                 </div>
                 
                 <Slider 
                    defaultValue={[7]} 
                    max={60} 
                    step={1} 
                    value={[holdDays]}
                    onValueChange={(vals) => setHoldDays(vals[0])}
                    className="py-4"
                 />
                 
                 <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>0 {t('days')} (Quick)</span>
                    <span>30 {t('days')}</span>
                    <span>60 {t('days')} (Slow)</span>
                 </div>

                 {depreciationCost > 0 && (
                    <div className="bg-red-50 p-3 rounded-lg flex justify-between items-center text-sm border border-red-100">
                        <span className="text-red-600 font-medium flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" /> {t('depreciationLoss')}
                        </span>
                        <span className="font-bold text-red-700 font-mono">- €{depreciationCost}</span>
                    </div>
                 )}
             </CardContent>
        </Card>

        {/* 2. Battery */}
        <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('batteryTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {batteryLevels.map((level, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => setSelectedBattery(level)} 
                            className={cn(
                                "p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center h-24",
                                selectedBattery.label === level.label 
                                    ? "border-slate-900 bg-slate-50 shadow-sm" 
                                    : "border-slate-100 bg-white hover:border-slate-200"
                            )}
                        >
                            <div className="font-bold text-xs mb-1 text-slate-700">{level.label}</div>
                            <div className={cn("text-xs font-mono font-bold", level.color)}>
                                {level.value === 0 ? 'OK' : level.type === 'fixed' ? 'Rep.' : `-${level.value*100}%`}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* 3. Condition & Screen */}
        <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('conditionTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {conditionGrades.map((grade) => (
                        <div 
                            key={grade.id} 
                            onClick={() => setSelectedCondition(grade)} 
                            className={cn(
                                "flex justify-between items-center p-3 rounded-lg border cursor-pointer transition-all",
                                selectedCondition.id === grade.id 
                                    ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                                    : "bg-white border-slate-100 hover:bg-slate-50"
                            )}
                        >
                            <span className="text-sm font-bold">{grade.label}</span>
                            <span className={cn("text-xs font-mono", selectedCondition.id === grade.id ? "text-slate-300" : "text-slate-400")}>
                                {grade.deductionPercent === 0 ? 'OK' : `-${grade.deductionPercent*100}%`}
                            </span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm flex flex-col">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('screenTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex">
                    <div 
                        onClick={() => setIsScreenBroken(!isScreenBroken)} 
                        className={cn(
                            "flex-1 rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center p-6 text-center transition-all",
                            isScreenBroken 
                                ? "border-red-500 bg-red-50 text-red-700 shadow-inner" 
                                : "border-slate-200 bg-slate-50 text-slate-400 hover:bg-white hover:border-slate-300"
                        )}
                    >
                        <Smartphone className={cn("h-12 w-12 mb-3", isScreenBroken ? "text-red-500" : "text-slate-300")} />
                        <div className="font-bold text-sm">{isScreenBroken ? t('screenBrokenYes') : t('screenBrokenQuestion')}</div>
                        <div className="text-xs mt-1 opacity-70">{t('markScreenBroken')}</div>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>

      {/* RIGHT COLUMN: Quote */}
      <div className="lg:col-span-4 flex flex-col">
         <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-2xl flex flex-col h-full relative overflow-hidden sticky top-6">
            
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 text-center border-b border-white/10 pb-8 mb-6">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{t('finalPriceTitle')}</div>
                <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold mr-2 text-emerald-400">€</span>
                    <span className="text-8xl font-bold tracking-tighter leading-none">{finalQuote}</span>
                </div>
                
                <div className="mt-6 inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <span className="text-xs text-slate-300">{t('nextMonthPred')}:</span>
                    <span className="font-mono font-bold text-yellow-400">€ {nextMonthPrice}</span>
                    <span className="text-red-400 text-xs">↓</span>
                </div>
            </div>

            <div className="space-y-4 flex-1 text-sm relative z-10 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                <div className="flex justify-between text-slate-300 py-1">
                    <span>{t('basePrice')}</span>
                    <span className="font-mono">€ {basePrice}</span>
                </div>
                
                {depreciationCost > 0 && (
                    <div className="flex justify-between text-red-300 py-2 border-b border-white/5 bg-red-500/10 px-2 -mx-2 rounded">
                        <span>- {t('depreciationLoss')} ({holdDays}d)</span>
                        <span className="font-mono">- {depreciationCost}</span>
                    </div>
                )}
                
                {(selectedBattery.value > 0 || selectedBattery.type === 'fixed') && (
                    <div className="flex justify-between text-blue-300 py-1 border-b border-white/5">
                        <span>- {t('batteryLoss')} ({selectedBattery.type === 'fixed' ? 'Fix' : '%'})</span>
                        <span className="font-mono">- {selectedBattery.type === 'percent' ? Math.floor(basePrice * selectedBattery.value) : selectedModel.batteryPrice}</span>
                    </div>
                )}
                
                {selectedCondition.deductionPercent > 0 && (
                    <div className="flex justify-between text-yellow-300 py-1 border-b border-white/5">
                        <span>- {t('conditionLoss')} ({selectedCondition.id})</span>
                        <span className="font-mono">- {Math.floor(basePrice * selectedCondition.deductionPercent)}</span>
                    </div>
                )}
                
                {isScreenBroken && (
                    <div className="flex justify-between text-orange-300 py-1 border-b border-white/5">
                        <span>- {t('screenLoss')}</span>
                        <span className="font-mono">- {selectedModel.screenPrice}</span>
                    </div>
                )}
            </div>

            <div className="mt-8 relative z-10">
                <Button className="w-full h-14 text-lg font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 group transition-all">
                    <span className="group-hover:hidden">{t('confirmDeal')}</span>
                    <span className="hidden group-hover:flex items-center gap-2">
                        <Printer className="h-5 w-5" /> {t('printReceipt')}
                    </span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
         </div>
      </div>

    </div>
  );
}
