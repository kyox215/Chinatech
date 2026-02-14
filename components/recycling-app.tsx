'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Battery, Smartphone, AlertTriangle, TrendingDown, Calendar, ArrowRight, Printer, ShieldAlert, ChevronUp, ChevronDown } from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

const currentYear = 2026;

interface IPhoneModel {
    id: string;
    model: string;
    screenPrice: number;
    batteryPrice: number;
    baseRecyclePrice: number;
    releaseYear: number;
}

const storageTiers = [
    { label: "64G", value: 0 },
    { label: "128G", value: 8 },
    { label: "256G", value: 15 },
    { label: "512G", value: 30 },
    { label: "1TB", value: 50 }
];

const conditionGrades = [
    { id: 'A', label: "完美充新", deductionPercent: 0, color: "text-green-600", desc: "无划痕，功能完美" },
    { id: 'B', label: "轻微使用", deductionPercent: 0.05, color: "text-blue-600", desc: "细微划痕，无磕碰" },
    { id: 'C', label: "明显磕碰", deductionPercent: 0.15, color: "text-orange-600", desc: "明显划痕或磕碰" },
    { id: 'D', label: "严重战损", deductionPercent: 0.30, color: "text-red-600", desc: "外壳变形或严重磨损" }
];

const batteryLevels = [
    { label: "98% - 100%", desc: "极品状态", type: 'percent', value: 0 },
    { label: "90% - 97%", desc: "轻微损耗", type: 'percent', value: 0.03 },
    { label: "85% - 89%", desc: "明显老化", type: 'percent', value: 0.06 },
    { label: "80% - 84%", desc: "严重老化", type: 'percent', value: 0.10 },
    { label: "< 80% / 维修", desc: "必需更换", type: 'fixed', value: 1.0 }
];

