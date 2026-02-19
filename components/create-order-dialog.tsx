"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Loader2, 
  Smartphone, 
  Battery, 
  Zap, 
  Camera, 
  Droplets, 
  Cpu, 
  Settings, 
  CaseUpper, 
  Disc, 
  Cable,
  Package,
  User,
  Phone,
  ScanFace,
  Speaker,
  Mic,
  Power,
  Search,
  Check,
  CreditCard,
  Wrench,
  Headphones
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@supabase/supabase-js"
import { Order } from "./order-list"
import { cn } from "@/lib/utils"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const BRANDS = ["Apple", "Samsung", "Huawei", "Xiaomi", "Oppo", "Honor", "Realme", "OnePlus", "Google"]

const ISSUES = [
  { id: "Schermo", label: "屏幕", icon: Smartphone },
  { id: "Batteria", label: "电池", icon: Battery },
  { id: "Ricarica", label: "尾插", icon: Zap },
  { id: "Fotocamera", label: "摄像头", icon: Camera },
  { id: "Acqua", label: "进水", icon: Droplets },
  { id: "Scheda Madre", label: "主板", icon: Cpu },
  { id: "Software", label: "系统", icon: Settings },
  { id: "BackCover", label: "后盖", icon: CaseUpper },
  { id: "FaceID", label: "面容/指纹", icon: ScanFace },
  { id: "Speaker", label: "听筒/扬声器", icon: Speaker },
  { id: "Mic", label: "麦克风", icon: Mic },
  { id: "Buttons", label: "按键", icon: Power },
]

const ACCESSORIES = [
  { id: "SIM", label: "SIM卡", icon: Disc },
  { id: "Cover", label: "手机壳", icon: CaseUpper },
  { id: "Scatola", label: "包装盒", icon: Package },
  { id: "Caricatore", label: "充电头", icon: Zap },
  { id: "Cavo", label: "数据线", icon: Cable },
  { id: "Cuffie", label: "耳机", icon: Headphones },
]

const createOrderSchema = z.object({
  customer_name: z.string().min(1, "请输入客户姓名"),
  customer_phone: z.string().min(1, "请输入客户电话"),
  brand: z.string().min(1, "请选择品牌"),
  model: z.string().min(1, "请输入型号"),
  imei: z.string().optional(),
  issue: z.string().optional(),
  price: z.coerce.number().min(0),
  deposit: z.coerce.number().min(0),
  is_device_left: z.boolean(),
  accessories_left: z.string().optional(),
  technician: z.string().optional(),
})

type CreateOrderValues = z.infer<typeof createOrderSchema>

interface CreateOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (newOrder: Order) => void
}

