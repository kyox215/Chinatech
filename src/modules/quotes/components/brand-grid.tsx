"use client";

import React from "react"

import { useState } from "react";
import { ChevronRight, ChevronDown, Package, AlertCircle, AlertTriangle, X, Smartphone, Watch, Tablet, Trash2, Edit3, Check, Plus } from "lucide-react";
import { ModelCard } from "./model-card";
import { getBrandInfo } from "../utils";
import type { ModelItem } from "../types";

// Extract series name from model
function getSeriesName(brand: string, model: string): string {
  const m = model.toUpperCase().trim();
  
  if (brand === 'APPLE') {
    if (m.includes('WATCH')) return 'Apple Watch';
    if (m.includes('IPAD')) return 'iPad';
    if (m.includes('SE')) return 'iPhone SE';
    return 'iPhone';
  }
  
  if (brand === 'SAMSUNG') {
    if (m.includes('NOTE')) return 'Galaxy Note';
    if (m.includes('FOLD')) return 'Galaxy Z Fold';
    if (m.includes('FLIP')) return 'Galaxy Z Flip';
    if (m.startsWith('S') || m.includes('GALAXY S')) return 'Galaxy S';
    if (m.startsWith('A') || m.includes('GALAXY A')) return 'Galaxy A';
    if (m.startsWith('M') || m.includes('GALAXY M')) return 'Galaxy M';
    if (m.startsWith('J') || m.includes('GALAXY J')) return 'Galaxy J';
    if (m.includes('TAB')) return 'Galaxy Tab';
    return 'Galaxy Other';
  }
  
  if (brand === 'XIAOMI') {
    if (m.includes('POCO')) return 'POCO';
    if (m.includes('REDMI NOTE')) return 'Redmi Note';
    if (m.includes('REDMI')) return 'Redmi';
    if (m.includes('MI ') || m.startsWith('MI')) return 'Mi';
    if (m.includes('MIX')) return 'Mi Mix';
    if (m.includes('PAD')) return 'Pad';
    return 'Other';
  }
  
  if (brand === 'OPPO') {
    if (m.includes('FIND')) return 'Find';
    if (m.includes('RENO')) return 'Reno';
    if (m.startsWith('A')) return 'A Series';
    if (m.startsWith('F')) return 'F Series';
    return 'Other';
  }
  
  if (brand === 'HUAWEI') {
    if (m.includes('MATE')) return 'Mate';
    if (m.includes('NOVA')) return 'Nova';
    if (m.startsWith('P')) return 'P Series';
    if (m.includes('Y')) return 'Y Series';
    return 'Other';
  }
  
  if (brand === 'HONOR') {
    if (m.includes('MAGIC')) return 'Magic';
    if (m.includes('X')) return 'X Series';
    if (m.includes('PLAY')) return 'Play';
    return 'Honor';
  }
  
  if (brand === 'REALME') {
    if (m.includes('GT')) return 'GT';
    if (m.includes('NARZO')) return 'Narzo';
    if (m.includes('C')) return 'C Series';
    return 'Number Series';
  }
  
  if (brand === 'VIVO') {
    if (m.includes('X')) return 'X Series';
    if (m.includes('V')) return 'V Series';
    if (m.includes('Y')) return 'Y Series';
    if (m.includes('IQOO')) return 'iQOO';
    return 'Other';
  }
  
  if (brand === 'ONEPLUS') {
    if (m.includes('NORD')) return 'Nord';
    if (m.includes('ACE')) return 'Ace';
    return 'OnePlus';
  }
  
  return 'Other';
}

// Get series icon
function getSeriesIcon(series: string) {
  const s = series.toUpperCase();
  if (s.includes('WATCH')) return Watch;
  if (s.includes('PAD') || s.includes('TAB')) return Tablet;
  return Smartphone;
}

// Group items by series
function groupBySeries(items: ModelItem[], brand: string): Record<string, ModelItem[]> {
  const groups: Record<string, ModelItem[]> = {};
  
  items.forEach(item => {
    const series = getSeriesName(brand, item.model);
    if (!groups[series]) {
      groups[series] = [];
    }
    groups[series].push(item);
  });
  
  // Sort items within each series by model number
  Object.values(groups).forEach(arr => {
    arr.sort((a, b) => {
      const numA = parseInt((a.model.match(/\d+/) || ['0'])[0]);
      const numB = parseInt((b.model.match(/\d+/) || ['0'])[0]);
      if (numA !== numB) return numA - numB;
      return a.model.localeCompare(b.model);
    });
  });
  
  return groups;
}

