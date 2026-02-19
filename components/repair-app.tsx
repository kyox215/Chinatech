import { useState, useMemo, useEffect, useRef } from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowLeft, Wrench, Smartphone, Check, X, Filter, Loader2, ChevronRight, Home, Settings, Plus, Trash2, Edit2, AlertCircle, Upload, Download, DatabaseZap } from "lucide-react"
import { BrandIcon } from "@/components/brand-icon"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { REPAIR_PRICES, type RepairItem } from "@/lib/data/repair-prices"
import { cn } from "@/lib/utils"
import { AddModelDialog, AddRepairDialog, EditRepairDialog, EditModelDialog, type RepairInput } from "@/components/repair/repair-dialogs"
import { toast } from "sonner"
import { buttonVariants } from "@/components/ui/button"

interface RepairAppProps {
  setMainHeaderVisible: (visible: boolean) => void
}

export function RepairApp({ setMainHeaderVisible }: RepairAppProps) {

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [searchSelectedBrand, setSearchSelectedBrand] = useState<string | null>(null) // New state for search flow
  // Management State
  const [isManagementMode, setIsManagementMode] = useState(false)
  
  // Database state
  const [dbItems, setDbItems] = useState<RepairItem[]>([])
  const [loading, setLoading] = useState(true)
  const [usingStaticFallback, setUsingStaticFallback] = useState(false)
  const [showAddModel, setShowAddModel] = useState(false)
  const [showAddRepair, setShowAddRepair] = useState(false)
  const [showEditRepair, setShowEditRepair] = useState(false)
  const [showEditModel, setShowEditModel] = useState(false)
  const [editingItem, setEditingItem] = useState<RepairItem | null>(null)
  const [editingModelTarget, setEditingModelTarget] = useState<{brand: string, model: string} | null>(null)
  const [addRepairTarget, setAddRepairTarget] = useState<{brand: string, model: string} | null>(null)

  // Database state
  const [quickEditingId, setQuickEditingId] = useState<string | null>(null);
  const [quickEditPrice, setQuickEditPrice] = useState<string>("");
  const importCsvInputRef = useRef<HTMLInputElement | null>(null)
  const [importPreviewOpen, setImportPreviewOpen] = useState(false)
  const [importPreview, setImportPreview] = useState<null | {
    message?: string
    totalRows?: number
    parsed?: number
    skippedEmpty?: number
    deduped?: number
    willInsert?: number
    willUpdate?: number
    errors?: Array<{ row: number; message: string }>
    error?: string
  }>(null)
  const [importPendingFile, setImportPendingFile] = useState<File | null>(null)
  const [importRunning, setImportRunning] = useState(false)

  const escapeCsv = (value: unknown) => {
    const s = String(value ?? '').replace(/\uFEFF/g, '');
    if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const downloadCsv = (filename: string, csvText: string) => {
    const blob = new Blob([`\uFEFF${csvText}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const exportRepairCsv = () => {
    let scope = 'all';
    let items = dbItems;

    if (selectedBrand && selectedModel) {
      scope = `${selectedBrand}-${selectedModel}`;
      items = dbItems.filter((i) => i.brand === selectedBrand && i.model === selectedModel);
    } else if (selectedBrand) {
      scope = selectedBrand;
      items = dbItems.filter((i) => i.brand === selectedBrand);
    }

    const header = ['brand', 'model', 'repair_item', 'quality', 'price', 'warranty', 'repair_type', 'category', 'model_code'];
    const lines = [header.join(',')];

    for (const item of items) {
      lines.push(
        [
          escapeCsv(item.brand),
          escapeCsv(item.model),
          escapeCsv(item.repair_item),
          escapeCsv(item.quality),
          escapeCsv(item.price),
          escapeCsv(item.warranty || ''),
          escapeCsv(item.repair_type || ''),
          escapeCsv(item.category || ''),
          escapeCsv(item.model_code || ''),
        ].join(',')
      );
    }

    const date = new Date().toISOString().slice(0, 10);
    const safeScope = scope.replace(/[^\w.-]+/g, '_').slice(0, 80);
    downloadCsv(`repair_quotes_${safeScope}_${date}.csv`, lines.join('\n'));
    toast.success(`已导出 ${items.length} 条到 CSV`);
  };

  const startQuickEdit = (item: RepairItem) => {
      setQuickEditingId(item.id);
      setQuickEditPrice(item.price.toString());
  };

  const saveQuickEdit = async (item: RepairItem) => {
      if (!quickEditPrice) return;
      const newPrice = parseFloat(quickEditPrice);
      if (isNaN(newPrice)) return;
      
      // Optimistic Update
      setDbItems(prev => prev.map(i => i.id === item.id ? { ...i, price: newPrice } : i));
      setQuickEditingId(null);

      try {
          const res = await fetch('/api/repair', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: item.id, price: newPrice })
          });
          if (!res.ok) throw new Error("Failed");
          toast.success("价格已更新");
      } catch (err) {
          toast.error("更新失败");
          fetchData(); // Revert
      }
  };

  const cancelQuickEdit = () => {
      setQuickEditingId(null);
      setQuickEditPrice("");
  };

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
      isOpen: boolean;
      type: 'repair' | 'model';
      id?: string;
      brand?: string;
      model?: string;
  }>({ isOpen: false, type: 'repair' });

  // Fetch data from API
  async function fetchData() {
    try {
      setLoading(true)
      
      // Force disable cache
      // const cached = localStorage.getItem('repair_data'); ... removed

      const res = await fetch(`/api/repair?t=${Date.now()}`) // Add timestamp to bypass cache
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      
      if (data && data.length > 0) {
          setDbItems(data as unknown as RepairItem[])
          // localStorage.setItem('repair_data', JSON.stringify(data)); // Disabled cache storage
      } else {
          // Fallback if table is empty
          console.warn("Database empty, using static data")
          setDbItems(REPAIR_PRICES)
          setUsingStaticFallback(true)
      }
    } catch (err) {
      console.error("Error fetching repair prices:", err)
      setDbItems(REPAIR_PRICES)
      setUsingStaticFallback(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Add a useEffect to show toast if using fallback
  useEffect(() => {
      if (usingStaticFallback) {
          toast.warning("无法连接数据库，已切换至离线/演示模式。请检查环境变量配置。", {
              duration: 5000,
              icon: <DatabaseZap className="h-4 w-4 text-orange-500" />
          });
      }
  }, [usingStaticFallback]);

  // Handlers
  const handleAddModel = async (brand: string, model: string, modelCode: string, repairs: RepairInput[]) => {
    try {
      const records = repairs.map(r => ({
        brand,
        model,
        model_code: modelCode,
        repair_item: r.label,
        repair_type: r.type,
        quality: r.quality,
        price: parseFloat(r.price),
        warranty: r.warranty,
        priority: 0, // Should be calculated on server or utility
        is_unstable: false
      }))

      const res = await fetch('/api/repair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(records)
      })

      if (!res.ok) throw new Error('Failed to add')
      toast.success("添加成功")
      fetchData()
    } catch (err) {
      toast.error("添加失败")
    }
  }

  const handleAddRepair = async (repair: RepairInput) => {
    if (!addRepairTarget) return
    try {
      const record = {
        brand: addRepairTarget.brand,
        model: addRepairTarget.model,
        repair_item: repair.label,
        repair_type: repair.type,
        quality: repair.quality,
        price: parseFloat(repair.price),
        warranty: repair.warranty,
        priority: 0,
        is_unstable: false
      }

      const res = await fetch('/api/repair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
      })

      if (!res.ok) throw new Error('Failed to add')
      toast.success("添加成功")
      fetchData()
    } catch (err) {
      toast.error("添加失败")
    }
  }

  const handleRenameModel = async (newModelName: string, newModelCode: string) => {
    if (!editingModelTarget) return
    const { brand, model: oldModel } = editingModelTarget
    
    try {
      const res = await fetch('/api/repair', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand, oldModel, newModel: newModelName, newModelCode })
      })

      if (!res.ok) throw new Error('Failed to rename')
      toast.success("型号信息更新成功")
      fetchData() // Refresh data
    } catch (err) {
      toast.error("更新失败")
    }
  }

  const handleUpdateRepair = async (repair: RepairInput) => {
    if (!repair.id) return
    try {
      const updates = {
        id: repair.id,
        repair_item: repair.label,
        repair_type: repair.type,
        quality: repair.quality,
        price: parseFloat(repair.price),
        warranty: repair.warranty,
        priority: repair.priority // Update priority
      }

      // Optimistic update
      setDbItems(prev => prev.map(item => 
          item.id === repair.id 
          ? { ...item, ...updates }
          : item
      ));

      const res = await fetch('/api/repair', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      if (!res.ok) throw new Error('Failed to update')
      toast.success("更新成功")
      // fetchData() // No need to fetch immediately if optimistic update works, but good for consistency
    } catch (err) {
      toast.error("更新失败")
      fetchData() // Revert on error
    }
  }

  const confirmDeleteRepair = (id: string) => {
    setDeleteConfirmation({ isOpen: true, type: 'repair', id });
  }

  const confirmDeleteModel = (brand: string, model: string) => {
    setDeleteConfirmation({ isOpen: true, type: 'model', brand, model });
  }

  const executeDelete = async () => {
    if (deleteConfirmation.type === 'repair' && deleteConfirmation.id) {
        try {
          const res = await fetch(`/api/repair?id=${deleteConfirmation.id}`, { method: 'DELETE' })
          if (!res.ok) throw new Error('Failed to delete')
          toast.success("删除成功")
          setDbItems(prev => prev.filter(i => i.id !== deleteConfirmation.id))
        } catch (err) {
          toast.error("删除失败")
        }
    } else if (deleteConfirmation.type === 'model' && deleteConfirmation.brand && deleteConfirmation.model) {
        try {
          const res = await fetch(`/api/repair?brand=${encodeURIComponent(deleteConfirmation.brand)}&model=${encodeURIComponent(deleteConfirmation.model)}`, { method: 'DELETE' })
          if (!res.ok) throw new Error('Failed to delete')
          toast.success("删除成功")
          setDbItems(prev => prev.filter(i => !(i.brand === deleteConfirmation.brand && i.model === deleteConfirmation.model)))
          if (selectedModel === deleteConfirmation.model) setSelectedModel(null)
        } catch (err) {
          toast.error("删除失败")
        }
    }
    setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
  }

  const handleDeleteRepair = (id: string) => {
    confirmDeleteRepair(id);
  }

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const loadingToast = toast.loading("正在分析 CSV...")
      const res = await fetch('/api/repair/import?dryRun=1', {
        method: 'POST',
        body: formData,
      })
      
      const data = await res.json()
      
      toast.dismiss(loadingToast)

      if (!res.ok) {
        toast.error(data.error || "分析失败，请检查文件格式")
        e.target.value = ''
        return
      }

      setImportPendingFile(file)
      setImportPreview(data)
      setImportPreviewOpen(true)
      
    } catch (err) {
      console.error(err)
      toast.error("分析失败，请检查文件格式")
    }
    
    // Reset input
    e.target.value = ''
  }

  const confirmImportCSV = async () => {
    if (!importPendingFile) return
    if (importRunning) return
    setImportRunning(true)

    const formData = new FormData()
    formData.append('file', importPendingFile)

    const loadingToast = toast.loading("正在导入数据...")

    try {
      const res = await fetch('/api/repair/import', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Import failed')

      toast.dismiss(loadingToast)
      toast.success(`导入完成：新增 ${data.willInsert ?? 0}，更新 ${data.willUpdate ?? 0}`)
      setImportPreviewOpen(false)
      setImportPreview(null)
      setImportPendingFile(null)
      fetchData()
    } catch (err) {
      toast.dismiss(loadingToast)
      console.error(err)
      toast.error("导入失败，请检查文件格式")
    } finally {
      setImportRunning(false)
      if (importCsvInputRef.current) importCsvInputRef.current.value = ''
    }
  }
  const handleDeleteModel = async (brand: string, model: string) => {
    confirmDeleteModel(brand, model);
  }

  // Use dbItems instead of REPAIR_PRICES for all logic below
  const activeItems = dbItems

  // Get unique brands
  const brands = useMemo(() => {
    // We want to preserve the priority order from the DB if possible
    // But we also want unique brands.
    // Since activeItems is already sorted by priority, we can just extract brands in order.
    const brandSet = new Set(activeItems.map((item) => item.brand))
    const allBrands = Array.from(brandSet)
    
    // Custom sort order
    const priorityBrands = ['APPLE', 'SAMSUNG', 'REDMI', 'OPPO', 'XIAOMI', 'HONOR', 'MOTOROLA', 'HUAWEI', 'VIVO', 'REALME', 'ONEPLUS', 'GOOGLE', 'SONY', 'NOKIA', 'TCL'];
    
    return allBrands.sort((a, b) => {
        const indexA = priorityBrands.indexOf(a.toUpperCase())
        const indexB = priorityBrands.indexOf(b.toUpperCase())
        
        // If both are in priority list, sort by index
        if (indexA !== -1 && indexB !== -1) return indexA - indexB
        // If only A is in priority list, A comes first
        if (indexA !== -1) return -1
        // If only B is in priority list, B comes first
        if (indexB !== -1) return 1
        // Otherwise sort alphabetically
        return a.localeCompare(b)
    })
  }, [activeItems])

  // Get models for selected brand
  const models = useMemo(() => {
    if (!selectedBrand) return []
    // Use activeItems (sorted) to maintain priority
    const modelSet = new Set(
      activeItems.filter((item) => item.brand === selectedBrand).map((item) => item.model)
    )
    return Array.from(modelSet)
  }, [selectedBrand, activeItems])

  // Filter items based on search and selection
  const filteredItems = useMemo(() => {
    let items = activeItems

    if (selectedBrand) {
      items = items.filter((item) => item.brand === selectedBrand)
    }

    if (selectedModel) {
      items = items.filter((item) => item.model === selectedModel)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.model.toLowerCase().includes(query) ||
          item.repair_item.toLowerCase().includes(query) ||
          item.brand.toLowerCase().includes(query) ||
          (item.model_code && item.model_code.toLowerCase().includes(query))
      )

      if (searchSelectedBrand) {
          items = items.filter(item => item.brand === searchSelectedBrand)
      }
    }

    return items
  }, [selectedBrand, selectedModel, searchQuery, searchSelectedBrand, activeItems])

  // Group items by BRAND when searching
  const groupedByBrandInSearch = useMemo(() => {
    if (!searchQuery) return null;
    // Use the base filtered items WITHOUT brand filter first to get all matching brands
    const query = searchQuery.toLowerCase()
    const allMatches = activeItems.filter(item => 
          item.model.toLowerCase().includes(query) ||
          item.repair_item.toLowerCase().includes(query) ||
          item.brand.toLowerCase().includes(query) ||
          (item.model_code && item.model_code.toLowerCase().includes(query))
    )

    const groups: Record<string, RepairItem[]> = {}
    allMatches.forEach(item => {
        if (!groups[item.brand]) groups[item.brand] = []
        groups[item.brand].push(item)
    })
    return groups
  }, [searchQuery, activeItems])

  // Group items by model if no model is selected but brand is selected
  const groupedByModel = useMemo(() => {
    if (searchQuery) {
        const groups: Record<string, RepairItem[]> = {}
        filteredItems.forEach(item => {
            if (!groups[item.model]) groups[item.model] = []
            groups[item.model].push(item)
        })
        return groups
    }
    
    if (!selectedBrand) return null
    // This logic seems unused if brandStats is used, but keeping for compatibility
    // Actually, this variable name is conflicting in previous code.
    // Let's ensure we return something meaningful or null.
    // The previous implementation returned stats object which is WRONG for "groupedByModel" name.
    return null;
  }, [searchQuery, filteredItems, selectedBrand])

  const brandStats = useMemo(() => {
    if (!selectedBrand) return null
    const items = activeItems.filter(i => i.brand === selectedBrand)
    const modelSet = new Set(items.map(i => i.model))
    const seriesSet = new Set(items.map(i => i.category || '其他'))
    return { seriesCount: seriesSet.size, modelCount: modelSet.size, itemCount: items.length }
  }, [selectedBrand, activeItems])

  const groupedBySeries = useMemo(() => {
    if (!selectedBrand || selectedModel) return null
    const items = activeItems.filter(i => i.brand === selectedBrand)
    const map: Record<string, Record<string, RepairItem[]>> = {}
    items.forEach(i => {
      // Use category from DB, fallback to 'Other'
      const s = i.category || '其他'
      if (!map[s]) map[s] = {}
      if (!map[s][i.model]) map[s][i.model] = []
      map[s][i.model].push(i)
    })
    return map
  }, [selectedBrand, selectedModel, activeItems])

  const tagsForModel = (items: RepairItem[]) => {
    const keys = new Set<string>()
    items.forEach(it => {
      const r = it.repair_item
      if (r.includes('屏幕')) keys.add('屏幕')
      if (r.includes('电池')) keys.add('电池')
      if (r.includes('尾插') || r.toLowerCase().includes('usb')) keys.add('充电口')
      if (r.includes('主板')) keys.add('主板')
    })
    return Array.from(keys).slice(0, 2)
  }

  const handleBrandSelect = (brand: string) => {
    if (selectedBrand === brand) {
      setSelectedBrand(null)
      setSelectedModel(null)
    } else {
      setSelectedBrand(brand)
      setSelectedModel(null)
    }
  }

  const handleModelSelect = (model: string) => {
    setSelectedModel(model === selectedModel ? null : model)
  }

  // Sort repair items: Screen (Orig) > Screen (Comp) > Battery (Orig) > Battery (Comp) > Battery (High Cap) > Others
  const sortRepairItems = (items: RepairItem[]) => {
    return [...items]
    .filter(item => {
        // Since we have already normalized the database to only contain valid items,
        // we can skip strict filtering here to allow all items in DB to show.
        // Or if user insists on "Fixed display these repair items, do not hide", 
        // we should ensure we show what is in the DB.
        
        // However, to be safe and consistent with "Fixed display", let's keep the logic 
        // but make it permissive for things that might have slightly different names if user manually added them?
        // No, user said "Don't hide". 
        // If we filter, we hide. So let's REMOVE the filter logic and only keep the SORT logic.
        return true;
    })
    .sort((a, b) => {
      const getScore = (item: RepairItem) => {
        const name = item.repair_item.trim();
        
        // Define exact order scores
        const orderMap: Record<string, number> = {
            '屏幕 (原装)': 10,
            '屏幕 (组装)': 20,
            '电池 (原装)': 30,
            '电池 (组装)': 40,
            '电池 (扩容)': 50,
            '尾插充电口': 60,            // Apple
            '尾插充电口 (原装)': 61,     // Non-Apple
            '尾插充电口 (组装)': 62,     // Non-Apple
            '后盖': 70
        };

        return (orderMap[name] || 999) - (orderMap[b.repair_item.trim()] || 999);
      };
      
      return getScore(a) - getScore(b);
    });
  }

  // Helper to parse repair item name for display
  const parseRepairItemDisplay = (name: string) => {
      // Check for tags in parentheses
      const match = name.match(/^(.+?)\s*\((.+?)\)$/);
      if (match) {
          const mainName = match[1].trim();
          const tag = match[2].trim();
          
          let tagColor = "bg-zinc-100 text-zinc-700 border-zinc-200"; // Default gray
          
          if (tag === '原装') {
              tagColor = "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
          } else if (tag === '组装') {
              tagColor = "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800";
          } else if (tag === '扩容') {
              tagColor = "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800";
          }
          
          return { mainName, tag, tagColor };
      }
      
      // No tag (e.g. "尾插充电口", "后盖")
      return { mainName: name, tag: null, tagColor: null };
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {usingStaticFallback && (
        <div className="bg-orange-500/10 text-orange-600 px-4 py-1 text-xs text-center border-b border-orange-500/20 font-medium flex items-center justify-center gap-2">
            <DatabaseZap className="h-3 w-3" />
            <span>当前处于离线演示模式（无法连接数据库）。如需启用实时数据，请在 Vercel 项目设置中添加 Supabase 环境变量。</span>
        </div>
      )}
      {/* Header & Global Search */}
      <div className="flex flex-col gap-3 sticky top-0 z-20 bg-background/95 backdrop-blur-md pb-3 pt-1.5 border-b">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
           <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
             {selectedBrand ? (
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 rounded-full font-medium text-foreground hover:bg-muted/50 gap-1" 
                    onClick={() => {
                        setSelectedBrand(null); 
                        setSelectedModel(null)
                    }}
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    返回
                </Button>
             ) : (
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => {setSelectedBrand(null); setSelectedModel(null)}}>
                    <Home className="h-3.5 w-3.5" />
                </Button>
             )}
             
             {selectedBrand && !selectedModel && (
               <>
                 <span className="text-muted-foreground/50">|</span>
                 <span className="font-medium text-primary">{selectedBrand}</span>
               </>
             )}
             
             {selectedModel && (
               <>
                 <ChevronRight className="h-3.5 w-3.5" />
                 <span className="font-medium text-primary truncate max-w-[120px]">{selectedModel}</span>
               </>
             )}
           </div>
           
           <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 justify-self-center pointer-events-none">
             维修报价
             {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
           </h2>
           
           <div className="flex items-center gap-2 justify-self-end shrink-0">
             <input ref={importCsvInputRef} type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
             <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button
                   variant="ghost"
                   size="icon"
                   className={cn(
                     "h-8 w-8 rounded-full",
                     isManagementMode ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-muted/50"
                   )}
                   title="管理与操作"
                 >
                   <Settings className="h-4 w-4" />
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="min-w-40">
                 <DropdownMenuCheckboxItem checked={isManagementMode} onCheckedChange={(v) => setIsManagementMode(!!v)}>
                   管理模式
                 </DropdownMenuCheckboxItem>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem onSelect={() => exportRepairCsv()}>
                   <Download className="h-4 w-4" />
                   导出 CSV
                 </DropdownMenuItem>
                 {isManagementMode && (
                   <>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onSelect={() => setTimeout(() => importCsvInputRef.current?.click(), 0)}>
                       <Upload className="h-4 w-4" />
                       导入 CSV
                     </DropdownMenuItem>
                     <DropdownMenuItem onSelect={() => setShowAddModel(true)}>
                       <Plus className="h-4 w-4" />
                       新增型号
                     </DropdownMenuItem>
                   </>
                 )}
               </DropdownMenuContent>
             </DropdownMenu>
           </div>
        </div>

        <div className="relative mx-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={loading ? "加载数据中..." : "搜索型号、故障 (如 iPhone 13 屏幕)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            className="pl-9 rounded-2xl bg-muted/40 border-transparent focus:bg-background focus:border-primary/20 transition-all h-9 shadow-sm"
          />
        </div>

        {/* Brand Filter Removed */}
      </div>

      {/* Content Area */}
      <ScrollArea className="flex-1 h-full">
        <div className="space-y-6 pb-20">
          
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
               <Loader2 className="h-8 w-8 animate-spin text-primary" />
               <p className="text-muted-foreground">正在同步最新报价数据...</p>
             </div>
          ) : (
            <>
          {/* 1. Brand Selection View (Default) */}
          {!selectedBrand && !searchQuery && (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 px-1">
              {brands.map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBrandSelect(brand)}
                  className="flex flex-col items-center gap-2 cursor-pointer min-w-0"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/50 dark:bg-zinc-800/50 hover:bg-primary/5 active:bg-primary/10 flex items-center justify-center transition-colors shadow-sm border border-transparent hover:border-primary/20 shrink-0 backdrop-blur-sm">
                    <BrandIcon brand={brand} className="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs font-medium text-center truncate w-full max-w-[80px] text-muted-foreground hover:text-primary transition-colors block">
                    {brand}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {/* 2. Accordion List View (Brand Selected, No Search) */}
          {selectedBrand && !searchQuery && groupedBySeries && brandStats && (
            <div className="space-y-4 px-2">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between py-2 px-2"
              >
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                        <BrandIcon brand={selectedBrand} className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-none">{selectedBrand}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{brandStats.modelCount} 款机型 · {brandStats.itemCount} 个报价</p>
                    </div>
                 </div>
                 {isManagementMode && (
                   <Button size="sm" variant="outline" className="h-8 gap-1 rounded-full" onClick={() => setShowAddModel(true)}>
                     <Plus className="w-3.5 h-3.5" />
                     <span className="text-xs">添加机型</span>
                   </Button>
                 )}
              </motion.div>

              <div className="space-y-4 pb-10">
                <Accordion type="multiple" className="w-full space-y-4">
                  {Object.entries(groupedBySeries).map(([series, modelsMap]) => (
                    <AccordionItem key={series} value={series} className="border-none">
                      <AccordionTrigger className="px-2 py-3 hover:no-underline group">
                         <div className="flex items-center gap-3 font-semibold text-lg text-foreground/90 group-hover:text-primary transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Smartphone className="w-4 h-4" />
                            </div>
                            {series}
                            <Badge variant="secondary" className="ml-2 text-xs font-normal text-muted-foreground bg-muted/50">
                                {Object.keys(modelsMap).length} 款机型
                            </Badge>
                         </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-0 pt-2 pr-2">
                        <Accordion type="multiple" className="w-full space-y-2 pl-2 border-l-2 border-primary/10 ml-2">
                          {Object.entries(modelsMap).map(([modelName, items]) => (
                            <AccordionItem key={modelName} value={modelName} className="border rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden shadow-sm data-[state=open]:border-primary/50 data-[state=open]:bg-white dark:data-[state=open]:bg-zinc-900 transition-all max-w-full">
                              <AccordionTrigger className="px-4 py-4 hover:no-underline active:bg-muted/30 transition-colors">
                                <div className="flex flex-col gap-2 flex-1 min-w-0 text-left">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="font-medium text-base truncate block">{modelName}</span>
                                        <Badge variant="secondary" className="rounded-full text-[10px] h-5 px-2 font-normal text-muted-foreground shrink-0 ml-2">
                                            {items.length} 项
                                        </Badge>
                                    </div>
                                    
                                    {items[0].model_code && !(items[0].brand.toUpperCase() === 'APPLE' && items[0].category?.includes('iPhone')) && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {items[0].model_code.split(',').map((code, idx) => (
                                                <Badge 
                                                    key={idx} 
                                                    variant="secondary" 
                                                    className="text-[10px] h-5 px-1.5 bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-md font-mono shrink-0"
                                                >
                                                    {code.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    {isManagementMode && (
                                        <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-7 px-2 text-xs gap-1 cursor-pointer")}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingModelTarget({ brand: selectedBrand!, model: modelName });
                                                    setShowEditModel(true);
                                                }}
                                            >
                                                <Edit2 className="h-3 w-3" /> 编辑
                                            </div>
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-7 px-2 text-xs gap-1 text-destructive hover:text-destructive cursor-pointer")}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteModel(selectedBrand!, modelName);
                                                }}
                                            >
                                                <Trash2 className="h-3 w-3" /> 删除
                                            </div>
                                        </div>
                                    )}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pb-0">
                                        <div className="flex flex-col divide-y border-t bg-background/50">
                                            {sortRepairItems(items).map((item) => {
                                                const { mainName, tag, tagColor } = parseRepairItemDisplay(item.repair_item);
                                                return (
                                                <div key={item.id} className="flex items-center justify-between py-3 px-4 active:bg-muted/50 transition-colors cursor-default">
                                                    <div className="flex-1 min-w-0 pr-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-sm text-foreground/90">{mainName}</span>
                                                    {tag && (
                                                        <Badge variant="outline" className={cn("text-[10px] h-5 px-1.5 border shrink-0", tagColor)}>
                                                            {tag}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    {item.warranty && (
                                                        <span className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> 保修 {item.warranty}</span>
                                                    )}
                                                </div>
                                            </div>
                                                <div className="flex items-center gap-2">
                                                    {isManagementMode && quickEditingId === item.id ? (
                                                        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                                                            <Input 
                                                                autoFocus
                                                                className="h-8 w-24 sm:w-28 px-2 py-1 text-right font-bold text-base"
                                                                value={quickEditPrice}
                                                                onChange={(e) => setQuickEditPrice(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') saveQuickEdit(item);
                                                                    if (e.key === 'Escape') cancelQuickEdit();
                                                                }}
                                                                onBlur={() => saveQuickEdit(item)} // Auto save on blur
                                                                type="number"
                                                            />
                                                            <span className="text-sm font-medium">€</span>
                                                        </div>
                                                    ) : (
                                                        <span 
                                                            className={cn(
                                                                "font-bold text-primary text-base mr-2 transition-colors",
                                                                isManagementMode && "cursor-pointer hover:text-primary/80 hover:underline decoration-dashed underline-offset-4"
                                                            )}
                                                            onClick={(e) => {
                                                                if (isManagementMode) {
                                                                    e.stopPropagation();
                                                                    startQuickEdit(item);
                                                                }
                                                            }}
                                                            title={isManagementMode ? "点击快速修改价格" : undefined}
                                                        >
                                                            €{item.price}
                                                        </span>
                                                    )}
                                                    
                                                    {isManagementMode && quickEditingId !== item.id && (
                                                        <>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full" 
                                                                onClick={(e) => { 
                                                                    e.stopPropagation(); 
                                                                    setEditingItem(item);
                                                                    setShowEditRepair(true);
                                                                }}
                                                            >
                                                                <Edit2 className="h-4 w-4" />
                                                            </Button>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full" 
                                                                onClick={(e) => { e.stopPropagation(); handleDeleteRepair(item.id); }}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                        </div>
                                    ); })}
                                    {isManagementMode && (
                                        <div className="p-2 bg-muted/20 flex justify-center">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="text-xs text-muted-foreground hover:text-primary gap-1 w-full"
                                                onClick={() => {
                                                    setAddRepairTarget({ brand: selectedBrand!, model: modelName })
                                                    setShowAddRepair(true)
                                                }}
                                            >
                                                <Plus className="w-3 h-3" /> 添加维修项
                                            </Button>
                                        </div>
                                    )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          )}

          {/* 3. Search Results (Brand Aggregation -> Model Aggregation) */}
          {searchQuery && (
            <div className="space-y-4 px-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground px-2">
                    {searchSelectedBrand ? (
                         <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2 rounded-full font-medium text-foreground hover:bg-muted/50 gap-1" 
                            onClick={() => setSearchSelectedBrand(null)}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            返回品牌列表
                        </Button>
                    ) : (
                        <>
                            <Search className="w-4 h-4" />
                            搜索结果: "{searchQuery}"
                        </>
                    )}
                </div>
                
                {!searchSelectedBrand ? (
                    // Level 1: Display Matching Brands
                    groupedByBrandInSearch && Object.keys(groupedByBrandInSearch).length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                             {Object.entries(groupedByBrandInSearch).map(([brand, items]) => (
                                <motion.div
                                    key={brand}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setSearchSelectedBrand(brand)}
                                    className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-border/50 hover:border-primary/50 cursor-pointer shadow-sm transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <BrandIcon brand={brand} className="w-6 h-6" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold text-foreground">{brand}</h3>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {new Set(items.map(i => i.model)).size} 款匹配机型
                                        </p>
                                    </div>
                                </motion.div>
                             ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                            <AlertCircle className="w-10 h-10 opacity-20" />
                            <p>未找到匹配的内容</p>
                        </div>
                    )
                ) : (
                    // Level 2: Display Matching Models for Selected Brand
                    <div className="space-y-3">
                        {Object.entries(groupedByModel!).map(([modelName, items]) => {
                            const brand = items[0].brand;
                            return (
                                <Accordion type="single" collapsible key={modelName} className="w-full">
                                    <AccordionItem value={modelName} className="border rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden shadow-sm data-[state=open]:border-primary/50 data-[state=open]:bg-white dark:data-[state=open]:bg-zinc-900 transition-all">
                                    <AccordionTrigger className="px-4 py-4 hover:no-underline active:bg-muted/30 transition-colors">
                                            <div className="flex flex-col gap-2 flex-1 min-w-0 text-left">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                        <BrandIcon brand={brand} className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between w-full">
                                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                                <span className="font-medium text-base truncate block">{modelName}</span>
                                                                <div className="flex">
                                                                    <Badge variant="secondary" className="text-[10px] h-4 px-1.5 rounded-full font-normal text-muted-foreground truncate max-w-[120px]">
                                                                        {items[0].category}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground whitespace-nowrap ml-2 shrink-0">
                                                                {items.length} 个报价
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {items[0].model_code && !(items[0].brand.toUpperCase() === 'APPLE' && items[0].category?.includes('iPhone')) && (
                                                    <div className="flex flex-wrap gap-1.5 pl-11">
                                                        {items[0].model_code.split(',').map((code, idx) => (
                                                            <Badge 
                                                                key={idx} 
                                                                variant="secondary" 
                                                                className="text-[10px] h-5 px-1.5 bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-md font-mono shrink-0"
                                                            >
                                                                {code.trim()}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}

                                                {isManagementMode && (
                                                    <div className="flex gap-2 mt-2 pl-11" onClick={(e) => e.stopPropagation()}>
                                                        <div
                                                            role="button"
                                                            tabIndex={0}
                                                            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-7 px-2 text-xs gap-1 cursor-pointer")}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEditingModelTarget({ brand: brand, model: modelName });
                                                                setShowEditModel(true);
                                                            }}
                                                        >
                                                            <Edit2 className="h-3 w-3" /> 编辑
                                                        </div>
                                                        <div
                                                            role="button"
                                                            tabIndex={0}
                                                            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-7 px-2 text-xs gap-1 text-destructive hover:text-destructive cursor-pointer")}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteModel(brand, modelName);
                                                            }}
                                                        >
                                                            <Trash2 className="h-3 w-3" /> 删除
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-0">
                                            <div className="flex flex-col divide-y border-t bg-background/50">
                                                {sortRepairItems(items).map((item) => {
                                                    const { mainName, tag, tagColor } = parseRepairItemDisplay(item.repair_item);
                                                    return (
                                                    <div key={item.id} className="flex items-center justify-between py-3 px-4 active:bg-muted/50 transition-colors cursor-default">
                                                        <div className="flex-1 min-w-0 pr-4">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-medium text-sm text-foreground/90">{mainName}</span>
                                                                {tag && (
                                                                    <Badge variant="outline" className={cn("text-[10px] h-5 px-1.5 border shrink-0", tagColor)}>
                                                                        {tag}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                {item.warranty && (
                                                                    <span className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> 保修 {item.warranty}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                        {isManagementMode && quickEditingId === item.id ? (
                                                            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                                                                <Input 
                                                                    autoFocus
                                                                    className="h-8 w-24 sm:w-28 px-2 py-1 text-right font-bold text-base"
                                                                    value={quickEditPrice}
                                                                    onChange={(e) => setQuickEditPrice(e.target.value)}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter') saveQuickEdit(item);
                                                                        if (e.key === 'Escape') cancelQuickEdit();
                                                                    }}
                                                                    onBlur={() => saveQuickEdit(item)} // Auto save on blur
                                                                    type="number"
                                                                />
                                                                <span className="text-sm font-medium">€</span>
                                                            </div>
                                                        ) : (
                                                            <span 
                                                                className={cn(
                                                                    "font-bold text-primary text-base mr-2 transition-colors",
                                                                    isManagementMode && "cursor-pointer hover:text-primary/80 hover:underline decoration-dashed underline-offset-4"
                                                                )}
                                                                onClick={(e) => {
                                                                    if (isManagementMode) {
                                                                        e.stopPropagation();
                                                                        startQuickEdit(item);
                                                                    }
                                                                }}
                                                                title={isManagementMode ? "点击快速修改价格" : undefined}
                                                            >
                                                                €{item.price}
                                                            </span>
                                                        )}
                                                        
                                                        {isManagementMode && quickEditingId !== item.id && (
                                                            <>
                                                                <Button 
                                                                    variant="ghost" 
                                                                    size="icon" 
                                                                    className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full" 
                                                                    onClick={(e) => { 
                                                                        e.stopPropagation(); 
                                                                        setEditingItem(item);
                                                                        setShowEditRepair(true);
                                                                    }}
                                                                >
                                                                    <Edit2 className="h-4 w-4" />
                                                                </Button>
                                                                <Button 
                                                                    variant="ghost" 
                                                                    size="icon" 
                                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full" 
                                                                    onClick={(e) => { e.stopPropagation(); handleDeleteRepair(item.id); }}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                    </div>
                                                ); })}
                                                {isManagementMode && (
                                                    <div className="p-2 bg-muted/20 flex justify-center">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className="text-xs text-muted-foreground hover:text-primary gap-1 w-full"
                                                            onClick={() => {
                                                                setAddRepairTarget({ brand: brand, model: modelName })
                                                                setShowAddRepair(true)
                                                            }}
                                                        >
                                                            <Plus className="w-3 h-3" /> 添加维修项
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            );
                        })}
                    </div>
                )}
            </div>
          )}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Confirmation Dialog */}
      <AlertDialog open={deleteConfirmation.isOpen} onOpenChange={(open) => setDeleteConfirmation(prev => ({ ...prev, isOpen: open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteConfirmation.type === 'repair' 
                ? '此操作无法撤销。这将永久删除该维修项目及报价。'
                : `此操作无法撤销。这将永久删除 ${deleteConfirmation.model} 的所有数据，包括所有维修报价。`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={executeDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={importPreviewOpen}
        onOpenChange={(open) => {
          setImportPreviewOpen(open)
          if (!open) {
            setImportPreview(null)
            setImportPendingFile(null)
            if (importCsvInputRef.current) importCsvInputRef.current.value = ''
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认导入 CSV？</AlertDialogTitle>
            <AlertDialogDescription>
              默认采用合并更新：相同品牌/型号/维修项/品质会更新，不会重复插入。
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-2 text-sm">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span>解析行数：{importPreview?.parsed ?? 0}</span>
              <span>预计新增：{importPreview?.willInsert ?? 0}</span>
              <span>预计更新：{importPreview?.willUpdate ?? 0}</span>
            </div>

            {(importPreview?.errors?.length || 0) > 0 && (
              <div className="rounded-md border p-2 bg-muted/30">
                <div className="font-medium mb-1">发现错误（前 50 条）</div>
                <div className="max-h-40 overflow-auto text-xs space-y-1">
                  {importPreview?.errors?.map((e, i) => (
                    <div key={`${e.row}-${i}`}>
                      第 {e.row} 行：{e.message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={importRunning}>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmImportCSV}
              disabled={importRunning || ((importPreview?.errors?.length || 0) > 0)}
            >
              确认导入
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialogs */}
      <AddModelDialog 
        isOpen={showAddModel} 
        onClose={() => setShowAddModel(false)} 
        onAdd={handleAddModel} 
        existingBrands={brands} 
      />
      
      {addRepairTarget && (
        <AddRepairDialog
          isOpen={showAddRepair}
          onClose={() => { setShowAddRepair(false); setAddRepairTarget(null) }}
          brand={addRepairTarget.brand}
          model={addRepairTarget.model}
          onAdd={handleAddRepair}
        />
      )}

      {editingItem && (
        <EditRepairDialog
          isOpen={showEditRepair}
          onClose={() => { setShowEditRepair(false); setEditingItem(null) }}
          onSave={handleUpdateRepair}
          initialData={{
            id: editingItem.id,
            label: editingItem.repair_item,
            type: editingItem.repair_type || 'screen',
            quality: editingItem.quality,
            price: editingItem.price.toString(),
            warranty: editingItem.warranty
          }}
        />
      )}
      {editingModelTarget && (
        <EditModelDialog
          isOpen={showEditModel}
          onClose={() => { setShowEditModel(false); setEditingModelTarget(null) }}
          onSave={handleRenameModel}
          brand={editingModelTarget.brand}
          currentModelName={editingModelTarget.model}
          // We need to pass the current model code. 
          // Since editingModelTarget only has brand/model, we need to find an item.
          // We can find any item belonging to this model to get the code.
          currentModelCode={activeItems.find(i => i.brand === editingModelTarget.brand && i.model === editingModelTarget.model)?.model_code}
        />
      )}
    </div>
  )
}
