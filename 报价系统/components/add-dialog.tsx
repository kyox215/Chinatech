"use client";

import { useState } from "react";
import { X, Plus, Smartphone } from "lucide-react";

interface AddModelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (brand: string, model: string, repairs: { label: string; type: string; quality: string; price: number; warranty: string }[]) => void;
}

const BRANDS = ['APPLE', 'SAMSUNG', 'XIAOMI', 'OPPO', 'HUAWEI', 'HONOR', 'REALME', 'VIVO', 'ONEPLUS', 'MOTOROLA', 'GOOGLE', 'SONY', 'LG', 'NOKIA', 'ASUS', 'ZTE', 'MEIZU', 'LENOVO', 'OTHER'];
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

// Common repair presets for quick add
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

export function AddModelDialog({ isOpen, onClose, onAdd }: AddModelDialogProps) {
  const [brand, setBrand] = useState('APPLE');
  const [model, setModel] = useState('');
  const [repairs, setRepairs] = useState<{ label: string; type: string; quality: string; price: string; warranty: string }[]>([
    { label: '', type: 'screen', quality: 'orig', price: '', warranty: '3 MESI' }
  ]);

  const addRepairRow = () => {
    setRepairs([...repairs, { label: '', type: 'screen', quality: 'orig', price: '', warranty: '3 MESI' }]);
  };

  const updateRepair = (index: number, field: string, value: string) => {
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
    if (!model.trim()) {
      alert('请输入型号名称');
      return;
    }
    
    const validRepairs = repairs.filter(r => r.label.trim() && r.price);
    if (validRepairs.length === 0) {
      alert('请至少添加一个维修项目');
      return;
    }

    onAdd(
      brand,
      model.trim(),
      validRepairs.map(r => ({
        label: r.label.trim(),
        type: r.type,
        quality: r.quality,
        price: parseFloat(r.price) || 0,
        warranty: r.warranty,
      }))
    );

    // Reset form
    setModel('');
    setRepairs([{ label: '', type: 'screen', quality: 'orig', price: '', warranty: '3 MESI' }]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6" />
            <h2 className="text-lg font-bold">新增型号</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Brand & Model */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">品牌</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              >
                {BRANDS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">型号名称</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="例如: iPhone 15 Pro Max"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              />
            </div>
          </div>

          {/* Repairs */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">维修项目</label>
              <button
                onClick={addRepairRow}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" /> 添加项目
              </button>
            </div>

            <div className="space-y-3">
              {repairs.map((repair, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="grid grid-cols-12 gap-2">
                    {/* Label */}
                    <div className="col-span-4">
                      <input
                        type="text"
                        value={repair.label}
                        onChange={(e) => updateRepair(index, 'label', e.target.value)}
                        placeholder="维修项目名称"
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      />
                    </div>
                    {/* Type */}
                    <div className="col-span-2">
                      <select
                        value={repair.type}
                        onChange={(e) => updateRepair(index, 'type', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      >
                        {REPAIR_TYPES.map(t => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                    {/* Quality */}
                    <div className="col-span-2">
                      <select
                        value={repair.quality}
                        onChange={(e) => updateRepair(index, 'quality', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      >
                        {QUALITIES.map(q => (
                          <option key={q.value} value={q.value}>{q.label}</option>
                        ))}
                      </select>
                    </div>
                    {/* Price */}
                    <div className="col-span-2">
                      <input
                        type="number"
                        step="0.01"
                        value={repair.price}
                        onChange={(e) => updateRepair(index, 'price', e.target.value)}
                        placeholder="价格 €"
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      />
                    </div>
                    {/* Warranty */}
                    <div className="col-span-1">
                      <input
                        type="text"
                        value={repair.warranty}
                        onChange={(e) => updateRepair(index, 'warranty', e.target.value)}
                        placeholder="保修"
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      />
                    </div>
                    {/* Delete */}
                    <div className="col-span-1 flex items-center justify-center">
                      {repairs.length > 1 && (
                        <button
                          onClick={() => removeRepair(index)}
                          className="p-1 text-slate-400 hover:text-red-500 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-200 transition"
          >
            确认添加
          </button>
        </div>
      </div>
    </div>
  );
}

// Add repair to existing model dialog
interface AddRepairDialogProps {
  isOpen: boolean;
  brand: string;
  model: string;
  onClose: () => void;
  onAdd: (repair: { label: string; type: string; quality: string; price: number; warranty: string }) => void;
}

export function AddRepairDialog({ isOpen, brand, model, onClose, onAdd }: AddRepairDialogProps) {
  const [label, setLabel] = useState('');
  const [type, setType] = useState('screen');
  const [quality, setQuality] = useState('comp');
  const [price, setPrice] = useState('');
  const [warranty, setWarranty] = useState('3 MESI');

  const selectPreset = (preset: typeof REPAIR_PRESETS[0]) => {
    setLabel(preset.label);
    setType(preset.type);
    setQuality(preset.quality);
  };

  const handleSubmit = () => {
    if (!label.trim()) {
      alert('请输入维修项目名称');
      return;
    }
    if (!price) {
      alert('请输入价格');
      return;
    }

    onAdd({
      label: label.trim(),
      type,
      quality,
      price: parseFloat(price) || 0,
      warranty,
    });

    // Reset form
    setLabel('');
    setType('screen');
    setQuality('comp');
    setPrice('');
    setWarranty('3 MESI');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div>
            <h2 className="text-lg font-bold">添加维修项目</h2>
            <p className="text-sm text-green-100">{brand} - {model}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Quick Presets */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">快速选择</label>
            <div className="flex flex-wrap gap-2">
              {REPAIR_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectPreset(preset)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition ${
                    label === preset.label 
                      ? 'bg-green-100 border-green-500 text-green-700' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-green-400 hover:text-green-600'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-200" />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">维修项目名称</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="例如: 屏幕 (组装)"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">类型</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              >
                {REPAIR_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">质量</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              >
                {QUALITIES.map(q => (
                  <option key={q.value} value={q.value}>{q.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">价格 (€)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">保修</label>
              <input
                type="text"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                placeholder="3 MESI"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-lg shadow-green-200 transition"
          >
            添加
          </button>
        </div>
      </div>
    </div>
  );
}

// Add Brand Dialog
interface AddBrandDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (brand: string, model: string, repairs: { label: string; type: string; quality: string; price: number; warranty: string }[]) => void;
  existingBrands: string[];
}

export function AddBrandDialog({ isOpen, onClose, onAdd, existingBrands }: AddBrandDialogProps) {
  const [brandName, setBrandName] = useState('');
  const [useExisting, setUseExisting] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [model, setModel] = useState('');
  const [repairs, setRepairs] = useState<{ label: string; type: string; quality: string; price: string; warranty: string }[]>([
    { label: '屏幕 (组装)', type: 'screen', quality: 'comp', price: '', warranty: '3 MESI' },
    { label: '电池 (组装)', type: 'battery', quality: 'comp', price: '', warranty: '3 MESI' }
  ]);

  const addRepairRow = () => {
    setRepairs([...repairs, { label: '', type: 'other', quality: 'standard', price: '', warranty: '3 MESI' }]);
  };

  const removeRepairRow = (index: number) => {
    if (repairs.length > 1) {
      setRepairs(repairs.filter((_, i) => i !== index));
    }
  };

  const updateRepair = (index: number, field: string, value: string) => {
    const newRepairs = [...repairs];
    newRepairs[index] = { ...newRepairs[index], [field]: value };
    setRepairs(newRepairs);
  };

  const selectPreset = (index: number, preset: typeof REPAIR_PRESETS[0]) => {
    const newRepairs = [...repairs];
    newRepairs[index] = { ...newRepairs[index], label: preset.label, type: preset.type, quality: preset.quality };
    setRepairs(newRepairs);
  };

  const handleSubmit = () => {
    const finalBrand = useExisting ? selectedBrand : brandName.trim().toUpperCase();
    
    if (!finalBrand) {
      alert('请输入或选择品牌名称');
      return;
    }
    if (!model.trim()) {
      alert('请输入型号');
      return;
    }

    const validRepairs = repairs.filter(r => r.label.trim() && r.price);
    if (validRepairs.length === 0) {
      alert('请至少添加一个有效的维修项目（名称和价格）');
      return;
    }

    onAdd(
      finalBrand,
      model.trim(),
      validRepairs.map(r => ({
        label: r.label.trim(),
        type: r.type,
        quality: r.quality,
        price: parseFloat(r.price) || 0,
        warranty: r.warranty,
      }))
    );

    // Reset form
    setBrandName('');
    setSelectedBrand('');
    setUseExisting(false);
    setModel('');
    setRepairs([
      { label: '屏幕 (组装)', type: 'screen', quality: 'comp', price: '', warranty: '3 MESI' },
      { label: '电池 (组装)', type: 'battery', quality: 'comp', price: '', warranty: '3 MESI' }
    ]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6" />
            <div>
              <h2 className="text-lg font-bold">添加品牌/型号</h2>
              <p className="text-sm text-indigo-100">创建新品牌或为现有品牌添加型号</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Brand Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">品牌</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!useExisting}
                  onChange={() => setUseExisting(false)}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="text-sm">新品牌</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={useExisting}
                  onChange={() => setUseExisting(true)}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="text-sm">选择已有品牌</span>
              </label>
            </div>
            
            {useExisting ? (
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
              >
                <option value="">选择品牌...</option>
                {[...new Set([...BRANDS, ...existingBrands])].sort().map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="输入新品牌名称（将自动转为大写）"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
              />
            )}
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">型号</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="例如: iPhone 15 Pro Max"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
            />
          </div>

          {/* Repairs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">维修项目</label>
              <button
                type="button"
                onClick={addRepairRow}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> 添加项目
              </button>
            </div>
            
            <div className="space-y-3">
              {repairs.map((repair, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg space-y-2">
                  {/* Quick Presets */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {REPAIR_PRESETS.slice(0, 6).map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => selectPreset(idx, preset)}
                        className={`px-2 py-1 text-xs rounded border transition ${
                          repair.label === preset.label 
                            ? 'bg-indigo-100 border-indigo-400 text-indigo-700' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-12 gap-2">
                    <input
                      type="text"
                      value={repair.label}
                      onChange={(e) => updateRepair(idx, 'label', e.target.value)}
                      placeholder="维修项目名称"
                      className="col-span-5 px-2 py-1.5 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-indigo-400 outline-none"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={repair.price}
                      onChange={(e) => updateRepair(idx, 'price', e.target.value)}
                      placeholder="价格 €"
                      className="col-span-3 px-2 py-1.5 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-indigo-400 outline-none"
                    />
                    <select
                      value={repair.quality}
                      onChange={(e) => updateRepair(idx, 'quality', e.target.value)}
                      className="col-span-3 px-2 py-1.5 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-indigo-400 outline-none"
                    >
                      {QUALITIES.map(q => (
                        <option key={q.value} value={q.value}>{q.label}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeRepairRow(idx)}
                      className="col-span-1 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg shadow-indigo-200 transition"
          >
            添加
          </button>
        </div>
      </div>
    </div>
  );
}
