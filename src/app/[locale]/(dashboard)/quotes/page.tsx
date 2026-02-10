"use client";

import { useState, useCallback, useEffect } from "react";
import Papa from "papaparse";
import useSWR, { mutate } from "swr";
import { Header } from "@/modules/quotes/components/header";
import { BrandGrid } from "@/modules/quotes/components/brand-grid";
import { EmptyState } from "@/modules/quotes/components/empty-state";
import { AddModelDialog, AddRepairDialog, AddBrandDialog } from "@/modules/quotes/components/add-dialog";
import { BrandManager } from "@/modules/quotes/components/brand-manager";
import { processCSV, analyzeErrors, exportToCSV, convertToDbRecords, convertFromDbRecords } from "@/modules/quotes/utils";
import type { BrandType, ModelItem, QuoteRecord } from "@/modules/quotes/types";
import { PageShell } from "@/modules/shared/PageShell";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function QuoteManagementPage() {
  const [appData, setAppData] = useState<ModelItem[]>([]);
  const [currentBrand, setCurrentBrand] = useState<BrandType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuditMode, setIsAuditMode] = useState(false);
  const [auditCount, setAuditCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showAddModelDialog, setShowAddModelDialog] = useState(false);
  const [showAddRepairDialog, setShowAddRepairDialog] = useState(false);
  const [showAddBrandDialog, setShowAddBrandDialog] = useState(false);
  const [showBrandManager, setShowBrandManager] = useState(false);
  const [addRepairTarget, setAddRepairTarget] = useState<{ brand: string; model: string } | null>(null);

  // Filter data based on brand and search
  const filteredData = appData.filter(item => {
    if (currentBrand !== 'all' && item.brand !== currentBrand) return false;
    if (searchQuery && !item.model.toUpperCase().includes(searchQuery.toUpperCase())) return false;
    return true;
  });

  // Group data by brand
  const groupedByBrand = filteredData.reduce((acc, item) => {
    if (!acc[item.brand]) {
      acc[item.brand] = [];
    }
    acc[item.brand].push(item);
    return acc;
  }, {} as Record<string, ModelItem[]>);

  // Define brand order
  const brandOrder = ['APPLE', 'SAMSUNG', 'XIAOMI', 'OPPO', 'HUAWEI', 'HONOR', 'REALME', 'VIVO', 'ONEPLUS'];
  const sortedBrands = Object.keys(groupedByBrand).sort((a, b) => {
    const aIdx = brandOrder.indexOf(a);
    const bIdx = brandOrder.indexOf(b);
    if (aIdx === -1 && bIdx === -1) return a.localeCompare(b);
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });

  // Load data from API
  const { data: dbData, error: dbError, isLoading } = useSWR<QuoteRecord[]>('/api/quotes', fetcher);
  const [hasLoadedFromDb, setHasLoadedFromDb] = useState(false);

  // Convert DB data to app format when loaded (only on initial load)
  useEffect(() => {
    if (dbData && dbData.length > 0 && !hasLoadedFromDb) {
      console.log("Loading data from database:", dbData.length, "records");
      const converted = convertFromDbRecords(dbData);
      console.log("Converted to", converted.length, "models");
      setAppData(converted);
      setHasLoadedFromDb(true);
    } else if (dbData && dbData.length === 0 && !hasLoadedFromDb) {
      console.log("No data in database");
      setHasLoadedFromDb(true);
    }
  }, [dbData, hasLoadedFromDb]);

  const saveToDatabase = async (data: ModelItem[], replaceAll: boolean = false) => {
    setIsSaving(true);
    try {
      const records = convertToDbRecords(data);
      console.log("Saving records to database:", records.length, "records", replaceAll ? "(replacing all)" : "(upsert)");
      
      const url = replaceAll ? '/api/quotes?replace=true' : '/api/quotes';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(records),
      });
      
      const result = await response.json();
      console.log("Save response:", response.status, result);
      
      if (!response.ok) {
        throw new Error(result.error || 'Save failed');
      }
      
      mutate('/api/quotes');
      alert(`成功保存 ${records.length} 条记录到数据库！`);
    } catch (error) {
      console.error('Failed to save:', error);
      alert('保存失败: ' + (error instanceof Error ? error.message : '未知错误'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileImport = useCallback((file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = processCSV(results.data as Record<string, string>[]);
        setAppData(data);
        setIsAuditMode(false);
        setAuditCount(0);
        setHasLoadedFromDb(true); // Mark as loaded to prevent overwrite from DB
        // Save newly imported data to database (replace all existing data)
        await saveToDatabase(data, true);
      },
      error: (err: Error) => alert("CSV 解析失败: " + err.message),
    });
  }, []);

  const handleAuditToggle = useCallback(() => {
    if (isAuditMode) {
      // Exit audit mode - clear issues
      setIsAuditMode(false);
      setAuditCount(0);
      setAppData(prev => prev.map(m => ({
        ...m,
        hasError: false,
        hasWarning: false,
        repairs: m.repairs.map(r => ({ ...r, issues: [] }))
      })));
    } else {
      // Enter audit mode - analyze errors
      const { data: analyzedData, totalIssues } = analyzeErrors(appData);
      setAppData(analyzedData);
      setAuditCount(totalIssues);
      setIsAuditMode(true);
    }
  }, [isAuditMode, appData]);

  const handleExport = useCallback(() => {
    exportToCSV(appData, currentBrand);
  }, [appData, currentBrand]);

  const handleRepairUpdate = useCallback((brand: string, model: string, rIdx: number, price: number, warranty: string) => {
    setAppData(prev => {
      return prev.map(item => {
        if (item.brand === brand && item.model === model) {
          return {
            ...item,
            repairs: item.repairs.map((r, i) =>
              i === rIdx ? { ...r, price, warranty } : r
            )
          };
        }
        return item;
      });
    });
  }, []);

  const handleExpandAll = useCallback(() => {
    setExpandedCards(new Set(filteredData.map(item => `${item.brand}-${item.model}`)));
  }, [filteredData]);

  const handleCollapseAll = useCallback(() => {
    setExpandedCards(new Set());
  }, []);

  // Delete handlers
  const handleDeleteModel = useCallback(async (brand: string, model: string) => {
    try {
      const response = await fetch(`/api/quotes?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Delete failed');
      
      // Update local state
      setAppData(prev => prev.filter(item => !(item.brand === brand && item.model === model)));
      mutate('/api/quotes');
    } catch (error) {
      alert('删除失败: ' + (error instanceof Error ? error.message : '未知错误'));
    }
  }, []);

  const handleDeleteRepair = useCallback(async (brand: string, model: string, repairId: string) => {
    try {
      const response = await fetch(`/api/quotes?repair_id=${encodeURIComponent(repairId)}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Delete failed');
      
      // Update local state
      setAppData(prev => prev.map(item => {
        if (item.brand === brand && item.model === model) {
          const newRepairs = item.repairs.filter(r => r.id !== repairId);
          if (newRepairs.length === 0) return null;
          return { ...item, repairs: newRepairs };
        }
        return item;
      }).filter(Boolean) as ModelItem[]);
      mutate('/api/quotes');
    } catch (error) {
      alert('删除失败: ' + (error instanceof Error ? error.message : '未知错误'));
    }
  }, []);

  const handleDeleteBrand = useCallback(async (brand: string) => {
    try {
      const response = await fetch(`/api/quotes?brand=${encodeURIComponent(brand)}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Delete failed');
      
      // Update local state
      setAppData(prev => prev.filter(item => item.brand !== brand));
      mutate('/api/quotes');
    } catch (error) {
      alert('删除失败: ' + (error instanceof Error ? error.message : '未知错误'));
    }
  }, []);

  const handleRenameModel = useCallback(async (brand: string, oldModel: string, newModel: string) => {
    try {
      const response = await fetch('/api/quotes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand, oldModel, newModel }),
      });
      if (!response.ok) throw new Error('Rename failed');
      
      // Update local state
      setAppData(prev => prev.map(item => {
        if (item.brand === brand && item.model === oldModel) {
          return { ...item, model: newModel };
        }
        return item;
      }));
      mutate('/api/quotes');
    } catch (error) {
      alert('重命名失败: ' + (error instanceof Error ? error.message : '未知错误'));
    }
  }, []);

  // Rename brand handler
  const handleRenameBrand = useCallback(async (oldBrand: string, newBrand: string) => {
    try {
      const response = await fetch('/api/quotes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldBrand, newBrand }),
      });
      if (!response.ok) throw new Error('Rename failed');
      
      // Update local state
      setAppData(prev => prev.map(item => {
        if (item.brand === oldBrand) {
          return { ...item, brand: newBrand };
        }
        return item;
      }));
      mutate('/api/quotes');
    } catch (error) {
      alert('重命名失败: ' + (error instanceof Error ? error.message : '未知错误'));
    }
  }, []);

  // Add new model handler
  const handleAddModel = useCallback(async (brand: string, model: string, repairs: { label: string; type: string; quality: string; price: number; warranty: string }[]) => {
    try {
      const records = repairs.map(r => ({
        brand,
        model,
        repair_id: Math.random().toString(36).substr(2, 9),
        repair_label: r.label,
        repair_type: r.type,
        quality: r.quality,
        price: r.price,
        warranty: r.warranty,
      }));

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(records),
      });
      if (!response.ok) throw new Error('Add failed');

      // Update local state
      const newModel: ModelItem = {
        brand,
        model,
        repairs: repairs.map(r => ({
          id: Math.random().toString(36).substr(2, 9),
          label: r.label,
          type: r.type,
          quality: r.quality,
          price: r.price,
          warranty: r.warranty,
        })),
      };
      setAppData(prev => [...prev, newModel]);
      mutate('/api/quotes');
    } catch (error) {
      alert('添加失败: ' + (error instanceof Error ? error.message : '未知错误'));
    }
  }, []);

  // Add repair to existing model handler
  const handleAddRepairToModel = useCallback(async (repair: { label: string; type: string; quality: string; price: number; warranty: string }) => {
    if (!addRepairTarget) return;

    try {
      const record = {
        brand: addRepairTarget.brand,
        model: addRepairTarget.model,
        repair_id: Math.random().toString(36).substr(2, 9),
        repair_label: repair.label,
        repair_type: repair.type,
        quality: repair.quality,
        price: repair.price,
        warranty: repair.warranty,
      };

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([record]),
      });
      if (!response.ok) throw new Error('Add failed');

      // Update local state
      setAppData(prev => prev.map(item => {
        if (item.brand === addRepairTarget.brand && item.model === addRepairTarget.model) {
          return {
            ...item,
            repairs: [...item.repairs, {
              id: record.repair_id,
              label: repair.label,
              type: repair.type,
              quality: repair.quality,
              price: repair.price,
              warranty: repair.warranty,
            }],
          };
        }
        return item;
      }));
      mutate('/api/quotes');
    } catch (error) {
      alert('添加失败: ' + (error instanceof Error ? error.message : '未知错误'));
    }
  }, [addRepairTarget]);

  const handleOpenAddRepair = useCallback((brand: string, model: string) => {
    setAddRepairTarget({ brand, model });
    setShowAddRepairDialog(true);
  }, []);

  return (
    <PageShell title="报价系统" description="管理所有设备维修报价">
      <div className="space-y-6">
        <Header
          hasData={appData.length > 0}
          isAuditMode={isAuditMode}
          auditCount={auditCount}
          currentBrand={currentBrand}
          searchQuery={searchQuery}
          isSaving={isSaving}
          isLoading={isLoading}
          onFileImport={handleFileImport}
          onAuditToggle={handleAuditToggle}
          onExport={handleExport}
          onSave={() => saveToDatabase(appData)}
          onAddModel={() => setShowAddModelDialog(true)}
          onOpenBrandManager={() => setShowBrandManager(true)}
          onBrandChange={setCurrentBrand}
          onSearchChange={setSearchQuery}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
        />

        {appData.length === 0 ? (
          <EmptyState />
        ) : (
          <BrandGrid
            groupedByBrand={groupedByBrand}
            sortedBrands={sortedBrands}
            isAuditMode={isAuditMode}
            expandedCards={expandedCards}
            onRepairUpdate={handleRepairUpdate}
            onDeleteModel={handleDeleteModel}
            onDeleteRepair={handleDeleteRepair}
            onDeleteBrand={handleDeleteBrand}
            onRenameModel={handleRenameModel}
            onRenameBrand={handleRenameBrand}
            onAddRepair={handleOpenAddRepair}
            onAddBrand={() => setShowAddBrandDialog(true)}
          />
        )}

        {/* Add Model Dialog */}
        <AddModelDialog
          isOpen={showAddModelDialog}
          onClose={() => setShowAddModelDialog(false)}
          onAdd={handleAddModel}
        />

        {/* Add Repair Dialog */}
        <AddRepairDialog
          isOpen={showAddRepairDialog}
          brand={addRepairTarget?.brand || ''}
          model={addRepairTarget?.model || ''}
          onClose={() => {
            setShowAddRepairDialog(false);
            setAddRepairTarget(null);
          }}
          onAdd={handleAddRepairToModel}
        />

        {/* Add Brand Dialog */}
        <AddBrandDialog
          isOpen={showAddBrandDialog}
          onClose={() => setShowAddBrandDialog(false)}
          onAdd={handleAddModel}
          existingBrands={sortedBrands}
        />

        {/* Brand Manager */}
        <BrandManager
          isOpen={showBrandManager}
          onClose={() => setShowBrandManager(false)}
          brands={sortedBrands}
          onRenameBrand={handleRenameBrand}
          onDeleteBrand={handleDeleteBrand}
          onAddBrand={handleAddModel}
          onDeleteModel={handleDeleteModel}
          onRenameModel={handleRenameModel}
          groupedByBrand={groupedByBrand}
        />
      </div>
    </PageShell>
  );
}
