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
  Tag,
  Hash,
  Wrench,
  Euro,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  MessageSquare,
  XCircle,
  Archive,
  Save
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
import { Separator } from "@/components/ui/separator"
import { createClient } from "@supabase/supabase-js"
import { Order, OrderStatus } from "./order-list"
import { toast } from "sonner"
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
]

const ACCESSORIES = [
  { id: "SIM", label: "SIM卡", icon: Disc },
  { id: "Cover", label: "手机壳", icon: CaseUpper },
  { id: "Scatola", label: "包装盒", icon: Package },
  { id: "Caricatore", label: "充电器", icon: Cable },
]

const STATUS_OPTIONS: { value: OrderStatus; label: string; icon: any; color: string }[] = [
  { value: 'pending', label: "待处理", icon: Clock, color: "text-slate-600 bg-slate-100" },
  { value: 'parts_ordered', label: "配件订购中", icon: Truck, color: "text-blue-600 bg-blue-100" },
  { value: 'parts_arrived', label: "配件已到", icon: Package, color: "text-indigo-600 bg-indigo-100" },
  { value: 'in_progress', label: "维修中", icon: Wrench, color: "text-orange-600 bg-orange-100" },
  { value: 'notified', label: "已通知客户", icon: MessageSquare, color: "text-purple-600 bg-purple-100" },
  { value: 'ready', label: "待取机", icon: CheckCircle2, color: "text-green-600 bg-green-100" },
  { value: 'completed', label: "已完成", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-100" },
  { value: 'long_wait', label: "长期滞留", icon: AlertCircle, color: "text-yellow-600 bg-yellow-100" },
  { value: 'cancelled', label: "已取消", icon: XCircle, color: "text-red-600 bg-red-100" },
]

const editOrderSchema = z.object({
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
  status: z.enum(['pending', 'parts_ordered', 'parts_arrived', 'in_progress', 'notified', 'ready', 'completed', 'cancelled', 'long_wait']),
  technician: z.string().optional(),
})

type EditOrderValues = z.infer<typeof editOrderSchema>

interface EditOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
  onSuccess: (updatedOrder: Order) => void
}

