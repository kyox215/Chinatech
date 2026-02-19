
"use client"

import * as React from "react"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  Database, 
  Cloud, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react"
import * as XLSX from "xlsx"
import { createClient } from "@supabase/supabase-js"
import { Order, OrderStatus } from "./order-list"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function DataBackupDialog({ trigger }: { trigger: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isExporting, setIsExporting] = React.useState(false)
  const [isImporting, setIsImporting] = React.useState(false)
  const [importResult, setImportResult] = React.useState<{ success: number; failed: number; total: number } | null>(null)

  const handleExportExcel = async () => {
    setIsExporting(true)
    try {
      // Fetch all data
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error || !data) throw new Error("Fetch failed")

      // Transform data for Excel
      const excelData = data.map(order => ({
        "工单号": order.ticket_no,
        "状态": order.status,
        "客户姓名": order.customer_name,
        "客户电话": order.customer_phone,
        "品牌": order.brand,
        "型号": order.model,
        "IMEI": order.imei,
        "故障描述": order.issue,
        "总价": order.price,
        "定金": order.deposit,
        "留机": order.is_device_left ? "是" : "否",
        "配件": order.accessories_left,
        "创建时间": new Date(order.created_at).toLocaleString(),
        "完成时间": order.completed_at ? new Date(order.completed_at).toLocaleString() : "",
        "技术员": order.technician
      }))

      // Create workbook
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(excelData)
      XLSX.utils.book_append_sheet(wb, ws, "Orders")

      // Download
      const date = new Date().toISOString().split('T')[0]
      XLSX.writeFile(wb, `ChinaTech_Orders_${date}.xlsx`)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportJSON = async () => {
    setIsExporting(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error || !data) throw new Error("Fetch failed")

      const jsonString = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonString], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement("a")
      link.href = url
      link.download = `ChinaTech_Backup_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Export JSON failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setImportResult(null)

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[]

      let successCount = 0
      let failedCount = 0

      for (const row of jsonData) {
        // Simple mapping based on column names or English keys
        // Assuming user uses the same template as export or smart mapping
        const orderData = {
          ticket_no: row["工单号"] || row["ticket_no"] || `IMP${Math.floor(Math.random()*1000)}`,
          status: 'pending', // Default for import
          customer_name: row["客户姓名"] || row["customer_name"] || "Unknown",
          customer_phone: row["客户电话"] || row["customer_phone"] || "",
          brand: row["品牌"] || row["brand"] || "",
          model: row["型号"] || row["model"] || "",
          issue: row["故障描述"] || row["issue"] || "",
          price: Number(row["总价"] || row["price"] || 0),
          deposit: Number(row["定金"] || row["deposit"] || 0),
          is_device_left: (row["留机"] === "是" || row["is_device_left"] === true),
          created_at: new Date().toISOString()
        }

        const { error } = await supabase.from('orders').insert(orderData)
        if (error) {
          console.error("Import row error:", error)
          failedCount++
        } else {
          successCount++
        }
      }

      setImportResult({
        success: successCount,
        failed: failedCount,
        total: jsonData.length
      })
    } catch (error) {
      console.error("Import failed:", error)
      setImportResult({ success: 0, failed: 0, total: 0 })
    } finally {
      setIsImporting(false)
      // Reset input
      e.target.value = ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>数据备份与迁移</DialogTitle>
          <DialogDescription>
            导出 Excel 表格或 JSON 备份文件，确保数据安全。支持从 Excel 批量导入订单。
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export">导出 / 备份</TabsTrigger>
            <TabsTrigger value="import">导入 / 恢复</TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                onClick={handleExportExcel}
                disabled={isExporting}
              >
                {isExporting ? <Loader2 className="h-6 w-6 animate-spin" /> : <FileSpreadsheet className="h-6 w-6" />}
                <span>导出 Excel</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                onClick={handleExportJSON}
                disabled={isExporting}
              >
                {isExporting ? <Loader2 className="h-6 w-6 animate-spin" /> : <Database className="h-6 w-6" />}
                <span>JSON 全量备份</span>
              </Button>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg text-xs text-muted-foreground flex gap-2">
              <Cloud className="h-4 w-4 shrink-0" />
              <p>
                建议定期下载 JSON 备份文件，并手动上传至您的 iCloud Drive 或 Google Drive 文件夹，以实现云端双重保险。
              </p>
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-4 py-4">
            <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2 hover:bg-muted/50 transition-colors relative">
              <input 
                type="file" 
                accept=".xlsx,.xls,.csv" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleFileUpload}
                disabled={isImporting}
              />
              {isImporting ? (
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              ) : (
                <Upload className="h-8 w-8 text-muted-foreground" />
              )}
              <div className="text-sm font-medium">点击上传 Excel 文件</div>
              <div className="text-xs text-muted-foreground">支持 .xlsx, .csv 格式</div>
            </div>

            {importResult && (
              <Alert variant={importResult.failed > 0 ? "destructive" : "default"} className={importResult.failed > 0 ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"}>
                {importResult.failed > 0 ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4 text-green-600" />}
                <AlertTitle>{importResult.failed > 0 ? "导入完成，但有错误" : "导入成功"}</AlertTitle>
                <AlertDescription className="text-xs">
                  共处理 {importResult.total} 条数据。成功: {importResult.success}, 失败: {importResult.failed}。
                </AlertDescription>
              </Alert>
            )}
            
            <div className="text-xs text-muted-foreground">
              * 请确保 Excel 包含“客户姓名”、“电话”、“品牌”等列头，否则可能无法正确识别。
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
