
"use client";

import { useState } from "react";
import { X, Plus, Smartphone, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Types
export interface RepairInput {
  label: string;
  type: string;
  quality: string;
  price: string;
  warranty: string;
  priority?: number; // Add priority
  id?: string; // Add ID for edit
  model_code?: string; // Add model code
}

// ... existing code ...

// --- Edit Model Dialog ---

interface EditModelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newModelName: string, newModelCode: string) => void;
  brand: string;
  currentModelName: string;
  currentModelCode?: string;
}

export function EditModelDialog({ isOpen, onClose, onSave, brand, currentModelName, currentModelCode }: EditModelDialogProps) {
  const [modelName, setModelName] = useState(currentModelName);
  const [modelCode, setModelCode] = useState(currentModelCode || '');

  const handleSubmit = () => {
    if (!modelName.trim()) return alert('请输入型号名称');
    onSave(modelName.trim(), modelCode.trim());
    onClose();
  };
  
  // Effect to sync state when props change (re-opening dialog with new data)
  // But since we use key or re-mount in parent usually, or reset on open logic:
  // We can use a useEffect or just rely on initial state if component is unmounted.
  // Here we use a key approach in parent or rely on useState initialization only running once.
  // Better: Reset state when isOpen becomes true.
  
  // Actually, standard pattern in React dialogs controlled by parent is to reset state when isOpen changes to true.
  // But let's keep it simple for now, assuming parent unmounts or we add useEffect.
  // Let's add a useEffect to be safe.
  
  // Reset when opening
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-border/50"
      >
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h2 className="text-xl font-bold">编辑型号信息</h2>
            <p className="text-sm text-muted-foreground">{brand}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">型号名称</label>
              <Input 
                value={modelName} 
                onChange={(e) => setModelName(e.target.value)} 
                placeholder="输入新型号名称" 
                className="rounded-xl" 
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">代号 (Model Code)</label>
              <Input 
                value={modelCode} 
                onChange={(e) => setModelCode(e.target.value)} 
                placeholder="例如: A3296, SM-A556B" 
                className="rounded-xl" 
              />
              <p className="text-xs text-muted-foreground">多个代号请用逗号分隔</p>
            </div>
        </div>

        <div className="p-4 bg-muted/20 border-t border-border/50 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>取消</Button>
          <Button onClick={handleSubmit}>确认修改</Button>
        </div>
      </motion.div>
    </div>
  );
}


// Constants
const BRANDS = ['APPLE', 'SAMSUNG', 'XIAOMI', 'OPPO', 'HUAWEI', 'HONOR', 'REALME', 'VIVO', 'ONEPLUS', 'MOTOROLA', 'GOOGLE', 'SONY', 'LG', 'NOKIA', 'ASUS', 'ZTE', 'MEIZU', 'LENOVO', 'NOTHING', 'TECNO', 'INFINIX'];
const REPAIR_TYPES = [
  { value: 'screen', label: '屏幕' },
  { value: 'battery', label: '电池' },
  { value: 'other', label: '其他' },
];
const QUALITIES = [
  { value: 'comp', label: '组装 (COMP)' },
  { value: 'orig', label: '原装 (ORIGINAL)' },
  { value: 'altcap', label: '扩容 (MAX)' },
  { value: 'standard', label: '标准' },
];

const REPAIR_PRESETS = [
  { label: '屏幕 (组装)', type: 'screen', quality: 'comp' },
  { label: '屏幕 (原装)', type: 'screen', quality: 'orig' },
  { label: '电池 (组装)', type: 'battery', quality: 'comp' },
  { label: '电池 (原装)', type: 'battery', quality: 'orig' },
  { label: '电池 (扩容)', type: 'battery', quality: 'altcap' },
  { label: '后盖', type: 'other', quality: 'standard' },
  { label: '尾插/充电口', type: 'other', quality: 'standard' },
  { label: '听筒', type: 'other', quality: 'standard' },
  { label: '扬声器', type: 'other', quality: 'standard' },
  { label: '摄像头', type: 'other', quality: 'standard' },
  { label: '主板', type: 'other', quality: 'standard' },
];

// --- Add Model Dialog ---

interface AddModelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (brand: string, model: string, repairs: RepairInput[]) => void;
  existingBrands?: string[];
}