// Define series order for each brand
const seriesOrder: Record<string, string[]> = {
  'APPLE': ['iPhone', 'iPhone SE', 'iPad', 'Apple Watch'],
  'SAMSUNG': ['Galaxy S', 'Galaxy Note', 'Galaxy Z Fold', 'Galaxy Z Flip', 'Galaxy A', 'Galaxy M', 'Galaxy J', 'Galaxy Tab', 'Galaxy Other'],
  'XIAOMI': ['Mi', 'Mi Mix', 'Redmi Note', 'Redmi', 'POCO', 'Pad', 'Other'],
  'OPPO': ['Find', 'Reno', 'A Series', 'F Series', 'Other'],
  'HUAWEI': ['P Series', 'Mate', 'Nova', 'Y Series', 'Other'],
  'HONOR': ['Magic', 'Honor', 'X Series', 'Play'],
  'REALME': ['GT', 'Number Series', 'Narzo', 'C Series'],
  'VIVO': ['X Series', 'V Series', 'Y Series', 'iQOO', 'Other'],
  'ONEPLUS': ['OnePlus', 'Nord', 'Ace'],
};

interface BrandGridProps {
  groupedByBrand: Record<string, ModelItem[]>;
  sortedBrands: string[];
  isAuditMode: boolean;
  expandedCards: Set<string>;
  onRepairUpdate: (brand: string, model: string, rIdx: number, price: number, warranty: string) => void;
  onDeleteModel?: (brand: string, model: string) => void;
  onDeleteRepair?: (brand: string, model: string, repairId: string) => void;
  onDeleteBrand?: (brand: string) => void;
  onRenameModel?: (brand: string, oldModel: string, newModel: string) => void;
  onRenameBrand?: (oldBrand: string, newBrand: string) => void;
  onAddRepair?: (brand: string, model: string) => void;
  onAddBrand?: () => void;
}

// Brand color and gradient mapping
const brandStyles: Record<string, { bg: string; gradient: string; text: string }> = {
  'APPLE': { 
    bg: 'bg-gradient-to-br from-slate-900 to-slate-700', 
    gradient: 'from-slate-900 to-slate-700',
    text: 'text-white'
  },
  'SAMSUNG': { 
    bg: 'bg-gradient-to-br from-blue-700 to-blue-500', 
    gradient: 'from-blue-700 to-blue-500',
    text: 'text-white'
  },
  'XIAOMI': { 
    bg: 'bg-gradient-to-br from-orange-500 to-amber-400', 
    gradient: 'from-orange-500 to-amber-400',
    text: 'text-white'
  },
  'OPPO': { 
    bg: 'bg-gradient-to-br from-emerald-600 to-teal-400', 
    gradient: 'from-emerald-600 to-teal-400',
    text: 'text-white'
  },
  'HUAWEI': { 
    bg: 'bg-gradient-to-br from-red-600 to-rose-400', 
    gradient: 'from-red-600 to-rose-400',
    text: 'text-white'
  },
  'HONOR': { 
    bg: 'bg-gradient-to-br from-slate-800 to-slate-600', 
    gradient: 'from-slate-800 to-slate-600',
    text: 'text-white'
  },
  'REALME': { 
    bg: 'bg-gradient-to-br from-yellow-500 to-amber-300', 
    gradient: 'from-yellow-500 to-amber-300',
    text: 'text-slate-900'
  },
  'VIVO': { 
    bg: 'bg-gradient-to-br from-indigo-600 to-purple-400', 
    gradient: 'from-indigo-600 to-purple-400',
    text: 'text-white'
  },
  'ONEPLUS': { 
    bg: 'bg-gradient-to-br from-red-600 to-red-400', 
    gradient: 'from-red-600 to-red-400',
    text: 'text-white'
  },
};

const defaultStyle = { 
  bg: 'bg-gradient-to-br from-slate-500 to-slate-400', 
  gradient: 'from-slate-500 to-slate-400',
  text: 'text-white'
};