export function RecyclingApp({ setMainHeaderVisible }: { setMainHeaderVisible?: (visible: boolean) => void }) {
    const [data, setData] = React.useState<IPhoneModel[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedModel, setSelectedModel] = React.useState<IPhoneModel | null>(null);
    const [selectedStorage, setSelectedStorage] = React.useState(storageTiers[0]);
    const [selectedCondition, setSelectedCondition] = React.useState(conditionGrades[0]);
    const [selectedBattery, setSelectedBattery] = React.useState(batteryLevels[0]);
    const [screenCondition, setScreenCondition] = React.useState<'perfect' | 'minor_scratches' | 'major_scratches' | 'broken'>('perfect');
    const [holdDays, setHoldDays] = React.useState(7);
    const [showAppHeader, setShowAppHeader] = React.useState(true);
    const [isWidgetExpanded, setIsWidgetExpanded] = React.useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;
        const isTop = scrollTop <= 20;
        
        // Update local header state
        setShowAppHeader(isTop);
        
        // Update main header state if prop provided
        if (setMainHeaderVisible) {
            setMainHeaderVisible(isTop);
        }
    };

    React.useEffect(() => {
        async function fetchModels() {
            setLoading(true);
            const { data: models, error } = await supabase
                .from('recycling_models')
                .select('*')
                .order('release_year', { ascending: false });

            if (error) {
                console.error('Error fetching models:', error);
            } else if (models) {
                // Map DB columns to frontend interface (snake_case to camelCase)
                const formattedData: IPhoneModel[] = models.map((m: any) => ({
                    id: m.id,
                    model: m.model,
                    screenPrice: m.screen_price,
                    batteryPrice: m.battery_price,
                    baseRecyclePrice: m.base_recycle_price,
                    releaseYear: m.release_year
                }));
                setData(formattedData);
                if (formattedData.length > 0) setSelectedModel(formattedData[0]);
            }
            setLoading(false);
        }

        fetchModels();
    }, []);

    // ==========================================
    // 核心算法：时间贬值 (Depreciation Logic)
    // ==========================================
    const getDepreciationInfo = () => {
        if (!selectedModel) return { monthlyRate: 0, label: "稳定下跌", color: "text-muted-foreground", badgeVariant: "secondary" as const };
        
        const age = currentYear - selectedModel.releaseYear;
        
        let monthlyRate = 0.015; // Default 1.5%
        let label = "稳定下跌";
        let color = "text-yellow-600";
        let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary";

        if (age <= 1) { 
            monthlyRate = 0.025; // 新款掉价快 (2.5%)
            label = "高位跳水";
            color = "text-destructive";
            badgeVariant = "destructive";
        } else if (age >= 3) {
            monthlyRate = 0.010; // 老款掉价慢 (1.0%)
            label = "缓慢贬值";
            color = "text-green-600";
            badgeVariant = "outline";
        }

        return { monthlyRate, label, color, badgeVariant };
    };

    const calculateQuote = () => {
        if (!selectedModel) return 0;
        
        // 1. 基准
        let price = selectedModel.baseRecyclePrice + selectedStorage.value;
        const baseForCalc = price;

        // 2. 扣成色
        price -= baseForCalc * selectedCondition.deductionPercent;

        // 3. 扣电池
        if (selectedBattery.type === 'percent') {
            price -= baseForCalc * selectedBattery.value;
        } else {
            price -= selectedModel.batteryPrice;
        }

        // 4. 扣屏幕
        if (screenCondition === 'broken') {
            price -= selectedModel.screenPrice;
        } else if (screenCondition === 'major_scratches') {
            price -= selectedModel.screenPrice * 0.4; // 严重划痕扣除屏幕价值的40%
        } else if (screenCondition === 'minor_scratches') {
            price -= selectedModel.screenPrice * 0.15; // 轻微刮痕扣除屏幕价值的15%
        }

        // 5. 扣时间/库存风险 (Depreciation)
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

    return (
        <div className="flex flex-1 flex-col gap-4 pt-0 h-full overflow-hidden">
            <motion.header 
                className="flex items-center justify-between py-4 overflow-hidden"
                animate={{ 
                    height: showAppHeader ? "auto" : 0,
                    opacity: showAppHeader ? 1 : 0,
                    marginBottom: showAppHeader ? "1rem" : 0,
                    paddingTop: showAppHeader ? "1rem" : 0,
                    paddingBottom: showAppHeader ? "1rem" : 0
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">智能回收报价系统</h1>
                        <p className="text-sm text-muted-foreground">基于实时市场数据的智能估价与风控模型</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                     <Badge variant="outline" className="font-mono">{currentYear} 年度版</Badge>
                </div>
            </motion.header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full overflow-hidden">
                
                {/* 左侧配置区 (Left Column) */}
                <div 
                    className="lg:col-span-8 flex flex-col gap-3 lg:gap-6 overflow-y-auto pb-32 lg:pb-10 pr-2 h-full"
                    onScroll={handleScroll}
                >
                    
                    {/* 1. 机型配置 */}
                    <Card>
                        <CardHeader className="pb-2 p-3 lg:p-6">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm lg:text-base font-bold flex items-center gap-2">
                                    <Smartphone className="w-4 h-4" /> 1. 机型配置
                                </CardTitle>
                                {selectedModel && (
                                    <Badge variant={depInfo.badgeVariant} className="text-[10px] lg:text-xs px-1 py-0 h-5">
                                        {depInfo.label} (-{(depInfo.monthlyRate*100).toFixed(1)}%)
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 p-3 pt-0 lg:p-6 lg:pt-0">
                            <div className="space-y-1.5">
                                <Label className="text-xs lg:text-sm">选择机型</Label>
                                <Select 
                                    value={selectedModel?.model} 
                                    onValueChange={(val) => setSelectedModel(data.find(m => m.model === val) || null)}
                                >
                                    <SelectTrigger className="w-full text-base lg:text-lg font-medium h-10 lg:h-12">
                                        <SelectValue placeholder="请选择 iPhone 机型" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.map(m => (
                                            <SelectItem key={m.model} value={m.model}>{m.model}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs lg:text-sm">存储容量</Label>
                                <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                                    {storageTiers.map((tier) => (
                                        <Button
                                            key={tier.label}
                                            variant={selectedStorage.value === tier.value ? "default" : "outline"}
                                            size="sm"
                                            className={cn("w-full transition-all h-8 lg:h-10 text-xs lg:text-sm", selectedStorage.value === tier.value && "ring-2 ring-primary ring-offset-2")}
                                            onClick={() => setSelectedStorage(tier)}
                                        >
                                            {tier.label.split('/')[0]}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. 风险控制 (Risk Control) */}
                    <Card className="border-l-4 border-l-primary">
                        <CardHeader className="pb-2 p-3 lg:p-6">
                            <CardTitle className="text-sm lg:text-base font-bold flex items-center gap-2">
                                <TrendingDown className="w-4 h-4" /> 2. 库存风控
                            </CardTitle>
                            <CardDescription className="text-xs lg:text-sm hidden sm:block">
                                预计持有/周转天数。持有时间越长，跌价风险越高。
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-3 pt-0 lg:p-6 lg:pt-0">
                            <div className="flex justify-between items-center">
                                <Label className="text-xs lg:text-base">预计售出周期</Label>
                                <div className="text-lg lg:text-2xl font-bold font-mono">
                                    {holdDays} <span className="text-xs lg:text-sm font-normal text-muted-foreground">天</span>
                                </div>
                            </div>
                            
                            <Slider 
                                defaultValue={[7]} 
                                max={60} 
                                step={1} 
                                value={[holdDays]}
                                onValueChange={(val) => setHoldDays(val[0])}
                                className="py-2"
                            />
                            
                            <div className="flex justify-between text-[10px] lg:text-xs text-muted-foreground font-mono">
                                <span>0 天 (秒出)</span>
                                <span>30 天 (月转)</span>
                                <span>60 天 (滞销)</span>
                            </div>

                            {depreciationCost > 0 && (
                                <div className="bg-destructive/10 text-destructive p-2 lg:p-3 rounded-md flex justify-between items-center text-xs lg:text-sm">
                                    <span className="flex items-center gap-1"><ShieldAlert className="w-3 h-3 lg:w-4 lg:h-4"/> 库存风险预扣</span>
                                    <span className="font-bold font-mono">- ¥{depreciationCost}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* 3. 电池健康 */}
                    <Card>
                        <CardHeader className="pb-2 p-3 lg:p-6">
                            <CardTitle className="text-sm lg:text-base font-bold flex items-center gap-2">
                                <Battery className="w-4 h-4" /> 3. 电池健康度
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 lg:p-6 lg:pt-0">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3">
                                {batteryLevels.map((level, idx) => (
                                    <div 
                                        key={idx} 
                                        onClick={() => setSelectedBattery(level)} 
                                        className={cn(
                                            "cursor-pointer rounded-lg border p-2 lg:p-3 flex flex-col items-center justify-center text-center gap-0.5 lg:gap-1 transition-all hover:bg-muted/50 min-h-[4rem]",
                                            selectedBattery.label === level.label ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"
                                        )}
                                    >
                                        <div className="font-bold text-xs lg:text-sm break-words w-full">{level.label}</div>
                                        <div className="text-[10px] lg:text-xs text-muted-foreground scale-90 origin-center whitespace-nowrap">{level.desc}</div>
                                        <div className={cn("text-[10px] font-mono font-bold mt-0.5", level.value===0 ? "text-green-600":"text-destructive")}>
                                            {level.value===0 ? '无扣款' : level.type==='percent' ? `-${level.value*100}%` : '固定扣款'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 4. 外观与屏幕 */}
                    <div className="grid md:grid-cols-2 gap-3 lg:gap-6">
                        <Card>
                            <CardHeader className="pb-2 p-3 lg:p-6">
                                <CardTitle className="text-sm lg:text-base font-bold flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> 4. 外观成色
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 p-3 pt-0 lg:p-6 lg:pt-0">
                                <div className="grid grid-cols-2 gap-2">
                                {conditionGrades.map((grade) => (
                                    <div 
                                        key={grade.id} 
                                        onClick={() => setSelectedCondition(grade)} 
                                        className={cn(
                                            "flex flex-col justify-between p-2 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 min-h-[4.5rem]",
                                            selectedCondition.id === grade.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"
                                        )}
                                    >
                                        <div>
                                            <div className="flex justify-between items-start gap-1">
                                                <div className="font-bold text-xs lg:text-sm break-words">{grade.label}</div>
                                                <span className={cn("text-[10px] font-mono font-bold shrink-0", grade.deductionPercent===0 ? "text-green-600" : "text-destructive")}>
                                                    {grade.deductionPercent===0 ? 'OK' : `-${grade.deductionPercent*100}%`}
                                                </span>
                                            </div>
                                            <div className="text-[10px] lg:text-xs text-muted-foreground mt-1 line-clamp-2 leading-tight">{grade.desc}</div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2 p-3 lg:p-6">
                                <CardTitle className="text-sm lg:text-base font-bold flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-destructive" /> 5. 屏幕状况
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0 lg:p-6 lg:pt-0 pb-3 lg:pb-6">
                                <div className="grid grid-cols-2 gap-2">
                                    <div 
                                        onClick={() => setScreenCondition('perfect')}
                                        className={cn(
                                            "cursor-pointer rounded-lg border p-3 flex flex-col items-center justify-center text-center gap-1 transition-all hover:bg-muted/50 min-h-[3.5rem]",
                                            screenCondition === 'perfect' ? "border-green-500 bg-green-500/10 text-green-700 ring-1 ring-green-500" : "border-border opacity-80"
                                        )}
                                    >
                                        <div className="font-bold text-xs lg:text-sm">完美无瑕</div>
                                        <div className="text-[10px] opacity-80">无任何划痕</div>
                                    </div>
                                    <div 
                                        onClick={() => setScreenCondition('minor_scratches')}
                                        className={cn(
                                            "cursor-pointer rounded-lg border p-3 flex flex-col items-center justify-center text-center gap-1 transition-all hover:bg-muted/50 min-h-[3.5rem]",
                                            screenCondition === 'minor_scratches' ? "border-yellow-500 bg-yellow-500/10 text-yellow-700 ring-1 ring-yellow-500" : "border-border opacity-80"
                                        )}
                                    >
                                        <div className="font-bold text-xs lg:text-sm">轻微刮痕</div>
                                        <div className="text-[10px] opacity-80">特定角度可见</div>
                                    </div>
                                    <div 
                                        onClick={() => setScreenCondition('major_scratches')}
                                        className={cn(
                                            "cursor-pointer rounded-lg border p-3 flex flex-col items-center justify-center text-center gap-1 transition-all hover:bg-muted/50 min-h-[3.5rem]",
                                            screenCondition === 'major_scratches' ? "border-orange-500 bg-orange-500/10 text-orange-700 ring-1 ring-orange-500" : "border-border opacity-80"
                                        )}
                                    >
                                        <div className="font-bold text-xs lg:text-sm">严重划痕</div>
                                        <div className="text-[10px] opacity-80">亮屏可见/深划痕</div>
                                    </div>
                                    <div 
                                        onClick={() => setScreenCondition('broken')}
                                        className={cn(
                                            "cursor-pointer rounded-lg border p-3 flex flex-col items-center justify-center text-center gap-1 transition-all hover:bg-muted/50 min-h-[3.5rem]",
                                            screenCondition === 'broken' ? "border-destructive bg-destructive/10 text-destructive ring-1 ring-destructive" : "border-border opacity-80"
                                        )}
                                    >
                                        <div className="font-bold text-xs lg:text-sm">屏幕损坏</div>
                                        <div className="text-[10px] opacity-80">碎裂/漏液/断触</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>

                {/* 右侧报价单 (Desktop Only) */}
                <div className="hidden lg:block lg:col-span-4 h-full">
                    <Card className="h-auto sticky top-4 shadow-lg flex flex-col border-border/60">
                        <CardHeader className="pb-4 border-b bg-muted/10 text-center">
                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">最终安全收货价</CardTitle>
                            <div className="flex items-center justify-center text-green-600">
                                <span className="text-2xl font-bold mr-1">¥</span>
                                <span className="text-5xl font-bold tracking-tighter leading-none">{finalQuote}</span>
                            </div>
                            
                            <div className="mt-3 inline-flex items-center bg-muted/50 rounded-full px-2 py-0.5 text-xs border">
                                <span className="text-muted-foreground mr-2">下月预测:</span>
                                <span className="font-mono text-orange-600 font-bold">¥ {nextMonthPrice}</span>
                                <TrendingDown className="w-3 h-3 ml-1 text-red-500" />
                            </div>
                        </CardHeader>

                        <CardContent className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
                            <div className="flex justify-between text-muted-foreground py-1">
                                <span>基准回收价</span>
                                <span className="font-mono text-foreground font-medium">¥ {basePrice}</span>
                            </div>
                            
                            {depreciationCost > 0 && (
                                <div className="flex justify-between text-red-600 py-1 border-b border-dashed px-1 -mx-1 rounded bg-red-50/50">
                                    <span>库存风控 ({holdDays}天)</span>
                                    <span className="font-mono">- {depreciationCost}</span>
                                </div>
                            )}
                            
                            {selectedBattery.value > 0 && (
                                <div className="flex justify-between text-blue-600 py-1 border-b border-dashed border-border/60">
                                    <span>电池损耗 ({selectedBattery.type==='fixed'?'换电':'%'})</span>
                                    <span className="font-mono">- {selectedBattery.type==='percent' ? Math.floor(basePrice*selectedBattery.value) : selectedModel?.batteryPrice}</span>
                                </div>
                            )}
                            
                            {selectedCondition.deductionPercent > 0 && (
                                <div className="flex justify-between text-orange-600 py-1 border-b border-dashed border-border/60">
                                    <span>外观损耗 ({selectedCondition.id}级)</span>
                                    <span className="font-mono">- {Math.floor(basePrice * selectedCondition.deductionPercent)}</span>
                                </div>
                            )}
                            
                            {screenCondition !== 'perfect' && selectedModel && (
                                <div className="flex justify-between text-red-600 py-1 border-b border-dashed border-border/60">
                                    <span>
                                        {screenCondition === 'broken' && "屏幕损坏扣除"}
                                        {screenCondition === 'major_scratches' && "严重划痕扣除"}
                                        {screenCondition === 'minor_scratches' && "轻微刮痕扣除"}
                                    </span>
                                    <span className="font-mono">- {
                                        screenCondition === 'broken' ? selectedModel.screenPrice :
                                        screenCondition === 'major_scratches' ? Math.floor(selectedModel.screenPrice * 0.4) :
                                        Math.floor(selectedModel.screenPrice * 0.15)
                                    }</span>
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="p-4 bg-muted/5 pt-4 border-t">
                            <Button className="w-full h-11 text-base font-bold bg-green-600 hover:bg-green-500 text-white shadow-sm" size="default">
                                <span className="mr-2">确认成交</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

            </div>

            {/* Mobile Floating Widget */}
            <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className="bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl overflow-hidden">
                    {/* Collapsible Details */}
                    {isWidgetExpanded && (
                        <div className="p-4 space-y-2 text-xs border-b bg-muted/30 max-h-[40vh] overflow-y-auto animate-in slide-in-from-bottom-5">
                            <div className="flex justify-between text-muted-foreground py-1">
                                <span>基准回收价</span>
                                <span className="font-mono text-foreground font-medium">¥ {basePrice}</span>
                            </div>
                            
                            {depreciationCost > 0 && (
                                <div className="flex justify-between text-red-600 py-1 border-b border-dashed border-red-200">
                                    <span>库存风控 ({holdDays}天)</span>
                                    <span className="font-mono">- {depreciationCost}</span>
                                </div>
                            )}
                            
                            {selectedBattery.value > 0 && (
                                <div className="flex justify-between text-blue-600 py-1 border-b border-dashed border-blue-200">
                                    <span>电池损耗</span>
                                    <span className="font-mono">- {selectedBattery.type==='percent' ? Math.floor(basePrice*selectedBattery.value) : selectedModel?.batteryPrice}</span>
                                </div>
                            )}
                            
                            {selectedCondition.deductionPercent > 0 && (
                                <div className="flex justify-between text-orange-600 py-1 border-b border-dashed border-orange-200">
                                    <span>外观损耗 ({selectedCondition.id}级)</span>
                                    <span className="font-mono">- {Math.floor(basePrice * selectedCondition.deductionPercent)}</span>
                                </div>
                            )}
                            
                            {screenCondition !== 'perfect' && selectedModel && (
                                <div className="flex justify-between text-red-600 py-1 border-b border-dashed border-red-200">
                                    <span>
                                        {screenCondition === 'broken' && "屏幕损坏"}
                                        {screenCondition === 'major_scratches' && "严重划痕"}
                                        {screenCondition === 'minor_scratches' && "轻微刮痕"}
                                    </span>
                                    <span className="font-mono">- {
                                        screenCondition === 'broken' ? selectedModel.screenPrice :
                                        screenCondition === 'major_scratches' ? Math.floor(selectedModel.screenPrice * 0.4) :
                                        Math.floor(selectedModel.screenPrice * 0.15)
                                    }</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Main Bar */}
                    <div className="flex items-center justify-between p-3 pl-4">
                        <div className="flex flex-col gap-0.5" onClick={() => setIsWidgetExpanded(!isWidgetExpanded)}>
                            <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1">
                                最终报价
                                {isWidgetExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                            </div>
                            <div className="flex items-end gap-2">
                                <div className="flex items-baseline text-green-600">
                                    <span className="text-lg font-bold">¥</span>
                                    <span className="text-3xl font-extrabold tracking-tight leading-none">{finalQuote}</span>
                                </div>
                                <div className="text-[10px] text-muted-foreground mb-1 flex items-center bg-muted px-1.5 py-0.5 rounded-full">
                                    下月 ¥{nextMonthPrice} <TrendingDown className="w-2.5 h-2.5 ml-0.5 text-red-500" />
                                </div>
                            </div>
                        </div>
                        <Button className="h-10 rounded-xl px-6 bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20 font-bold">
                            成交 <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