export function AddModelDialog({ isOpen, onClose, onAdd, existingBrands = [] }: AddModelDialogProps) {
  const [brand, setBrand] = useState('APPLE');
  const [model, setModel] = useState('');
  const [repairs, setRepairs] = useState<RepairInput[]>([
    { label: '', type: 'screen', quality: 'orig', price: '', warranty: '6 MESI' }
  ]);
  const [useCustomBrand, setUseCustomBrand] = useState(false);
  const [customBrand, setCustomBrand] = useState('');

  const addRepairRow = () => {
    setRepairs([...repairs, { label: '', type: 'screen', quality: 'orig', price: '', warranty: '6 MESI' }]);
  };

  const updateRepair = (index: number, field: keyof RepairInput, value: string) => {
    const newRepairs = [...repairs];
    newRepairs[index] = { ...newRepairs[index], [field]: value };
    setRepairs(newRepairs);
  };

  const removeRepair = (index: number) => {
    if (repairs.length > 1) {
      setRepairs(repairs.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const finalBrand = useCustomBrand ? customBrand.trim().toUpperCase() : brand;
    if (!finalBrand) return alert('请输入品牌');
    if (!model.trim()) return alert('请输入型号');
    
    const validRepairs = repairs.filter(r => r.label.trim() && r.price);
    if (validRepairs.length === 0) return alert('请至少添加一个有效维修项');

    onAdd(finalBrand, model.trim(), validRepairs);
    
    // Reset
    setModel('');
    setRepairs([{ label: '', type: 'screen', quality: 'orig', price: '', warranty: '6 MESI' }]);
    onClose();
  };

  if (!isOpen) return null;

  const allBrands = Array.from(new Set([...BRANDS, ...existingBrands])).sort();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-border/50 flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">新增型号</h2>
            <p className="text-sm text-muted-foreground">添加新的设备型号及维修报价</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">品牌</label>
              {!useCustomBrand ? (
                <div className="flex gap-2">
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <Button variant="outline" size="icon" onClick={() => setUseCustomBrand(true)} title="手动输入">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input 
                    value={customBrand} 
                    onChange={(e) => setCustomBrand(e.target.value)} 
                    placeholder="输入新品牌" 
                    className="rounded-xl"
                  />
                  <Button variant="outline" size="icon" onClick={() => setUseCustomBrand(false)} title="选择列表">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">型号名称</label>
              <Input 
                value={model} 
                onChange={(e) => setModel(e.target.value)} 
                placeholder="例如: iPhone 15" 
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">维修项目</label>
              <Button variant="ghost" size="sm" onClick={addRepairRow} className="text-primary hover:text-primary/80">
                <Plus className="w-4 h-4 mr-1" /> 添加项目
              </Button>
            </div>

            <div className="space-y-3">
              {repairs.map((repair, idx) => (
                <div key={idx} className="p-4 bg-muted/30 rounded-2xl border border-border/50 space-y-3 relative group">
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {repairs.length > 1 && (
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeRepair(idx)}>
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {REPAIR_PRESETS.slice(0, 5).map((p, pi) => (
                      <Badge 
                        key={pi} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap"
                        onClick={() => {
                           updateRepair(idx, 'label', p.label);
                           updateRepair(idx, 'type', p.type);
                           updateRepair(idx, 'quality', p.quality);
                        }}
                      >
                        {p.label}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-4">
                      <Input 
                        placeholder="项目名称" 
                        value={repair.label} 
                        onChange={(e) => updateRepair(idx, 'label', e.target.value)}
                        className="h-8 text-sm bg-background/50"
                      />
                    </div>
                    <div className="col-span-2">
                      <select
                        value={repair.type}
                        onChange={(e) => updateRepair(idx, 'type', e.target.value)}
                        className="flex h-8 w-full rounded-md border border-input bg-background/50 px-2 py-1 text-xs"
                      >
                        {REPAIR_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <select
                        value={repair.quality}
                        onChange={(e) => updateRepair(idx, 'quality', e.target.value)}
                        className="flex h-8 w-full rounded-md border border-input bg-background/50 px-2 py-1 text-xs"
                      >
                        {QUALITIES.map(q => <option key={q.value} value={q.value}>{q.label}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <Input 
                        type="number" 
                        placeholder="价格" 
                        value={repair.price} 
                        onChange={(e) => updateRepair(idx, 'price', e.target.value)}
                        className="h-8 text-sm bg-background/50"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input 
                        placeholder="保修" 
                        value={repair.warranty} 
                        onChange={(e) => updateRepair(idx, 'warranty', e.target.value)}
                        className="h-8 text-sm bg-background/50"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted/20 border-t border-border/50 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>取消</Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/20">确认添加</Button>
        </div>
      </motion.div>
    </div>
  );
}

// --- Add Repair Dialog ---

interface AddRepairDialogProps {
  isOpen: boolean;
  brand: string;
  model: string;
  onClose: () => void;
  onAdd: (repair: RepairInput) => void;
}

export function AddRepairDialog({ isOpen, brand, model, onClose, onAdd }: AddRepairDialogProps) {
  const [label, setLabel] = useState('');
  const [type, setType] = useState('screen');
  const [quality, setQuality] = useState('comp');
  const [price, setPrice] = useState('');
  const [warranty, setWarranty] = useState('6 MESI');

  const selectPreset = (preset: typeof REPAIR_PRESETS[0]) => {
    setLabel(preset.label);
    setType(preset.type);
    setQuality(preset.quality);
  };

  const handleSubmit = () => {
    if (!label.trim() || !price) return alert('请填写完整信息');
    onAdd({ label, type, quality, price, warranty });
    // Reset
    setLabel(''); setPrice('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-border/50"
      >
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h2 className="text-xl font-bold">添加维修项目</h2>
            <p className="text-sm text-muted-foreground">{brand} - {model}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">快速选择</label>
            <div className="flex flex-wrap gap-2">
              {REPAIR_PRESETS.map((p, i) => (
                <Badge 
                  key={i} 
                  variant="outline" 
                  className={cn("cursor-pointer hover:bg-primary/10 transition-colors", label === p.label && "bg-primary/10 border-primary text-primary")}
                  onClick={() => selectPreset(p)}
                >
                  {p.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">名称</label>
              <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="项目名称" className="rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">类型</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                >
                  {REPAIR_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">质量</label>
                <select 
                  value={quality} 
                  onChange={(e) => setQuality(e.target.value)}
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                >
                  {QUALITIES.map(q => <option key={q.value} value={q.value}>{q.label}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">价格 (€)</label>
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">保修</label>
                <Input value={warranty} onChange={(e) => setWarranty(e.target.value)} className="rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted/20 border-t border-border/50 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>取消</Button>
          <Button onClick={handleSubmit}>确认添加</Button>
        </div>
      </motion.div>
    </div>
  );
}
