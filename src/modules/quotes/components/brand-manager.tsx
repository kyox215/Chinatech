"use client";

import React from "react";

import { useState, useRef, useCallback } from "react";
import {
  X,
  Edit3,
  Trash2,
  Plus,
  Check,
  Upload,
  Palette,
  ChevronRight,
  Smartphone,
  Settings,
  Search,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Save,
} from "lucide-react";

// Predefined brand colors (official brand colors)
const BRAND_COLORS = [
  { name: "Apple Black", value: "#000000" },
  { name: "Samsung Blue", value: "#1428A0" },
  { name: "Xiaomi Orange", value: "#FF6900" },
  { name: "OPPO Green", value: "#009B77" },
  { name: "Huawei Red", value: "#FF0000" },
  { name: "Realme Yellow", value: "#FFC915" },
  { name: "Vivo Blue", value: "#415FFF" },
  { name: "OnePlus Red", value: "#F5010C" },
  { name: "Google Blue", value: "#4285F4" },
  { name: "Motorola Red", value: "#E1140A" },
  { name: "Nokia Blue", value: "#124191" },
  { name: "LG Red", value: "#A50034" },
  { name: "Sony Black", value: "#000000" },
  { name: "Lenovo Red", value: "#E2231A" },
  { name: "POCO Yellow", value: "#FFC915" },
  { name: "Infinix Orange", value: "#FF5100" },
  { name: "Slate", value: "#64748B" },
];

export interface BrandConfig {
  name: string;
  icon: string | null;
  color: string;
  series: string[];
}

interface BrandManagerProps {
  isOpen: boolean;
  onClose: () => void;
  brands: string[];
  onRenameBrand: (oldBrand: string, newBrand: string) => void;
  onDeleteBrand: (brand: string) => void;
  onAddBrand: (brand: string, model: string, repairs: { label: string; type: string; quality: string; price: number; warranty: string }[]) => void;
  onDeleteModel?: (brand: string, model: string) => void;
  onRenameModel?: (brand: string, oldModel: string, newModel: string) => void;
  onReorderBrands?: (newOrder: string[]) => void;
  groupedByBrand: Record<string, { model: string; brand: string }[]>;
}

