"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowLeft, Wrench, Smartphone, Check, X, Filter, Loader2 } from "lucide-react"
import { BrandIcon } from "@/components/brand-icon"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { REPAIR_PRICES, type RepairItem } from "@/lib/data/repair-prices"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

interface RepairAppProps {
  setMainHeaderVisible: (visible: boolean) => void
}

export function RepairApp({ setMainHeaderVisible }: RepairAppProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  
  // Database state
  const [dbItems, setDbItems] = useState<RepairItem[]>([])
  const [loading, setLoading] = useState(true)
  const [usingStaticFallback, setUsingStaticFallback] = useState(false)

  // Fetch data from Supabase on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        // Fetch all items sorted by priority (desc) then model (asc)
        const { data, error } = await supabase
          .from('repair_prices')
          .select('*')
          .order('priority', { ascending: false })
          .order('model', { ascending: true })
        
        if (error) throw error
        
        if (data && data.length > 0) {
            setDbItems(data as unknown as RepairItem[])
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
    
    fetchData()
  }, [])

  // Use dbItems instead of REPAIR_PRICES for all logic below
  const activeItems = dbItems

  // Get unique brands
  const brands = useMemo(() => {
    // We want to preserve the priority order from the DB if possible
    // But we also want unique brands.
    // Since activeItems is already sorted by priority, we can just extract brands in order.
    const brandSet = new Set(activeItems.map((item) => item.brand))
    return Array.from(brandSet)
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
          item.brand.toLowerCase().includes(query)
      )
    }

    return items
  }, [selectedBrand, selectedModel, searchQuery, activeItems])

  // Group items by model if no model is selected but brand is selected
  const groupedByModel = useMemo(() => {
    if (selectedModel || !selectedBrand) return null
    
    const groups: Record<string, RepairItem[]> = {}
    filteredItems.forEach(item => {
        if (!groups[item.model]) groups[item.model] = []
        groups[item.model].push(item)
    })
    return groups
  }, [filteredItems, selectedBrand, selectedModel])

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

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header & Global Search */}
      <div className="flex flex-col gap-4 sticky top-0 z-20 bg-background/95 backdrop-blur pb-2">
        <div className="flex items-center gap-2">
           {selectedBrand && (
            <Button variant="ghost" size="icon" onClick={() => setSelectedBrand(null)} className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
           )}
           <h2 className="text-2xl font-semibold flex items-center gap-2">
             {selectedBrand ? `${selectedBrand} 维修报价` : "维修报价查询"}
             {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
           </h2>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={loading ? "加载数据中..." : "搜索型号、故障 (如 iPhone 13 屏幕)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            className="pl-9 rounded-2xl bg-muted/50 border-transparent focus:bg-background transition-all"
          />
        </div>

        {/* Brand Filter (Horizontal Scroll) */}
        {!selectedBrand && !searchQuery && (
          <ScrollArea className="w-full whitespace-nowrap pb-2">
            <div className="flex w-max space-x-2 p-1">
              {brands.map((brand) => (
                <Button
                  key={brand}
                  variant={selectedBrand === brand ? "default" : "outline"}
                  className="rounded-full px-4"
                  onClick={() => handleBrandSelect(brand)}
                >
                  {brand}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
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
              {brands.map((brand) => (
                <motion.div
                  key={brand}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBrandSelect(brand)}
                  className="flex flex-col items-center gap-2 cursor-pointer group min-w-0"
                >
                  <div className="w-16 h-16 rounded-2xl bg-muted/30 group-hover:bg-primary/5 flex items-center justify-center transition-colors shadow-sm border border-transparent group-hover:border-primary/20 shrink-0">
                    <BrandIcon brand={brand} className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs font-medium text-center truncate w-full max-w-[80px] text-muted-foreground group-hover:text-primary transition-colors block">
                    {brand}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {/* 2. Model Selection View (Brand Selected, No Model Selected) */}
          {selectedBrand && !selectedModel && !searchQuery && groupedByModel && (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">选择型号</h3>
                    <Badge variant="secondary" className="rounded-lg">{models.length} 机型</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Object.entries(groupedByModel).map(([modelName, items]) => (
                        <motion.div
                            key={modelName}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleModelSelect(modelName)}
                        >
                            <Card className="cursor-pointer hover:border-primary/50 transition-colors shadow-none bg-muted/20 border-transparent hover:bg-muted/40 h-full">
                                <CardContent className="p-3 flex flex-col justify-between h-full gap-2">
                                    <span className="font-medium text-sm line-clamp-2 break-all" title={modelName}>{modelName}</span>
                                    <div className="flex justify-between items-center mt-auto">
                                      <Badge variant="outline" className="text-[10px] h-5 px-1.5 bg-background/50 text-muted-foreground border-transparent shrink-0">
                                        {items.length} 维修项
                                      </Badge>
                                      <ArrowLeft className="w-3 h-3 text-muted-foreground rotate-180 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
          )}

          {/* 3. Repair Items List (Leaf Node or Search Results) */}
          {(selectedModel || searchQuery) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredItems.length === 0 ? (
                <div className="col-span-full text-center py-10 text-muted-foreground flex flex-col items-center gap-3">
                  <Search className="w-10 h-10 opacity-20" />
                  <p>未找到相关报价</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    layout
                  >
                    <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm h-full">
                      <CardContent className="p-4 flex flex-col h-full">
                        <div className="flex justify-between items-start gap-3 mb-2">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md truncate max-w-full">
                                        {item.model}
                                    </span>
                                    {item.quality !== 'standard' && (
                                        <Badge className="text-[10px] h-5 px-1.5 bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 shrink-0">
                                            {item.quality}
                                        </Badge>
                                    )}
                                </div>
                                <h4 className="font-semibold text-base leading-tight text-foreground/90 mb-1 line-clamp-2" title={item.repair_item}>
                                  {item.repair_item}
                                </h4>
                            </div>
                            <div className="text-right flex flex-col items-end shrink-0">
                                <span className="text-xl font-bold text-primary">
                                    €{item.price}
                                </span>
                            </div>
                        </div>
                        
                        <div className="mt-auto pt-3 border-t border-dashed flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Check className="h-3.5 w-3.5 text-green-500" />
                                <span>保修 {item.warranty || "无"}</span>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <Wrench className="w-3 h-3" />
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
