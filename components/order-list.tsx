"use client"

import * as React from "react"
import { 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  Smartphone, 
  Home, 
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  Truck,
  XCircle,
  MoreHorizontal,
  Archive,
  History,
  ListFilter,
  Database
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { createClient } from "@supabase/supabase-js"
import { DataBackupDialog } from "./data-backup"
import { CreateOrderDialog } from "./create-order-dialog"
import { EditOrderDialog } from "./edit-order-dialog"
import { toast } from "sonner"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type OrderStatus = 
  | 'pending' 
  | 'parts_ordered' 
  | 'parts_arrived' 
  | 'in_progress' 
  | 'notified' 
  | 'ready' 
  | 'completed' 
  | 'cancelled' 
  | 'long_wait'

export interface Order {
  id: string
  ticket_no: string
  status: OrderStatus
  customer_name: string
  customer_phone: string
  brand: string
  model: string
  issue: string
  price: number
  deposit: number
  is_device_left: boolean
  accessories_left?: string
  created_at: string
  completed_at?: string
  technician?: string
}

const statusConfig: Record<OrderStatus, { label: string, color: string, icon: any }> = {
  pending: { label: "待处理", color: "bg-slate-100 text-slate-700", icon: Clock },
  parts_ordered: { label: "已订购", color: "bg-blue-100 text-blue-700", icon: Truck },
  parts_arrived: { label: "配件到", color: "bg-indigo-100 text-indigo-700", icon: Package },
  in_progress: { label: "维修中", color: "bg-orange-100 text-orange-700", icon: Smartphone },
  notified: { label: "已通知", color: "bg-purple-100 text-purple-700", icon: MessageSquare },
  ready: { label: "待取机", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  completed: { label: "已完成", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  cancelled: { label: "已取消", color: "bg-red-50 text-red-500", icon: XCircle },
  long_wait: { label: "滞留", color: "bg-yellow-100 text-yellow-700", icon: AlertCircle },
}

export function OrderList({ 
    refreshTrigger 
}: { 
    refreshTrigger?: number
}) {
  const [orders, setOrders] = React.useState<Order[]>([])
  const [loading, setLoading] = React.useState(true)
  const [filter, setFilter] = React.useState<string>("active") // active, history, all
  const [search, setSearch] = React.useState("")
  const [isCreateOpen, setIsCreateOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingOrder, setEditingOrder] = React.useState<Order | null>(null)
  
  // Group states
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({
    'notified_ready': true,
    'in_progress': true,
    'parts_ordered': true,
    'pending': true,
    'warranty': false,
    'archived': false,
    'cancelled': false,
    'other': false
  })

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }))
  }

  React.useEffect(() => {
    fetchOrders()
  }, [filter, refreshTrigger])

  const fetchOrders = async () => {
    setLoading(true)
    let query = supabase
      .from('orders')
      .select('id, ticket_no, status, customer_name, customer_phone, brand, model, issue, price, deposit, is_device_left, created_at, completed_at, technician')
      .order('created_at', { ascending: false })
      .limit(100) // Increase limit to handle history logic

    // Filter Logic
    if (filter === 'active') {
      // Fetching non-cancelled items mostly.
      query = query.neq('status', 'cancelled')
    } else if (filter === 'history') {
      // History fetch
    }

    if (search) {
      query = query.or(`customer_phone.ilike.%${search}%,customer_name.ilike.%${search}%,ticket_no.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (!error && data) {
      let filteredData = data as Order[]
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

      if (filter === 'active') {
        filteredData = filteredData.filter(o => {
          // Include if NOT completed/cancelled
          if (!['completed', 'cancelled'].includes(o.status)) return true
          // Include if completed RECENTLY (< 6 months)
          if (o.status === 'completed' && o.completed_at) {
            return new Date(o.completed_at) > sixMonthsAgo
          }
          // Fallback: if completed but no date, assume old -> exclude from active? 
          // Or assume new? Let's exclude to be safe, only show confirmed recent.
          if (o.status === 'completed' && !o.completed_at) return false
          
          return false
        })
      } else if (filter === 'history') {
        filteredData = filteredData.filter(o => {
          // Include if cancelled
          if (o.status === 'cancelled') return true
          // Include if completed LONG AGO (> 6 months)
          if (o.status === 'completed' && o.completed_at) {
            return new Date(o.completed_at) <= sixMonthsAgo
          }
          // Include if completed without date (legacy)
          if (o.status === 'completed' && !o.completed_at) return true
          return false
        })
      }
      
      setOrders(filteredData)
    }
    setLoading(false)
  }

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (search) fetchOrders()
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  // Group orders by status
  const groupedOrders = React.useMemo(() => {
    if (orders.length === 0) return {}
    
    const groups: Record<string, Order[]> = {
      'notified_ready': [], 
      'in_progress': [],    
      'parts_ordered': [],  
      'pending': [],  
      'warranty': [],       // New: Completed < 6 months
      'archived': [],       // New: Completed > 6 months
      'cancelled': [],      // New: Cancelled
      'other': []           
    }

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    orders.forEach(order => {
      if (['notified', 'ready'].includes(order.status)) {
        groups['notified_ready'].push(order)
      } else if (['in_progress', 'parts_arrived'].includes(order.status)) {
        groups['in_progress'].push(order)
      } else if (order.status === 'parts_ordered') {
        groups['parts_ordered'].push(order)
      } else if (order.status === 'pending') {
        groups['pending'].push(order)
      } else if (order.status === 'completed') {
        // Check warranty status
        if (order.completed_at && new Date(order.completed_at) > sixMonthsAgo) {
          groups['warranty'].push(order)
        } else {
          groups['archived'].push(order)
        }
      } else if (order.status === 'cancelled') {
        groups['cancelled'].push(order)
      } else {
        groups['other'].push(order)
      }
    })

    return groups
  }, [orders])

  const updateStatus = async (e: React.MouseEvent, orderId: string, newStatus: OrderStatus) => {
    e.stopPropagation() // Prevent card click
    
    // Optimistic update
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ))

    const updates: any = { status: newStatus, updated_at: new Date().toISOString() }
    if (newStatus === 'completed') {
        updates.completed_at = new Date().toISOString()
    }

    const { error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
    
    if (error) {
      // Revert if failed
      fetchOrders()
      toast.error("更新状态失败")
    } else {
      toast.success("状态已更新")
    }
  }

  const handleOrderClick = (order: Order) => {
    setEditingOrder(order)
    setIsEditOpen(true)
  }

  const renderStatusBadge = (order: Order) => {
    const StatusIcon = statusConfig[order.status].icon
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge variant="outline" className={cn("rounded px-1.5 py-0 h-5 border-0 font-medium text-[10px] cursor-pointer hover:bg-muted shadow-sm transition-colors", statusConfig[order.status].color)}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {statusConfig[order.status].label}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuLabel className="text-xs">更改状态</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(Object.keys(statusConfig) as OrderStatus[]).map(status => (
            <DropdownMenuItem 
              key={status}
              onClick={(e) => updateStatus(e, order.id, status)}
              className="text-xs gap-2"
            >
              {React.createElement(statusConfig[status].icon, { className: "h-3 w-3" })}
              {statusConfig[status].label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const renderOrderCard = (order: Order) => {
    // Check if overdue (pending/in_progress > 24h)
    const isOverdue = 
      ['pending', 'in_progress', 'parts_ordered'].includes(order.status) && 
      (new Date().getTime() - new Date(order.created_at).getTime() > 24 * 60 * 60 * 1000)

    // Mobile View (Card)
    const MobileCard = (
      <div 
        key={order.id}
        onClick={() => handleOrderClick(order)}
        className={cn(
          "group relative flex flex-col gap-2 p-3 rounded-xl border bg-card shadow-sm md:hidden cursor-pointer active:scale-[0.98] transition-all",
          isOverdue ? "border-red-200 bg-red-50/30" : "hover:bg-muted/50 hover:shadow-md"
        )}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5">
            <div onClick={e => e.stopPropagation()}>
              {renderStatusBadge(order)}
            </div>
            {isOverdue && (
              <Badge variant="destructive" className="rounded px-1.5 py-0 h-5 text-[10px] gap-1">
                <AlertCircle className="h-3 w-3" /> 超时
              </Badge>
            )}
            {order.is_device_left ? (
              <Badge variant="secondary" className="rounded px-1.5 py-0 h-5 text-[10px] gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100">
                <Smartphone className="h-3 w-3" /> 留
              </Badge>
            ) : (
              <Badge variant="secondary" className="rounded px-1.5 py-0 h-5 text-[10px] gap-1 bg-slate-100 text-slate-500 hover:bg-slate-100">
                <Home className="h-3 w-3" /> 带
              </Badge>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">
            {new Date(order.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-between items-center mt-1">
          <div className="flex-1 min-w-0 mr-2">
            <div className="font-semibold text-sm truncate">{order.brand} {order.model}</div>
            <div className="text-xs text-muted-foreground truncate">{order.issue || "无故障描述"}</div>
          </div>
          <div className="text-right whitespace-nowrap">
            <div className="font-bold text-base">€{order.price}</div>
            {order.deposit > 0 && (
              <div className="text-[10px] text-emerald-600">已付 €{order.deposit}</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-dashed mt-1">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="truncate max-w-[80px]">{order.customer_name}</span>
            <span>•</span>
            <span className="font-mono">{order.customer_phone}</span>
          </div>
          {order.technician && (
            <Badge variant="outline" className="text-[10px] h-4 px-1 rounded-[4px] border-dashed text-muted-foreground">
              {order.technician}
            </Badge>
          )}
        </div>
      </div>
    )

    // Desktop View (Wide Row)
    const DesktopRow = (
      <div 
        key={`desktop-${order.id}`}
        onClick={() => handleOrderClick(order)}
        className={cn(
          "hidden md:flex items-center gap-4 p-3 rounded-lg border bg-card shadow-sm cursor-pointer transition-all",
          isOverdue ? "border-red-200 bg-red-50/20" : "hover:bg-accent/30 hover:shadow-md hover:border-primary/20"
        )}
      >
        {/* Status & ID */}
        <div className="flex flex-col gap-1.5 w-[140px] shrink-0">
          <div onClick={e => e.stopPropagation()} className="flex">
            {renderStatusBadge(order)}
          </div>
          <div className="text-[10px] text-muted-foreground font-mono truncate pl-1">
            {order.ticket_no}
          </div>
        </div>

        {/* Device & Issue */}
        <div className="flex-1 min-w-0 grid grid-cols-2 gap-4">
          <div className="min-w-0">
             <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-sm truncate">{order.brand} {order.model}</span>
                {order.is_device_left ? (
                  <Badge variant="secondary" className="px-1 py-0 h-4 text-[9px] bg-amber-100 text-amber-700">留</Badge>
                ) : (
                  <Badge variant="secondary" className="px-1 py-0 h-4 text-[9px] bg-slate-100 text-slate-500">带</Badge>
                )}
             </div>
             <div className="text-xs text-muted-foreground truncate" title={order.issue}>
               {order.issue || "无故障描述"}
             </div>
          </div>
          
          <div className="min-w-0 flex flex-col justify-center border-l pl-4">
             <div className="text-sm font-medium truncate">{order.customer_name}</div>
             <div className="text-xs text-muted-foreground font-mono">{order.customer_phone}</div>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col items-end gap-1 w-[100px] shrink-0 text-right">
          <div className="font-bold text-base">€{order.price}</div>
          <div className="text-[10px] text-muted-foreground">
            {new Date(order.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    )

    return (
      <>
        {MobileCard}
        {DesktopRow}
      </>
    )
  }

  const renderGroup = (key: string, title: string, color: string, icon: any, count: number) => {
    const Icon = icon
    const isOpen = openGroups[key]
    
    return (
      <Collapsible open={isOpen} onOpenChange={() => toggleGroup(key)} className="space-y-2">
        <CollapsibleTrigger className="flex items-center w-full p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <div className={cn("flex items-center gap-2 text-sm font-medium", color)}>
            <Icon className="h-4 w-4" /> 
            {title}
            <Badge variant="secondary" className={cn("ml-2", color.replace('text-', 'bg-').replace('600', '100'))}>
              {count}
            </Badge>
          </div>
          <ChevronRight className={cn("ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200", isOpen && "rotate-90")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pl-1">
          {/* Mobile Grid (1 col) / Desktop Stack (1 col wide items) */}
          <div className="flex flex-col gap-2">
            {groupedOrders[key].map(renderOrderCard)}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  const overdueCount = React.useMemo(() => {
    return orders.filter(order => 
      ['pending', 'in_progress', 'parts_ordered'].includes(order.status) && 
      (new Date().getTime() - new Date(order.created_at).getTime() > 24 * 60 * 60 * 1000)
    ).length
  }, [orders])

  return (
    <div className="flex flex-col h-full bg-background/50">
      <CreateOrderDialog 
        open={isCreateOpen} 
        onOpenChange={setIsCreateOpen} 
        onSuccess={(newOrder) => {
          fetchOrders()
          toast.success("订单创建成功")
        }} 
      />

      <EditOrderDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        order={editingOrder}
        onSuccess={(updatedOrder) => {
          fetchOrders()
          // Update local state if needed, but fetchOrders handles it
        }} 
      />

      {/* Floating Header Card */}
      <div className="p-4 sticky top-0 z-20 pointer-events-none">
        <div className="bg-background/80 backdrop-blur-xl border shadow-lg shadow-black/5 rounded-2xl p-3 space-y-3 pointer-events-auto">
          {overdueCount > 0 && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50/50 border border-red-100 text-red-600 animate-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="text-xs font-medium">有 {overdueCount} 个订单需紧急处理</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <Input 
                placeholder="搜索电话、姓名、单号..." 
                className="pl-9 h-11 rounded-xl bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-primary/20 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <DataBackupDialog trigger={
              <Button size="icon" variant="outline" className="rounded-xl h-11 w-11 border-transparent bg-muted/50 hover:bg-background hover:border-border">
                <Database className="h-5 w-5 text-muted-foreground" />
              </Button>
            } />
            <Button 
                size="icon" 
                className="rounded-xl h-11 w-11 bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95"
                onClick={() => setIsCreateOpen(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList className="w-full h-10 p-1 bg-muted/30 rounded-xl grid grid-cols-3 gap-1">
              <TabsTrigger value="active" className="rounded-lg text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">进行中</TabsTrigger>
              <TabsTrigger value="history" className="rounded-lg text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">历史</TabsTrigger>
              <TabsTrigger value="all" className="rounded-lg text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">全部</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* List */}
      <ScrollArea className="flex-1 -mt-4 pt-4">
        <div className="px-4 pb-20 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-xs">加载数据中...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Package className="h-10 w-10 opacity-20" />
              <span className="text-xs">暂无相关订单</span>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              {/* Active Groups */}
              {filter === 'active' && (
                <>
                  {groupedOrders['pending'].length > 0 && 
                    renderGroup('pending', '待处理', 'text-slate-600', Clock, groupedOrders['pending'].length)
                  }
                  {groupedOrders['in_progress'].length > 0 && 
                    renderGroup('in_progress', '维修中 / 配件到', 'text-orange-600', Smartphone, groupedOrders['in_progress'].length)
                  }
                  {groupedOrders['parts_ordered'].length > 0 && 
                    renderGroup('parts_ordered', '配件订购中', 'text-blue-600', Truck, groupedOrders['parts_ordered'].length)
                  }
                  {groupedOrders['notified_ready'].length > 0 && 
                    renderGroup('notified_ready', '待取机 / 已通知', 'text-green-600', CheckCircle2, groupedOrders['notified_ready'].length)
                  }
                  {groupedOrders['warranty'].length > 0 && 
                    renderGroup('warranty', '质保期内 (已完成)', 'text-emerald-600', CheckCircle2, groupedOrders['warranty'].length)
                  }
                </>
              )}

              {/* History Groups */}
              {filter === 'history' && (
                <>
                  {groupedOrders['archived'].length > 0 && 
                    renderGroup('archived', '已归档 (>6个月)', 'text-slate-500', Archive, groupedOrders['archived'].length)
                  }
                  {groupedOrders['cancelled'].length > 0 && 
                    renderGroup('cancelled', '已取消', 'text-red-500', XCircle, groupedOrders['cancelled'].length)
                  }
                </>
              )}

              {/* All / Fallback Groups */}
              {(filter === 'all' || groupedOrders['other'].length > 0) && (
                 <>
                    {/* Render all groups for 'all' tab if needed, or simplified view */}
                    {filter === 'all' && (
                      <>
                        {Object.keys(groupedOrders).map(key => {
                           if (groupedOrders[key].length === 0) return null
                           // Map key to title/icon
                           let title = key, color = 'text-slate-600', Icon = MoreHorizontal
                           if (key === 'notified_ready') { title = '待取机'; color='text-green-600'; Icon=CheckCircle2 }
                           if (key === 'in_progress') { title = '维修中'; color='text-orange-600'; Icon=Smartphone }
                           if (key === 'parts_ordered') { title = '订购中'; color='text-blue-600'; Icon=Truck }
                           if (key === 'pending') { title = '待处理'; color='text-slate-600'; Icon=Clock }
                           if (key === 'warranty') { title = '质保期内'; color='text-emerald-600'; Icon=CheckCircle2 }
                           if (key === 'archived') { title = '已归档'; color='text-slate-500'; Icon=Archive }
                           if (key === 'cancelled') { title = '已取消'; color='text-red-500'; Icon=XCircle }
                           
                           return renderGroup(key, title, color, Icon, groupedOrders[key].length)
                        })}
                      </>
                    )}
                    {filter !== 'all' && groupedOrders['other'].length > 0 && 
                      renderGroup('other', '其他', 'text-muted-foreground', MoreHorizontal, groupedOrders['other'].length)
                    }
                 </>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
