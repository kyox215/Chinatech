"use client";

import React from "react"

import { useRef } from "react";
import { Store, FolderOpen, FileOutput, Search, Loader2, Database, Plus, Settings } from "lucide-react";
import type { BrandType } from "../types";

interface HeaderProps {
  hasData: boolean;
  currentBrand: BrandType;
  searchQuery: string;
  isSaving?: boolean;
  isLoading?: boolean;
  uploadProgress?: number;
  onFileImport: (file: File) => void;
  onExport: () => void;
  onSave?: () => void;
  onAddModel?: () => void;
  onOpenBrandManager?: () => void;
  onBrandChange: (brand: BrandType) => void;
  onSearchChange: (query: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

const BRANDS: { key: BrandType; label: string; icon?: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'APPLE', label: 'Apple', icon: 'https://cdn.simpleicons.org/apple/000000' },
  { key: 'SAMSUNG', label: 'Samsung', icon: 'https://cdn.simpleicons.org/samsung/1428A0' },
  { key: 'XIAOMI', label: 'Xiaomi', icon: 'https://cdn.simpleicons.org/xiaomi/FF6900' },
  { key: 'OPPO', label: 'OPPO', icon: 'https://cdn.simpleicons.org/oppo/009B77' },
];

import { UnifiedImage } from "@/components/ui/unified-image";

export function Header({
  hasData,
  currentBrand,
  searchQuery,
  isSaving,
  isLoading,
  uploadProgress,
  onFileImport,
  onExport,
  onSave,
  onAddModel,
  onOpenBrandManager,
  onBrandChange,
  onSearchChange,
  onExpandAll,
  onCollapseAll,
}: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFileImport(e.target.files[0]);
    }
  };

  return (
    <header className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 sticky top-4 z-30">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        {/* Title & Status */}
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">ChinaTech 报价管理 v12.1</h1>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />
                  <p className="text-xs text-blue-500">加载中...</p>
                </>
              ) : isSaving ? (
                <>
                  <Loader2 className="w-3 h-3 text-amber-500 animate-spin" />
                  <p className="text-xs text-amber-500">
                    {uploadProgress !== undefined && uploadProgress > 0 
                      ? `导入中 ${uploadProgress}%...` 
                      : '保存中...'}
                  </p>
                </>
              ) : (
                <>
                  <Database className="w-3 h-3 text-green-500" />
                  <p className="text-xs text-slate-500">已连接 Supabase</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".csv,.json"
            onChange={handleFileChange}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition text-sm whitespace-nowrap"
          >
            <FolderOpen className="w-4 h-4" /> 导入 CSV
          </button>

          {onAddModel && (
            <button
              onClick={onAddModel}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-sm whitespace-nowrap shadow-lg shadow-blue-200"
            >
              <Plus className="w-4 h-4" /> 新增型号
            </button>
          )}

          {onOpenBrandManager && (
            <button
              onClick={onOpenBrandManager}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition text-sm whitespace-nowrap"
              title="品牌管理"
            >
              <Settings className="w-4 h-4" /> 管理
            </button>
          )}

          <div className="h-8 w-px bg-slate-200 mx-1" />

          {hasData && (
            <button
              onClick={onExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200 rounded-lg font-medium transition text-sm whitespace-nowrap"
            >
              <FileOutput className="w-4 h-4" /> 导出
            </button>
          )}
        </div>
      </div>

      {/* Filter & Stats */}
      {hasData && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Brands Filter */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 items-center">
            {BRANDS.map((brand) => (
              <button
                key={brand.key}
                onClick={() => onBrandChange(brand.key)}
                className={`group px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 h-9 border shadow-sm whitespace-nowrap ${
                  currentBrand === brand.key
                    ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-200 ring-offset-1'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {brand.icon && (
                  <UnifiedImage
                    src={brand.icon}
                    alt={brand.label}
                    width={16}
                    height={16}
                    containerClassName="w-4 h-4 border-none bg-transparent"
                    imageClassName={`transition-transform duration-300 group-hover:scale-110 ${currentBrand === brand.key ? 'brightness-0 invert' : ''}`}
                  />
                )}
                <span>{brand.label}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="搜索型号 (如 13 Pro)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={onExpandAll} className="text-xs text-blue-600 font-medium hover:underline">
                展开
              </button>
              <span className="text-slate-300">/</span>
              <button onClick={onCollapseAll} className="text-xs text-slate-500 font-medium hover:underline">
                收起
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