export function EditOrderDialog({ open, onOpenChange, order, onSuccess }: EditOrderDialogProps) {
  const [isSaving, setIsSaving] = React.useState(false)

  const form = useForm<EditOrderValues>({
    resolver: zodResolver(editOrderSchema),
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
      status: "pending",
      technician: "",
    },
  })

  // Reset form when dialog opens with new order data
  React.useEffect(() => {
    if (open && order) {
      form.reset({
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        brand: order.brand,
        model: order.model,
        imei: (order as any).imei || "", // Use any if imei is missing in type but present in DB
        issue: order.issue || "",
        price: order.price,
        deposit: order.deposit,
        is_device_left: order.is_device_left,
        accessories_left: order.accessories_left || "",
        status: order.status,
        technician: order.technician || "",
      })
    }
  }, [open, order, form])

  async function onSubmit(data: EditOrderValues) {
    if (!order) return

    setIsSaving(true)
    try {
      const updates: any = {
        ...data,
        updated_at: new Date().toISOString(),
      }

      // If status changed to completed, set completed_at
      if (data.status === 'completed' && order.status !== 'completed') {
        updates.completed_at = new Date().toISOString()
      }

      const { data: updatedOrder, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', order.id)
        .select()
        .single()

      if (error) throw error

      if (updatedOrder) {
        onSuccess(updatedOrder as Order)
        onOpenChange(false)
        toast.success("订单已更新")
      }
    } catch (error) {
      console.error('Failed to update order:', error)
      toast.error("更新失败，请重试")
    } finally {
      setIsSaving(false)
    }
  }

  if (!order) return null

  const currentStatus = STATUS_OPTIONS.find(s => s.value === form.watch('status')) || STATUS_OPTIONS[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[90vh] flex flex-col p-0 gap-0 overflow-hidden sm:rounded-xl">
        {/* Header */}
        <div className="bg-muted/30 border-b px-6 py-4 flex flex-col gap-1 shrink-0">
          <div className="flex items-center justify-between pr-8">
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs bg-background">
                    {order.ticket_no}
                </Badge>
                <Badge variant="secondary" className={cn("text-xs font-medium gap-1", currentStatus.color)}>
                    <currentStatus.icon className="h-3 w-3" />
                    {currentStatus.label}
                </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
                创建于 {new Date(order.created_at).toLocaleDateString()}
            </div>
          </div>
          <DialogTitle className="text-lg font-semibold mt-1">编辑订单</DialogTitle>
          <DialogDescription className="hidden">
            编辑订单详细信息
          </DialogDescription>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden bg-background">
            <ScrollArea className="flex-1">
              <div className="px-6 py-6 space-y-8">
                
                {/* Status Section - Prominent */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        订单状态
                    </h3>
                    <div className="p-4 rounded-xl border bg-muted/20">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">状态</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-11 bg-background">
                                                <SelectValue placeholder="选择状态" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {STATUS_OPTIONS.map(status => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    <div className="flex items-center gap-2">
                                                        <status.icon className={cn("h-4 w-4", status.color.split(' ')[0])} />
                                                        <span>{status.label}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Separator />

                {/* Customer Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    客户信息
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="customer_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">姓名</FormLabel>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                              <Input className="pl-9" placeholder="客户姓名" {...field} />
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
                          <FormLabel className="text-xs">电话</FormLabel>
                          <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                              <Input className="pl-9" placeholder="联系电话" type="tel" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                {/* Device Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    设备详情
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">品牌</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="品牌" />
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
                          <FormLabel className="text-xs">型号</FormLabel>
                          <FormControl>
                            <Input placeholder="型号" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="imei"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">IMEI / 序列号</FormLabel>
                        <div className="relative">
                            <Hash className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                            <Input className="pl-9" placeholder="可选" {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="issue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">故障描述</FormLabel>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {ISSUES.map(issue => (
                            <Badge
                              key={issue.id}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary active:scale-95 transition-all py-1 px-2.5 text-xs font-normal"
                              onClick={() => {
                                const current = field.value || ""
                                const newValue = current ? `${current}, ${issue.label}` : issue.label
                                field.onChange(newValue)
                              }}
                            >
                              <issue.icon className="mr-1.5 h-3 w-3" />
                              {issue.label}
                            </Badge>
                          ))}
                        </div>
                        <FormControl>
                          <Textarea className="min-h-[80px]" placeholder="描述故障情况..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                {/* Service & Financials */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    服务与财务
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">总价 (€)</FormLabel>
                          <div className="relative">
                            <Euro className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                              <Input className="pl-9" type="number" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deposit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">定金 (€)</FormLabel>
                          <div className="relative">
                            <Euro className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                              <Input className="pl-9" type="number" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="technician"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-xs">负责技术员</FormLabel>
                        <div className="relative">
                            <Wrench className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input className="pl-9" placeholder="例如: Alex" {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                  
                  <FormField
                    control={form.control}
                    name="is_device_left"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-xl border bg-card p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm">客户留机</FormLabel>
                          <FormDescription className="text-xs">
                            设备是否留在店内维修
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accessories_left"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">留下的配件</FormLabel>
                        <div className="mb-2">
                          <ToggleGroup 
                            type="multiple" 
                            variant="outline"
                            value={field.value ? field.value.split(',').map(v => v.trim()).filter(Boolean) : []}
                            onValueChange={(vals) => field.onChange(vals.join(', '))}
                            className="justify-start flex-wrap gap-2"
                          >
                            {ACCESSORIES.map(acc => (
                              <ToggleGroupItem key={acc.id} value={acc.label} aria-label={acc.label} className="h-8 px-2.5 text-xs gap-1.5 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:border-primary">
                                <acc.icon className="h-3 w-3" />
                                {acc.label}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </div>
                        <FormControl>
                          <Input placeholder="手动输入..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-background/80 backdrop-blur shrink-0 flex gap-3 justify-end items-center">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isSaving} className="h-10 px-4">
                取消
              </Button>
              <Button type="submit" disabled={isSaving} className="h-10 px-6 shadow-lg shadow-primary/20">
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                保存修改
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