export function CreateOrderDialog({ open, onOpenChange, onSuccess }: CreateOrderDialogProps) {
  const [isSaving, setIsSaving] = React.useState(false)

  const form = useForm<CreateOrderValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customer_name: "",
      customer_phone: "",
      brand: "",
      model: "",
      imei: "",
      issue: "",
      price: 0,
      deposit: 0,
      is_device_left: true,
      accessories_left: "",
      technician: "",
    },
  })

  // Reset form when dialog opens
  React.useEffect(() => {
    if (open) {
      form.reset({
        customer_name: "",
        customer_phone: "",
        brand: "",
        model: "",
        imei: "",
        issue: "",
        price: 0,
        deposit: 0,
        is_device_left: true,
        accessories_left: "",
        technician: "",
      })
    }
  }, [open, form])

  async function onSubmit(data: CreateOrderValues) {
    setIsSaving(true)
    try {
      // Generate Ticket No: YYYYMMDD-XXXX
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "")
      const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString()
      const ticketNo = `${dateStr}-${randomSuffix}`

      const { data: newOrder, error } = await supabase
        .from('orders')
        .insert({
          ...data,
          ticket_no: ticketNo,
          status: 'pending', // Default status
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error

      if (newOrder) {
        onSuccess(newOrder as Order)
        onOpenChange(false)
      }
    } catch (error) {
      console.error('Failed to create order:', error)
      // Toast handled by parent or add local error state
    } finally {
      setIsSaving(false)
    }
  }

  // Helper to toggle selection strings
  const toggleSelection = (current: string | undefined, item: string) => {
    const items = current ? current.split(',').map(i => i.trim()).filter(Boolean) : []
    if (items.includes(item)) {
      return items.filter(i => i !== item).join(', ')
    } else {
      return [...items, item].join(', ')
    }
  }

  const isSelected = (current: string | undefined, item: string) => {
    const items = current ? current.split(',').map(i => i.trim()).filter(Boolean) : []
    return items.includes(item)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b shrink-0 bg-muted/10">
          <DialogTitle className="text-lg">新建维修订单</DialogTitle>
          <DialogDescription>
            填写客户和设备信息以创建新工单。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <ScrollArea className="flex-1">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                  
                  {/* Left Column: Basic Info (4/12) */}
                  <div className="md:col-span-4 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                        <User className="h-4 w-4" /> 客户信息
                      </h3>
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="customer_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">姓名 <span className="text-red-500">*</span></FormLabel>
                              <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <FormControl>
                                  <Input className="pl-9 bg-muted/20" placeholder="客户姓名" {...field} />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="customer_phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">电话 <span className="text-red-500">*</span></FormLabel>
                              <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <FormControl>
                                  <Input className="pl-9 bg-muted/20" placeholder="联系电话" type="tel" {...field} />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                        <Smartphone className="h-4 w-4" /> 设备信息
                      </h3>
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="brand"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">品牌 <span className="text-red-500">*</span></FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-muted/20">
                                    <SelectValue placeholder="选择品牌" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {BRANDS.map(brand => (
                                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                  ))}
                                  <SelectItem value="Other">其他</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">型号 <span className="text-red-500">*</span></FormLabel>
                              <FormControl>
                                <Input className="bg-muted/20" placeholder="例如: iPhone 13" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="imei"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">IMEI / 序列号</FormLabel>
                              <FormControl>
                                <Input className="bg-muted/20 font-mono text-xs" placeholder="可选" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Issue Diagnosis (5/12) */}
                  <div className="md:col-span-5 space-y-6 md:border-l md:pl-8 md:border-r md:pr-8 border-dashed">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                        <Wrench className="h-4 w-4" /> 故障诊断
                      </h3>
                      
                      <FormField
                        control={form.control}
                        name="issue"
                        render={({ field }) => (
                          <FormItem className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                              {ISSUES.map(issue => {
                                const active = isSelected(field.value, issue.label)
                                return (
                                  <div
                                    key={issue.id}
                                    onClick={() => field.onChange(toggleSelection(field.value, issue.label))}
                                    className={cn(
                                      "cursor-pointer flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200",
                                      active 
                                        ? "bg-primary/10 border-primary text-primary shadow-sm ring-1 ring-primary/20" 
                                        : "bg-card hover:bg-muted/50 hover:border-primary/30 text-muted-foreground"
                                    )}
                                  >
                                    <issue.icon className={cn("h-5 w-5", active ? "text-primary" : "opacity-70")} />
                                    <span className="text-[10px] font-medium text-center leading-tight">{issue.label}</span>
                                    {active && <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />}
                                  </div>
                                )
                              })}
                            </div>
                            
                            <div className="pt-2">
                              <FormLabel className="text-xs mb-1.5 block text-muted-foreground">故障备注 / 其他问题</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="详细描述故障情况..." 
                                  className="min-h-[80px] bg-muted/20 resize-none focus-visible:ring-primary/20" 
                                  {...field} 
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Right Column: Service & Financials (3/12) */}
                  <div className="md:col-span-3 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                        <CreditCard className="h-4 w-4" /> 财务 & 服务
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-muted-foreground">总价 (€)</FormLabel>
                              <FormControl>
                                <Input type="number" className="font-semibold text-lg bg-muted/20 h-10" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="deposit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-muted-foreground">定金 (€)</FormLabel>
                              <FormControl>
                                <Input type="number" className="font-medium bg-muted/20 h-10" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="is_device_left"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border bg-muted/20 p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-xs font-medium">客户留机维修</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="scale-90"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2 pt-2">
                        <FormLabel className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                            <Package className="h-3.5 w-3.5" /> 留下的配件
                        </FormLabel>
                        <FormField
                            control={form.control}
                            name="accessories_left"
                            render={({ field }) => (
                            <FormItem>
                                <div className="grid grid-cols-2 gap-2">
                                {ACCESSORIES.map(acc => {
                                    const active = isSelected(field.value, acc.label)
                                    return (
                                    <div
                                        key={acc.id}
                                        onClick={() => field.onChange(toggleSelection(field.value, acc.label))}
                                        className={cn(
                                        "cursor-pointer flex items-center gap-2 p-2 rounded-lg border transition-all duration-200",
                                        active 
                                            ? "bg-primary/10 border-primary text-primary" 
                                            : "bg-card hover:bg-muted/50 text-muted-foreground"
                                        )}
                                    >
                                        <acc.icon className="h-3.5 w-3.5 shrink-0" />
                                        <span className="text-[10px] font-medium truncate">{acc.label}</span>
                                        {active && <Check className="ml-auto h-3 w-3" />}
                                    </div>
                                    )
                                })}
                                </div>
                                <FormControl className="mt-2">
                                <Input placeholder="其他配件..." className="h-8 text-xs bg-muted/20 mt-2" {...field} />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                      </div>

                      <FormField
                          control={form.control}
                          name="technician"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-muted-foreground">技术员</FormLabel>
                              <FormControl>
                                <Input className="h-9 bg-muted/20" placeholder="可选" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                  </div>

                </div>
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-background shrink-0 flex gap-3 justify-end items-center">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isSaving} className="h-10 px-4">
                取消
              </Button>
              <Button type="submit" disabled={isSaving} className="h-10 px-8 shadow-lg shadow-primary/20">
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                创建订单
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
