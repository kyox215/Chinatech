"use client";

import React from "react"

import { useState, useEffect } from "react";
import { ChevronDown, Pen, Check, X, AlertCircle, XCircle, AlertTriangle, Trash2, Edit3, Plus } from "lucide-react";
import { getBrandInfo } from "../utils";
import type { ModelItem, Repair } from "../types";

interface ModelCardProps {
  item: ModelItem;
  mIdx: number;
  isAuditMode: boolean;
  onRepairUpdate: (mIdx: number, rIdx: number, price: number, warranty: string) => void;
  onDeleteModel?: (brand: string, model: string) => void;
  onDeleteRepair?: (brand: string, model: string, repairId: string) => void;
  onRenameModel?: (brand: string, oldModel: string, newModel: string) => void;
  onAddRepair?: (brand: string, model: string) => void;
  expanded?: boolean;
}

export function ModelCard({ item, mIdx, isAuditMode, onRepairUpdate, onDeleteModel, onDeleteRepair, onRenameModel, onAddRepair, expanded }: ModelCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editWarranty, setEditWarranty] = useState("");
  const [logoError, setLogoError] = useState(false);
  const [isRenamingModel, setIsRenamingModel] = useState(false);
  const [newModelName, setNewModelName] = useState(item.model);

  // Sync with external expanded prop
  useEffect(() => {
    if (expanded !== undefined) {
      setIsExpanded(expanded);
    }
  }, [expanded]);

  const brandInfo = getBrandInfo(item.brand);
  
  const hasScreenRepair = item.repairs.some(r => r.type === 'screen');
  const hasBatteryRepair = item.repairs.some(r => r.type === 'battery');

  let cardClass = `model-card bg-white rounded-lg border border-slate-200 overflow-hidden fade-in card-brand-${item.brand}`;
  if (isAuditMode && item.hasError) cardClass += " has-error";
  else if (isAuditMode && item.hasWarning) cardClass += " has-warning";

  const handleStartEdit = (rIdx: number, repair: Repair) => {
    setEditingIdx(rIdx);
    setEditPrice(String(repair.price));
    setEditWarranty(repair.warranty);
  };

  const handleSaveEdit = (rIdx: number) => {
    onRepairUpdate(mIdx, rIdx, parseFloat(editPrice), editWarranty);
    setEditingIdx(null);
  };

  const handleCancelEdit = () => {
    setEditingIdx(null);
  };

  const handleStartRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNewModelName(item.model);
    setIsRenamingModel(true);
  };

  const handleSaveRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (newModelName.trim() && newModelName !== item.model && onRenameModel) {
      onRenameModel(item.brand, item.model, newModelName.trim());
    }
    setIsRenamingModel(false);
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNewModelName(item.model);
    setIsRenamingModel(false);
  };

  return (
    <div className={cardClass}>
      <div
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            {brandInfo.icon && !logoError ? (
              <img
                src={brandInfo.icon || "/placeholder.svg"}
                className="brand-logo-img mr-2"
                alt={item.brand}
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-10 h-10 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-slate-500">{item.brand[0]}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg leading-none flex items-center gap-2">
              {isRenamingModel ? (
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                    className="px-2 py-1 border border-blue-300 rounded text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveRename(e as unknown as React.MouseEvent);
                      if (e.key === 'Escape') handleCancelRename(e as unknown as React.MouseEvent);
                    }}
                  />
                  <button onClick={handleSaveRename} className="text-green-500 hover:text-green-600">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={handleCancelRename} className="text-red-400 hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  {item.model}
                  {onRenameModel && (
                    <button
                      onClick={handleStartRename}
                      className="p-1 rounded text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition opacity-0 group-hover:opacity-100"
                      title="重命名型号"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </>
              )}
              {!isRenamingModel && hasScreenRepair && <span className="badge badge-screen ml-2">屏幕</span>}
              {!isRenamingModel && hasBatteryRepair && <span className="badge badge-battery ml-2">电池</span>}
              {!isRenamingModel && isAuditMode && item.hasError && (
                <AlertCircle className="w-4 h-4 text-red-500 ml-2 animate-pulse" />
              )}
            </h3>
            <span className="text-xs text-slate-400 font-mono">{item.brand}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onDeleteModel && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`确定要删除 ${item.model} 的所有维修数据吗？`)) {
                  onDeleteModel(item.brand, item.model);
                }
              }}
              className="p-1.5 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
              title="删除此型号"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <ChevronDown
            className={`w-5 h-5 text-slate-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-slate-100 bg-slate-50/50">
          {/* Add Repair Button */}
          {onAddRepair && (
            <div className="p-2 border-b border-slate-100 flex justify-end">
              <button
                onClick={() => onAddRepair(item.brand, item.model)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md font-medium transition"
              >
                <Plus className="w-4 h-4" /> 添加维修项目
              </button>
            </div>
          )}
          {item.repairs.length === 0 ? (
            <div className="p-4 text-center text-slate-400 text-sm">无维修项目</div>
          ) : (
            item.repairs.map((repair, rIdx) => (
              <RepairRow
                key={repair.id}
                repair={repair}
                isEditing={editingIdx === rIdx}
                isAuditMode={isAuditMode}
                editPrice={editPrice}
                editWarranty={editWarranty}
                onEditPriceChange={setEditPrice}
                onEditWarrantyChange={setEditWarranty}
                onStartEdit={() => handleStartEdit(rIdx, repair)}
                onSaveEdit={() => handleSaveEdit(rIdx)}
                onCancelEdit={handleCancelEdit}
                onDelete={onDeleteRepair ? () => onDeleteRepair(item.brand, item.model, repair.id) : undefined}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

interface RepairRowProps {
  repair: Repair;
  isEditing: boolean;
  isAuditMode: boolean;
  editPrice: string;
  editWarranty: string;
  onEditPriceChange: (val: string) => void;
  onEditWarrantyChange: (val: string) => void;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete?: () => void;
}

function RepairRow({
  repair,
  isEditing,
  isAuditMode,
  editPrice,
  editWarranty,
  onEditPriceChange,
  onEditWarrantyChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: RepairRowProps) {
  const renderQualityBadge = () => {
    if (repair.quality === 'orig') return <span className="tag-orig">Original</span>;
    if (repair.quality === 'comp') return <span className="tag-comp">Comp</span>;
    if (repair.quality === 'altcap') return <span className="tag-alt">Max</span>;
    return null;
  };

  const renderIssues = () => {
    if (!isAuditMode || !repair.issues || repair.issues.length === 0) return null;
    return repair.issues.map((issue, idx) => (
      <span
        key={idx}
        className={`error-tag ${issue.type === 'red' ? 'tag-red' : 'tag-yellow'}`}
      >
        {issue.type === 'red' ? <XCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
        {issue.msg}
      </span>
    ));
  };

  return (
    <div className="grid grid-cols-12 gap-2 p-3 border-b border-slate-100 last:border-0 items-center text-sm hover:bg-white transition group">
      <div className="col-span-5 font-medium text-slate-700 flex flex-wrap gap-2 items-center">
        {repair.label} {renderQualityBadge()} {renderIssues()}
      </div>
      <div className="col-span-3 text-right">
        {isEditing ? (
          <input
            type="number"
            step="0.5"
            className="edit-input text-right font-bold text-blue-600"
            value={editPrice}
            onChange={(e) => onEditPriceChange(e.target.value)}
          />
        ) : (
          <span className="font-bold text-blue-600 text-base">€ {parseFloat(String(repair.price)).toFixed(2)}</span>
        )}
      </div>
      <div className="col-span-3 text-right">
        {isEditing ? (
          <input
            type="text"
            className="edit-input text-right text-xs"
            value={editWarranty}
            onChange={(e) => onEditWarrantyChange(e.target.value)}
          />
        ) : (
          <span className="text-slate-500 text-xs">{repair.warranty}</span>
        )}
      </div>
      <div className="col-span-1 flex justify-center items-center gap-1">
        {isEditing ? (
          <>
            <button
              onClick={onSaveEdit}
              className="text-green-500 hover:text-green-600 transition"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={onCancelEdit}
              className="text-red-400 hover:text-red-500 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onStartEdit}
              className="text-slate-300 hover:text-blue-500 transition group-hover:text-slate-400"
            >
              <Pen className="w-4 h-4" />
            </button>
            {onDelete && (
              <button
                onClick={() => {
                  if (confirm('确定要删除此维修项目吗？')) {
                    onDelete();
                  }
                }}
                className="text-slate-300 hover:text-red-500 transition group-hover:text-slate-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