export function BrandGrid({ 
  groupedByBrand, 
  sortedBrands, 
  isAuditMode, 
  expandedCards,
  onRepairUpdate,
  onDeleteModel,
  onDeleteRepair,
  onDeleteBrand,
  onRenameModel,
  onRenameBrand,
  onAddRepair,
  onAddBrand
}: BrandGridProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [logoErrors, setLogoErrors] = useState<Set<string>>(new Set());
  const [expandedSeries, setExpandedSeries] = useState<Set<string>>(new Set());
  
  // Edit states
  const [editingBrand, setEditingBrand] = useState<string | null>(null);
  const [newBrandName, setNewBrandName] = useState('');

  const handleLogoError = (brand: string) => {
    setLogoErrors(prev => new Set(prev).add(brand));
  };

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(prev => prev === brand ? null : brand);
    // When selecting a new brand, keep all series collapsed by default
    if (brand !== selectedBrand) {
      setExpandedSeries(new Set());
    }
  };

  const toggleSeries = (brand: string, series: string) => {
    const key = `${brand}-${series}`;
    setExpandedSeries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleStartEditBrand = (brand: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingBrand(brand);
    setNewBrandName(brand);
  };

  const handleSaveBrandRename = (oldBrand: string) => {
    if (newBrandName.trim() && newBrandName.trim().toUpperCase() !== oldBrand && onRenameBrand) {
      onRenameBrand(oldBrand, newBrandName.trim().toUpperCase());
      if (selectedBrand === oldBrand) {
        setSelectedBrand(newBrandName.trim().toUpperCase());
      }
    }
    setEditingBrand(null);
    setNewBrandName('');
  };

  const handleCancelEditBrand = () => {
    setEditingBrand(null);
    setNewBrandName('');
  };

  // Render a brand card
  const renderBrandCard = (brand: string) => {
    const items = groupedByBrand[brand] || [];
    if (items.length === 0) return null;
    
    const brandInfo = getBrandInfo(brand);
    const style = brandStyles[brand] || defaultStyle;
    const totalModels = items.length;
    const totalRepairs = items.reduce((sum, item) => sum + (item.repairs?.length || 0), 0);
    const hasErrors = items.some(item => item.hasError);
    const hasWarnings = items.some(item => item.hasWarning);
    const isSelected = selectedBrand === brand;

    return (
      <button
        type="button"
        onClick={() => handleBrandClick(brand)}
        className={`
          relative cursor-pointer rounded-2xl p-5 transition-all duration-300 text-left w-full
          ${style.bg} ${style.text}
          ${isSelected 
            ? 'ring-4 ring-blue-400 ring-offset-2 scale-[1.02] shadow-xl' 
            : 'hover:scale-[1.02] hover:shadow-lg shadow-md'
          }
        `}
      >
        {/* Status badges */}
        {isAuditMode && (hasErrors || hasWarnings) && (
          <div className="absolute top-2 right-2">
            {hasErrors ? (
              <AlertCircle className="w-5 h-5 text-red-300 animate-pulse" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-yellow-300" />
            )}
          </div>
        )}

        {/* Brand Logo */}
        <div className="flex justify-center mb-3">
          {brandInfo.icon && !logoErrors.has(brand) ? (
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <img
                src={brandInfo.icon || "/placeholder.svg"}
                className="w-8 h-8 object-contain brightness-0 invert"
                alt={brand}
                onError={() => handleLogoError(brand)}
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl font-bold">{brand[0]}</span>
            </div>
          )}
        </div>

        {/* Brand Name */}
        <h3 className="text-center font-bold text-lg mb-1">{brand}</h3>

        {/* Stats */}
        <div className="flex items-center justify-center gap-1 text-sm opacity-80">
          <Package className="w-4 h-4" />
          <span>{totalModels} 型号</span>
        </div>
        <p className="text-center text-xs opacity-60 mt-1">
          {totalRepairs} 维修项
        </p>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 rotate-45" />
        )}
      </button>
    );
  };

  // Render expanded panel for a brand with series grouping
  const renderExpandedPanel = (brand: string) => {
    const items = groupedByBrand[brand] || [];
    const style = brandStyles[brand] || defaultStyle;
    const brandInfo = getBrandInfo(brand);
    const seriesGroups = groupBySeries(items, brand);
    
    // Sort series by predefined order
    const order = seriesOrder[brand] || [];
    const sortedSeries = Object.keys(seriesGroups).sort((a, b) => {
      const idxA = order.indexOf(a);
      const idxB = order.indexOf(b);
      if (idxA === -1 && idxB === -1) return a.localeCompare(b);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
    
    return (
      <div className="col-span-full bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-in slide-in-from-top-2 duration-300">
        {/* Panel Header */}
        <div className={`p-4 ${style.bg} ${style.text}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {brandInfo.icon && !logoErrors.has(brand) ? (
                <img
                  src={brandInfo.icon || "/placeholder.svg"}
                  className="w-6 h-6 object-contain brightness-0 invert"
                  alt={brand}
                />
              ) : (
                <span className="text-xl font-bold">{brand[0]}</span>
              )}
              {editingBrand === brand ? (
                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={e => setNewBrandName(e.target.value)}
                    className="px-2 py-1 rounded text-slate-800 font-bold text-lg w-32"
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSaveBrandRename(brand);
                      if (e.key === 'Escape') handleCancelEditBrand();
                    }}
                  />
                  <button onClick={() => handleSaveBrandRename(brand)} className="p-1 hover:bg-white/20 rounded">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={handleCancelEditBrand} className="p-1 hover:bg-white/20 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold">{brand}</h2>
                  {onRenameBrand && (
                    <button
                      onClick={(e) => handleStartEditBrand(brand, e)}
                      className="p-1 hover:bg-white/20 rounded opacity-60 hover:opacity-100 transition"
                      title="重命名品牌"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}
              <span className="text-sm opacity-80">
                {sortedSeries.length} 系列 / {items.length} 型号
              </span>
            </div>
            <div className="flex items-center gap-2">
              {onDeleteBrand && (
                <button 
                  onClick={() => {
                    if (confirm(`确定要删除 ${brand} 品牌的所有数据吗？此操作不可撤销！`)) {
                      onDeleteBrand(brand);
                      setSelectedBrand(null);
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-red-500/20 transition text-white/70 hover:text-white"
                  title="删除此品牌所有数据"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              <button 
                onClick={() => setSelectedBrand(null)}
                className="p-2 rounded-lg hover:bg-white/20 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Series Groups */}
        <div className="p-4 space-y-4">
          {sortedSeries.map(series => {
            const seriesItems = seriesGroups[series];
            const SeriesIcon = getSeriesIcon(series);
            const isSeriesExpanded = expandedSeries.has(`${brand}-${series}`);
            
            return (
              <div key={series} className="border border-slate-200 rounded-xl overflow-hidden">
                {/* Series Header */}
                <button
                  type="button"
                  onClick={() => toggleSeries(brand, series)}
                  className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center`}>
                      <SeriesIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-slate-700">{series}</span>
                    <span className="text-sm text-slate-500">({seriesItems.length} 型号)</span>
                  </div>
                  {isSeriesExpanded ? (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                
                {/* Series Models */}
                {isSeriesExpanded && (
                  <div className="p-3 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {seriesItems.map((item, idx) => (
<ModelCard
  key={`${item.brand}-${item.model}`}
  item={item}
  mIdx={idx}
  isAuditMode={isAuditMode}
  onRepairUpdate={(mIdx, rIdx, price, warranty) => {
    onRepairUpdate(item.brand, item.model, rIdx, price, warranty);
  }}
  onDeleteModel={onDeleteModel}
  onDeleteRepair={onDeleteRepair}
  onRenameModel={onRenameModel}
  onAddRepair={onAddRepair}
  expanded={expandedCards.has(`${item.brand}-${item.model}`)}
/>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Brand Grid with inline expanded panels */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sortedBrands.map((brand) => {
          const items = groupedByBrand[brand] || [];
          if (items.length === 0) return null;
          
          const isSelected = selectedBrand === brand;
          
          return (
            <div key={brand} className="contents">
              {/* Brand Card */}
              {renderBrandCard(brand)}
              
              {/* Expanded Panel - immediately after this brand card */}
              {isSelected && renderExpandedPanel(brand)}
            </div>
          );
        })}
        
        {/* Add Brand Button */}
        {onAddBrand && (
          <button
            type="button"
            onClick={onAddBrand}
            className="relative cursor-pointer rounded-2xl p-5 transition-all duration-300 text-left w-full border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 bg-slate-50 flex flex-col items-center justify-center min-h-[160px]"
          >
            <div className="w-14 h-14 rounded-xl bg-slate-200 flex items-center justify-center mb-3">
              <Plus className="w-8 h-8 text-slate-500" />
            </div>
            <span className="font-semibold text-slate-600">添加品牌</span>
          </button>
        )}
      </div>

      {/* Empty state when no brand selected */}
      {!selectedBrand && sortedBrands.length > 0 && (
        <div className="text-center py-8 text-slate-400">
          <ChevronRight className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>点击上方品牌卡片查看型号详情</p>
        </div>
      )}
    </div>
  );
}
