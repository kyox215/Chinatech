"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ModelCard } from "./model-card";
import { getBrandInfo } from "../utils";
import type { ModelItem } from "../types";

interface BrandGroupProps {
  brand: string;
  items: ModelItem[];
  expandedCards: Set<string>;
  onRepairUpdate: (brand: string, model: string, rIdx: number, price: number, warranty: string) => void;
  onDeleteModel?: (brand: string, model: string) => void;
  onDeleteRepair?: (brand: string, model: string, repairId: string) => void;
  onDeleteBrand?: (brand: string) => void;
  onRenameModel?: (brand: string, oldModel: string, newModel: string) => void;
  onRenameBrand?: (oldBrand: string, newBrand: string) => void;
  onAddRepair?: (brand: string, model: string) => void;
}

export function BrandGroup({ 
  brand, 
  items, 
  expandedCards,
  onRepairUpdate,
  onDeleteModel,
  onDeleteRepair,
  onDeleteBrand,
  onRenameModel,
  onRenameBrand,
  onAddRepair
}: BrandGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [logoError, setLogoError] = useState(false);
  
  const brandInfo = getBrandInfo(brand);
  
  // Count stats
  const totalModels = items.length;
  const totalRepairs = items.reduce((sum, item) => sum + (item.repairs?.length || 0), 0);

  // Brand color mapping
  const brandColors: Record<string, string> = {
    'APPLE': 'bg-black',
    'SAMSUNG': 'bg-blue-700',
    'XIAOMI': 'bg-orange-500',
    'OPPO': 'bg-emerald-600',
    'HUAWEI': 'bg-red-600',
    'HONOR': 'bg-slate-800',
    'REALME': 'bg-yellow-500',
    'VIVO': 'bg-indigo-500',
    'ONEPLUS': 'bg-red-500',
  };

  const bgColor = brandColors[brand] || 'bg-slate-500';

  return (
    <div className="mb-6">
      {/* Brand Header */}
      <div 
        className={`flex items-center justify-between p-4 rounded-t-xl cursor-pointer transition-all ${bgColor} ${isExpanded ? '' : 'rounded-b-xl'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-white/80" />
          ) : (
            <ChevronRight className="w-5 h-5 text-white/80" />
          )}
          
          <div className="flex items-center gap-3">
            {brandInfo.icon && !logoError ? (
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <img
                  src={brandInfo.icon || "/placeholder.svg"}
                  className="w-6 h-6 object-contain brightness-0 invert"
                  alt={brand}
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-lg font-bold text-white">{brand[0]}</span>
              </div>
            )}
            
            <div>
              <h2 className="text-lg font-bold text-white">{brand}</h2>
              <p className="text-xs text-white/70">
                {totalModels} 型号 · {totalRepairs} 维修项目
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Audit status badges removed */}
        </div>
      </div>

      {/* Models List */}
      {isExpanded && (
        <div className="bg-slate-100 rounded-b-xl p-4 space-y-3">
          {items.map((item, idx) => (
            <ModelCard
              key={`${item.brand}-${item.model}`}
              item={item}
              mIdx={idx}
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
      )}
    </div>
  );
}