export function BrandManager({
  isOpen,
  onClose,
  brands,
  onRenameBrand,
  onDeleteBrand,
  onAddBrand,
  onDeleteModel,
  onRenameModel,
  onReorderBrands,
  groupedByBrand,
}: BrandManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [editingBrand, setEditingBrand] = useState<string | null>(null);
  const [newBrandName, setNewBrandName] = useState("");
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: "", color: "#64748B" });
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [customColor, setCustomColor] = useState("#64748B");
  const [isSortMode, setIsSortMode] = useState(false);
  const [localBrandOrder, setLocalBrandOrder] = useState<string[]>(brands);
  
  // Model editing states
  const [editingModel, setEditingModel] = useState<string | null>(null);
  const [newModelName, setNewModelName] = useState("");
  
  // Custom logo storage (in localStorage)
  const [customLogos, setCustomLogos] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('brandCustomLogos');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  
  // Custom colors storage
  const [customColors, setCustomColors] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('brandCustomColors');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update local order when brands change
  React.useEffect(() => {
    // Merge new brands into local order
    const newBrands = brands.filter(b => !localBrandOrder.includes(b));
    if (newBrands.length > 0) {
      setLocalBrandOrder(prev => [...prev, ...newBrands]);
    }
    // Remove brands that no longer exist
    setLocalBrandOrder(prev => prev.filter(b => brands.includes(b)));
  }, [brands]);

  const filteredBrands = isSortMode 
    ? localBrandOrder.filter(b => brands.includes(b) && b.toLowerCase().includes(searchQuery.toLowerCase()))
    : brands.filter(b => b.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleStartEdit = (brand: string) => {
    setEditingBrand(brand);
    setNewBrandName(brand);
  };

  const handleSaveRename = (oldBrand: string) => {
    if (newBrandName.trim() && newBrandName.trim().toUpperCase() !== oldBrand) {
      onRenameBrand(oldBrand, newBrandName.trim().toUpperCase());
    }
    setEditingBrand(null);
    setNewBrandName("");
  };

  const handleDeleteBrand = (brand: string) => {
    if (confirm(`确定要删除品牌 "${brand}" 及其所有型号吗？此操作不可撤销。`)) {
      onDeleteBrand(brand);
      if (selectedBrand === brand) {
        setSelectedBrand(null);
      }
    }
  };

  const handleAddNewBrand = () => {
    if (!newBrand.name.trim()) {
      alert("请输入品牌名称");
      return;
    }
    const brandName = newBrand.name.trim().toUpperCase();
    // Save custom color
    if (newBrand.color !== "#64748B") {
      const newColors = { ...customColors, [brandName]: newBrand.color };
      setCustomColors(newColors);
      localStorage.setItem('brandCustomColors', JSON.stringify(newColors));
    }
    // Create a default model for the brand
    onAddBrand(
      brandName,
      "Default Model",
      [{ label: "屏幕 (组装)", type: "screen", quality: "comp", price: 0, warranty: "3 MESI" }]
    );
    setNewBrand({ name: "", color: "#64748B" });
    setShowAddBrand(false);
  };

  const handleColorSelect = (brand: string, color: string) => {
    const newColors = { ...customColors, [brand]: color };
    setCustomColors(newColors);
    localStorage.setItem('brandCustomColors', JSON.stringify(newColors));
    setShowColorPicker(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, brand: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newLogos = { ...customLogos, [brand]: reader.result as string };
        setCustomLogos(newLogos);
        localStorage.setItem('brandCustomLogos', JSON.stringify(newLogos));
      };
      reader.readAsDataURL(file);
    }
  };

  // Model operations
  const handleStartEditModel = (model: string) => {
    setEditingModel(model);
    setNewModelName(model);
  };

  const handleSaveModelRename = (brand: string, oldModel: string) => {
    if (newModelName.trim() && newModelName.trim() !== oldModel && onRenameModel) {
      onRenameModel(brand, oldModel, newModelName.trim());
    }
    setEditingModel(null);
    setNewModelName("");
  };

  const handleDeleteModel = (brand: string, model: string) => {
    if (confirm(`确定要删除型号 "${model}" 吗？此操作不可撤销。`)) {
      if (onDeleteModel) {
        onDeleteModel(brand, model);
      }
    }
  };

  // Sorting operations
  const moveBrand = (brand: string, direction: 'up' | 'down') => {
    const idx = localBrandOrder.indexOf(brand);
    if (idx === -1) return;
    
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= localBrandOrder.length) return;
    
    const newOrder = [...localBrandOrder];
    [newOrder[idx], newOrder[newIdx]] = [newOrder[newIdx], newOrder[idx]];
    setLocalBrandOrder(newOrder);
  };

  const saveOrder = () => {
    if (onReorderBrands) {
      onReorderBrands(localBrandOrder);
    }
    // Also save to localStorage
    localStorage.setItem('brandOrder', JSON.stringify(localBrandOrder));
    setIsSortMode(false);
  };

  // Get brand icon and color (check custom first, then defaults)
  const getBrandVisuals = (brand: string) => {
    const b = brand.toUpperCase();
    
    // Check custom logo first
    const customLogo = customLogos[b];
    const customColorVal = customColors[b];
    
    // Default visuals
    const defaults: Record<string, { icon: string; color: string }> = {
      "APPLE": { icon: "https://cdn.simpleicons.org/apple/000000", color: "#000000" },
      "SAMSUNG": { icon: "https://cdn.simpleicons.org/samsung/1428A0", color: "#1428A0" },
      "XIAOMI": { icon: "https://cdn.simpleicons.org/xiaomi/FF6900", color: "#FF6900" },
      "OPPO": { icon: "https://cdn.simpleicons.org/oppo/009B77", color: "#009B77" },
      "HUAWEI": { icon: "https://cdn.simpleicons.org/huawei/FF0000", color: "#FF0000" },
      "HONOR": { icon: "https://cdn.simpleicons.org/honor/000000", color: "#000000" },
      "REALME": { icon: "https://cdn.simpleicons.org/realme/FFC915", color: "#FFC915" },
      "VIVO": { icon: "https://cdn.simpleicons.org/vivo/415FFF", color: "#415FFF" },
      "ONEPLUS": { icon: "https://cdn.simpleicons.org/oneplus/F5010C", color: "#F5010C" },
      "GOOGLE": { icon: "https://cdn.simpleicons.org/google/4285F4", color: "#4285F4" },
      "MOTOROLA": { icon: "https://cdn.simpleicons.org/motorola/E1140A", color: "#E1140A" },
      "NOKIA": { icon: "https://cdn.simpleicons.org/nokia/124191", color: "#124191" },
      "SONY": { icon: "https://cdn.simpleicons.org/sony/000000", color: "#000000" },
      "LG": { icon: "https://cdn.simpleicons.org/lg/A50034", color: "#A50034" },
      "LENOVO": { icon: "https://cdn.simpleicons.org/lenovo/E2231A", color: "#E2231A" },
      "ASUS": { icon: "https://cdn.simpleicons.org/asus/000000", color: "#000000" },
      "ZTE": { icon: "https://cdn.simpleicons.org/zte/0057B8", color: "#0057B8" },
      "MEIZU": { icon: "https://cdn.simpleicons.org/meizu/000000", color: "#000000" },
      "NOTHING": { icon: "https://cdn.simpleicons.org/nothing/000000", color: "#000000" },
      "INFINIX": { icon: "https://cdn.simpleicons.org/infinix/FF5100", color: "#FF5100" },
      "TECNO": { icon: "https://cdn.simpleicons.org/tecno/0080FF", color: "#0080FF" },
      "REDMI": { icon: "https://cdn.simpleicons.org/xiaomi/FF6900", color: "#FF6900" },
      "POCO": { icon: "https://cdn.simpleicons.org/poco/FFC915", color: "#FFC915" },
    };
    
    const defaultVisuals = defaults[b] || { icon: null, color: "#64748B" };
    
    return {
      icon: customLogo || defaultVisuals.icon,
      color: customColorVal || defaultVisuals.color,
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">品牌管理</h2>
              <p className="text-sm text-slate-300">管理品牌排序、Logo、主题色和型号</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Brand List */}
          <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50">
            {/* Search & Sort Toggle */}
            <div className="p-4 border-b border-slate-200 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索品牌..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              
              {/* Sort Mode Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSortMode(!isSortMode)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isSortMode 
                      ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <GripVertical className="w-4 h-4" />
                  {isSortMode ? '排序模式' : '调整排序'}
                </button>
                {isSortMode && (
                  <button
                    onClick={saveOrder}
                    className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition"
                  >
                    <Save className="w-4 h-4" />
                    保存
                  </button>
                )}
              </div>
            </div>

            {/* Brand List */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredBrands.map((brand, index) => {
                const visuals = getBrandVisuals(brand);
                const models = groupedByBrand[brand] || [];
                const isSelected = selectedBrand === brand;

                return (
                  <div key={brand} className="flex items-center gap-1 mb-1">
                    {/* Sort Controls */}
                    {isSortMode && (
                      <div className="flex flex-col">
                        <button
                          onClick={() => moveBrand(brand, 'up')}
                          disabled={index === 0}
                          className={`p-1 rounded ${index === 0 ? 'opacity-30' : 'hover:bg-slate-200'}`}
                        >
                          <ArrowUp className="w-3 h-3 text-slate-500" />
                        </button>
                        <button
                          onClick={() => moveBrand(brand, 'down')}
                          disabled={index === filteredBrands.length - 1}
                          className={`p-1 rounded ${index === filteredBrands.length - 1 ? 'opacity-30' : 'hover:bg-slate-200'}`}
                        >
                          <ArrowDown className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>
                    )}
                    
                    <button
                      onClick={() => !isSortMode && setSelectedBrand(brand)}
                      className={`flex-1 flex items-center gap-3 p-3 rounded-xl transition text-left ${
                        isSelected
                          ? "bg-white shadow-md border border-slate-200"
                          : "hover:bg-white/50"
                      } ${isSortMode ? 'cursor-move' : ''}`}
                    >
                      {/* Brand Logo */}
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: visuals.color + "15" }}
                      >
                        {visuals.icon ? (
                          <img
                            src={visuals.icon || "/placeholder.svg"}
                            alt={brand}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-lg font-bold" style={{ color: visuals.color }}>
                            {brand[0]}
                          </span>
                        )}
                      </div>

                      {/* Brand Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-800 truncate">{brand}</div>
                        <div className="text-xs text-slate-500">{models.length} 型号</div>
                      </div>

                      {/* Color Indicator */}
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: visuals.color }} />

                      {!isSortMode && (
                        <ChevronRight className={`w-4 h-4 text-slate-400 transition ${isSelected ? "rotate-90" : ""}`} />
                      )}
                      
                      {isSortMode && <GripVertical className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>
                );
              })}

              {/* Add Brand Button */}
              {!isSortMode && (
                <button
                  onClick={() => setShowAddBrand(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl mt-2 border-2 border-dashed border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-600 hover:bg-white/50 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-medium">添加新品牌</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Panel - Brand Details */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {selectedBrand && !isSortMode ? (
              <>
                {/* Brand Header */}
                <div className="p-6 border-b border-slate-200 bg-white">
                  {(() => {
                    const visuals = getBrandVisuals(selectedBrand);
                    const models = groupedByBrand[selectedBrand] || [];

                    return (
                      <div className="flex items-start gap-4">
                        {/* Logo with Upload */}
                        <div
                          className="w-20 h-20 rounded-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden"
                          style={{ backgroundColor: visuals.color + "15" }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {visuals.icon ? (
                            <img
                              src={visuals.icon || "/placeholder.svg"}
                              alt={selectedBrand}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <span className="text-3xl font-bold" style={{ color: visuals.color }}>
                              {selectedBrand[0]}
                            </span>
                          )}
                          <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                            <Upload className="w-6 h-6 text-white" />
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, selectedBrand)}
                          />
                        </div>

                        {/* Brand Info */}
                        <div className="flex-1">
                          {editingBrand === selectedBrand ? (
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                type="text"
                                value={newBrandName}
                                onChange={(e) => setNewBrandName(e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg font-bold text-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleSaveRename(selectedBrand);
                                  if (e.key === "Escape") setEditingBrand(null);
                                }}
                              />
                              <button
                                onClick={() => handleSaveRename(selectedBrand)}
                                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingBrand(null)}
                                className="p-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-2xl font-bold text-slate-800">{selectedBrand}</h3>
                              <button
                                onClick={() => handleStartEdit(selectedBrand)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            </div>
                          )}

                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>{models.length} 型号</span>
                            <span>|</span>
                            <div className="flex items-center gap-2">
                              <span>主题色:</span>
                              <button
                                onClick={() => setShowColorPicker(showColorPicker === selectedBrand ? null : selectedBrand)}
                                className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                              >
                                <div
                                  className="w-4 h-4 rounded-full border border-slate-300"
                                  style={{ backgroundColor: visuals.color }}
                                />
                                <span className="font-mono text-xs">{visuals.color}</span>
                                <Palette className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Color Picker Dropdown */}
                          {showColorPicker === selectedBrand && (
                            <div className="absolute mt-2 p-3 bg-white rounded-xl shadow-xl border border-slate-200 z-10">
                              <div className="grid grid-cols-6 gap-2 mb-3">
                                {BRAND_COLORS.map((c) => (
                                  <button
                                    key={c.value}
                                    onClick={() => handleColorSelect(selectedBrand, c.value)}
                                    className="w-8 h-8 rounded-lg border-2 border-transparent hover:border-slate-400 transition"
                                    style={{ backgroundColor: c.value }}
                                    title={c.name}
                                  />
                                ))}
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={customColor}
                                  onChange={(e) => setCustomColor(e.target.value)}
                                  className="w-8 h-8 rounded cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={customColor}
                                  onChange={(e) => setCustomColor(e.target.value)}
                                  className="flex-1 px-2 py-1 text-sm font-mono border border-slate-300 rounded"
                                />
                                <button
                                  onClick={() => handleColorSelect(selectedBrand, customColor)}
                                  className="px-3 py-1 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 transition"
                                >
                                  应用
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteBrand(selectedBrand)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                            title="删除品牌"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Models List */}
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-700">型号列表 ({(groupedByBrand[selectedBrand] || []).length})</h4>
                  </div>

                  <div className="space-y-2">
                    {(groupedByBrand[selectedBrand] || []).map((item) => (
                      <div
                        key={item.model}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition"
                      >
                        <Smartphone className="w-5 h-5 text-slate-400" />
                        
                        {editingModel === item.model ? (
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={newModelName}
                              onChange={(e) => setNewModelName(e.target.value)}
                              className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveModelRename(selectedBrand, item.model);
                                if (e.key === "Escape") setEditingModel(null);
                              }}
                            />
                            <button
                              onClick={() => handleSaveModelRename(selectedBrand, item.model)}
                              className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setEditingModel(null)}
                              className="p-1 bg-slate-200 text-slate-600 rounded hover:bg-slate-300 transition"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="flex-1 font-medium text-slate-700">{item.model}</span>
                            <button 
                              onClick={() => handleStartEditModel(item.model)}
                              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteModel(selectedBrand, item.model)}
                              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    ))}

                    {(!groupedByBrand[selectedBrand] || groupedByBrand[selectedBrand].length === 0) && (
                      <div className="text-center py-8 text-slate-400">暂无型号</div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  {isSortMode ? (
                    <>
                      <GripVertical className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-medium text-slate-600">排序模式</p>
                      <p className="text-sm">使用左侧箭头调整品牌顺序</p>
                      <p className="text-sm mt-2">完成后点击「保存」按钮</p>
                    </>
                  ) : (
                    <>
                      <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>选择一个品牌进行管理</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Brand Modal */}
        {showAddBrand && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">添加新品牌</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">品牌名称</label>
                  <input
                    type="text"
                    value={newBrand.name}
                    onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                    placeholder="例如: GOOGLE"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">品牌颜色</label>
                  <div className="grid grid-cols-6 gap-2">
                    {BRAND_COLORS.slice(0, 12).map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setNewBrand({ ...newBrand, color: c.value })}
                        className={`w-8 h-8 rounded-lg border-2 transition ${
                          newBrand.color === c.value
                            ? "border-slate-800 scale-110"
                            : "border-transparent hover:border-slate-300"
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddBrand(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition"
                >
                  取消
                </button>
                <button
                  onClick={handleAddNewBrand}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition"
                >
                  添加
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
}
