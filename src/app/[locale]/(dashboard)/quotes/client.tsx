"use client";

import { useState, useCallback, useEffect } from "react";
import Papa from "papaparse";
import { Header } from "@/modules/quotes/components/header";
import { BrandGrid } from "@/modules/quotes/components/brand-grid";
import { EmptyState } from "@/modules/quotes/components/empty-state";
import { AddModelDialog, AddRepairDialog, AddBrandDialog } from "@/modules/quotes/components/add-dialog";
import { BrandManager } from "@/modules/quotes/components/brand-manager";
import { processCSV, exportToCSV, convertToDbRecords, convertFromDbRecords } from "@/modules/quotes/utils";
import type { BrandType, ModelItem, QuoteRecord } from "@/modules/quotes/types";
import { PageShell } from "@/modules/shared/PageShell";
import { 
  bulkCreateQuotesAction, 
  createQuoteAction, 
  deleteBrandAction, 
  deleteModelAction, 
  deleteQuoteAction, 
  deleteRepairAction, 
  renameBrandAction, 
  renameModelAction,
  updateQuoteAction,
  updateRepairAction
} from "@/actions/quote";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface QuoteManagementClientProps {
  initialData: QuoteRecord[];
}

export function QuoteManagementClient({ initialData }: QuoteManagementClientProps) {
  const router = useRouter();
  const [appData, setAppData] = useState<ModelItem[]>([]);
  const [currentBrand, setCurrentBrand] = useState<BrandType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showAddModelDialog, setShowAddModelDialog] = useState(false);
  const [showAddRepairDialog, setShowAddRepairDialog] = useState(false);
  const [showAddBrandDialog, setShowAddBrandDialog] = useState(false);
  const [showBrandManager, setShowBrandManager] = useState(false);
  const [addRepairTarget, setAddRepairTarget] = useState<{ brand: string; model: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Initialize appData from initialData
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const converted = convertFromDbRecords(initialData);
      setAppData(converted);
    } else {
      setAppData([]);
    }
  }, [initialData]);

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

  const saveToDatabase = async (data: ModelItem[]) => {
    setIsSaving(true);
    setUploadProgress(0);
    
    try {
      const records = convertToDbRecords(data);
      console.log("Saving records to database:", records.length);
      
      // Convert to format expected by Action (camelCase)
      const formattedRecords = records.map(r => ({
        brand: r.brand,
        model: r.model,
        repairId: r.repair_id,
        repairLabel: r.repair_label,
        repairType: r.repair_type,
        quality: r.quality,
        price: r.price,
        warranty: r.warranty,
        count: r.count,
        isUnstable: r.is_unstable,
        priceSpread: r.price_spread,
        isActive: true
      }));
      
      const CHUNK_SIZE = 100;
      let successCount = 0;

      // We only support bulk import via this method now for CSV import essentially
      // Or we can just call the action once if payload isn't too huge.
      // But server actions have payload limits (default 1MB).
      // So chunking is good.
      
      for (let i = 0; i < formattedRecords.length; i += CHUNK_SIZE) {
        const chunk = formattedRecords.slice(i, i + CHUNK_SIZE);
        const result = await bulkCreateQuotesAction(chunk);
        
        if (!result.success) {
          throw new Error(result.message || `Batch ${i/CHUNK_SIZE + 1} failed`);
        }
        
        successCount += chunk.length;
        setUploadProgress(Math.round((successCount / formattedRecords.length) * 100));
      }
      
      toast.success(`Successfully saved ${successCount} records!`);
      // No need to mutate, server action revalidates, and props update
    } catch (error) {
      console.error('Failed to save:', error);
      toast.error('Save failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSaving(false);
      setUploadProgress(0);
    }
  };

  const handleFileImport = useCallback((file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = processCSV(results.data as Record<string, string>[]);
        // Optimistic update locally
        setAppData(data);
        // Save to DB
        await saveToDatabase(data);
      },
      error: (err: Error) => toast.error("CSV Parse failed: " + err.message),
    });
  }, []);

  const handleExport = useCallback(() => {
    exportToCSV(appData, currentBrand);
  }, [appData, currentBrand]);

  const handleRepairUpdate = useCallback(async (brand: string, model: string, rIdx: number, price: number, warranty: string) => {
    // Find the item to get IDs
    const item = appData.find(i => i.brand === brand && i.model === model);
    if (!item) return;
    
    const repair = item.repairs[rIdx];
    if (!repair) return;

    // Optimistic update
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

    // Call Server Action
    // Using updateRepairAction to update by repairId (business ID)
    
    try {
      const result = await updateRepairAction(repair.id, price, warranty);
      if (!result.success) {
         toast.error(result.message);
         router.refresh(); // Revert
      } else {
         toast.success("Repair updated");
      }
    } catch (e) {
      console.error(e);
      toast.error("Update failed");
    }
  }, [appData, router]);

  const handleExpandAll = useCallback(() => {
    setExpandedCards(new Set(filteredData.map(item => `${item.brand}-${item.model}`)));
  }, [filteredData]);

  const handleCollapseAll = useCallback(() => {
    setExpandedCards(new Set());
  }, []);

  const handleDeleteModel = useCallback(async (brand: string, model: string) => {
    if (!confirm("Are you sure you want to delete this model?")) return;
    
    // Optimistic
    setAppData(prev => prev.filter(item => !(item.brand === brand && item.model === model)));
    
    const result = await deleteModelAction(brand, model);
    if (!result.success) {
      toast.error(result.message);
      router.refresh(); // Revert
    } else {
      toast.success("Model deleted");
    }
  }, [router]);

  const handleDeleteRepair = useCallback(async (brand: string, model: string, repairId: string) => {
    if (!confirm("Are you sure you want to delete this repair?")) return;

    setAppData(prev => prev.map(item => {
      if (item.brand === brand && item.model === model) {
        const newRepairs = item.repairs.filter(r => r.id !== repairId);
        if (newRepairs.length === 0) return null;
        return { ...item, repairs: newRepairs };
      }
      return item;
    }).filter(Boolean) as ModelItem[]);

    const result = await deleteRepairAction(repairId);
    if (!result.success) {
      toast.error(result.message);
      router.refresh();
    } else {
      toast.success("Repair deleted");
    }
  }, [router]);

  const handleDeleteBrand = useCallback(async (brand: string) => {
    if (!confirm(`Are you sure you want to delete brand ${brand}?`)) return;

    setAppData(prev => prev.filter(item => item.brand !== brand));
    
    const result = await deleteBrandAction(brand);
    if (!result.success) {
      toast.error(result.message);
      router.refresh();
    } else {
      toast.success("Brand deleted");
    }
  }, [router]);

  const handleRenameModel = useCallback(async (brand: string, oldModel: string, newModel: string) => {
    setAppData(prev => prev.map(item => {
      if (item.brand === brand && item.model === oldModel) {
        return { ...item, model: newModel };
      }
      return item;
    }));
    
    const result = await renameModelAction(brand, oldModel, newModel);
    if (!result.success) {
      toast.error(result.message);
      router.refresh();
    } else {
      toast.success("Model renamed");
    }
  }, [router]);

  const handleRenameBrand = useCallback(async (oldBrand: string, newBrand: string) => {
    setAppData(prev => prev.map(item => {
      if (item.brand === oldBrand) {
        return { ...item, brand: newBrand };
      }
      return item;
    }));
    
    const result = await renameBrandAction(oldBrand, newBrand);
    if (!result.success) {
      toast.error(result.message);
      router.refresh();
    } else {
      toast.success("Brand renamed");
    }
  }, [router]);

  const handleAddModel = useCallback(async (brand: string, model: string, repairs: { label: string; type: string; quality: string; price: number; warranty: string }[]) => {
    const records = repairs.map(r => ({
      brand,
      model,
      repairId: Math.random().toString(36).substr(2, 9),
      repairLabel: r.label,
      repairType: r.type,
      quality: r.quality,
      price: r.price,
      warranty: r.warranty,
      isActive: true
    }));

    // Optimistic
    const newModel: ModelItem = {
      brand,
      model,
      repairs: repairs.map((r, i) => ({
        id: records[i].repairId,
        label: r.label,
        type: r.type as 'screen' | 'battery' | 'other',
        quality: r.quality as 'orig' | 'comp' | 'altcap' | 'standard',
        price: r.price,
        warranty: r.warranty,
        count: 0,
      })),
    };
    setAppData(prev => [...prev, newModel]);

    // Use bulk create
    const result = await bulkCreateQuotesAction(records);
    if (!result.success) {
      toast.error(result.message);
      router.refresh();
    } else {
      toast.success("Model added");
    }
  }, [router]);

  const handleAddRepairToModel = useCallback(async (repair: { label: string; type: string; quality: string; price: number; warranty: string }) => {
    if (!addRepairTarget) return;

    const record = {
      brand: addRepairTarget.brand,
      model: addRepairTarget.model,
      repairId: Math.random().toString(36).substr(2, 9),
      repairLabel: repair.label,
      repairType: repair.type,
      quality: repair.quality,
      price: repair.price,
      warranty: repair.warranty,
      isActive: true
    };

    setAppData(prev => prev.map(item => {
      if (item.brand === addRepairTarget.brand && item.model === addRepairTarget.model) {
        return {
          ...item,
          repairs: [...item.repairs, {
            id: record.repairId,
            label: repair.label,
            type: repair.type as 'screen' | 'battery' | 'other',
            quality: repair.quality as 'orig' | 'comp' | 'altcap' | 'standard',
            price: repair.price,
            warranty: repair.warranty,
            count: 0,
          }],
        };
      }
      return item;
    }));

    const formData = new FormData();
    Object.entries(record).forEach(([k, v]) => formData.append(k, String(v)));
    
    const result = await createQuoteAction(null, formData);
    if (!result.success) {
      toast.error(result.message);
      router.refresh();
    } else {
      toast.success("Repair added");
    }
  }, [addRepairTarget, router]);

  const handleOpenAddRepair = useCallback((brand: string, model: string) => {
    setAddRepairTarget({ brand, model });
    setShowAddRepairDialog(true);
  }, []);

  return (
    <PageShell title="报价系统" description="管理所有设备维修报价">
      <div className="space-y-6">
        <Header
          hasData={appData.length > 0}
          currentBrand={currentBrand}
          searchQuery={searchQuery}
          isSaving={isSaving}
          isLoading={false}
          uploadProgress={uploadProgress}
          onFileImport={handleFileImport}
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

        <AddModelDialog
          isOpen={showAddModelDialog}
          onClose={() => setShowAddModelDialog(false)}
          onAdd={handleAddModel}
        />

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

        <AddBrandDialog
          isOpen={showAddBrandDialog}
          onClose={() => setShowAddBrandDialog(false)}
          onAdd={handleAddModel}
          existingBrands={sortedBrands}
        />

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
