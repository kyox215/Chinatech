"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Award,
  Bell,
  BookOpen,
  Bookmark,
  Brush,
  Camera,
  ChevronDown,
  ChevronLeft,
  Cloud,
  Code,
  Crown,
  Download,
  Upload,
  FileText,
  Grid,
  Heart,
  Home,
  ImageIcon,
  Layers,
  LayoutGrid,
  Lightbulb,
  Menu,
  MessageSquare,
  Palette,
  PanelLeft,
  Play,
  Plus,
  Search,
  Settings,
  Share2,
  Sparkles,
  Star,
  Trash,
  TrendingUp,
  Users,
  Video,
  Wand2,
  Clock,
  Eye,
  Archive,
  ArrowUpDown,
  MoreHorizontal,
  Type,
  CuboidIcon,
  X,
  ChevronRight,
  Wrench,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
import { cn } from "@/lib/utils"

import { RecyclingApp } from "@/components/recycling-app"
import { RepairApp } from "@/components/repair-app"
import { OrderManagementApp } from "@/components/order-management-app"

// Sample data for apps
const apps = [
  {
    name: "像素大师 (PixelMaster)",
    icon: <ImageIcon className="text-violet-500" />,
    description: "高级图像编辑与合成工具",
    category: "创意设计",
    recent: true,
    new: false,
    progress: 100,
  },
  {
    name: "矢量专家 (VectorPro)",
    icon: <Brush className="text-orange-500" />,
    description: "专业矢量图形创作软件",
    category: "创意设计",
    recent: true,
    new: false,
    progress: 100,
  },
  {
    name: "视频工作室 (VideoStudio)",
    icon: <Video className="text-pink-500" />,
    description: "电影级视频编辑与制作",
    category: "视频制作",
    recent: true,
    new: false,
    progress: 100,
  },
  {
    name: "动态特效 (MotionFX)",
    icon: <Sparkles className="text-blue-500" />,
    description: "惊艳的视觉特效与动画制作",
    category: "视频制作",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "页面工匠 (PageCraft)",
    icon: <Layers className="text-red-500" />,
    description: "专业页面设计与排版",
    category: "创意设计",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "交互流 (UXFlow)",
    icon: <LayoutGrid className="text-fuchsia-500" />,
    description: "直观的用户体验设计工具",
    category: "设计",
    recent: false,
    new: true,
    progress: 85,
  },
  {
    name: "照片实验室 (PhotoLab)",
    icon: <Camera className="text-teal-500" />,
    description: "高级照片编辑与管理",
    category: "摄影",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "文档大师 (DocMaster)",
    icon: <FileText className="text-red-600" />,
    description: "文档编辑与管理系统",
    category: "文档",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "网页画布 (WebCanvas)",
    icon: <Code className="text-emerald-500" />,
    description: "网页设计与开发工具",
    category: "网页开发",
    recent: false,
    new: true,
    progress: 70,
  },
  {
    name: "3D工作室 (3DStudio)",
    icon: <CuboidIcon className="text-indigo-500" />,
    description: "3D建模与渲染平台",
    category: "3D建模",
    recent: false,
    new: true,
    progress: 60,
  },
  {
    name: "字体工坊 (FontForge)",
    icon: <Type className="text-amber-500" />,
    description: "字体排印与创作工具",
    category: "字体排印",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "配色板 (ColorPalette)",
    icon: <Palette className="text-purple-500" />,
    description: "配色方案创建与管理",
    category: "设计",
    recent: false,
    new: false,
    progress: 100,
  },
]

// Sample data for recent files
const recentFiles = [
  {
    name: "品牌重塑.pxm",
    app: "像素大师",
    modified: "2小时前",
    icon: <ImageIcon className="text-violet-500" />,
    shared: true,
    size: "24.5 MB",
    collaborators: 3,
  },
  {
    name: "公司Logo.vec",
    app: "矢量专家",
    modified: "昨天",
    icon: <Brush className="text-orange-500" />,
    shared: true,
    size: "8.2 MB",
    collaborators: 2,
  },
  {
    name: "产品发布视频.vid",
    app: "视频工作室",
    modified: "3天前",
    icon: <Video className="text-pink-500" />,
    shared: false,
    size: "1.2 GB",
    collaborators: 0,
  },
  {
    name: "UI动效.mfx",
    app: "动态特效",
    modified: "上周",
    icon: <Sparkles className="text-blue-500" />,
    shared: true,
    size: "345 MB",
    collaborators: 4,
  },
  {
    name: "杂志排版.pgc",
    app: "页面工匠",
    modified: "2周前",
    icon: <Layers className="text-red-500" />,
    shared: false,
    size: "42.8 MB",
    collaborators: 0,
  },
  {
    name: "移动应用设计.uxf",
    app: "交互流",
    modified: "3周前",
    icon: <LayoutGrid className="text-fuchsia-500" />,
    shared: true,
    size: "18.3 MB",
    collaborators: 5,
  },
  {
    name: "产品摄影.phl",
    app: "照片实验室",
    modified: "上个月",
    icon: <Camera className="text-teal-500" />,
    shared: false,
    size: "156 MB",
    collaborators: 0,
  },
]

// Sample data for projects
const projects = [
  {
    name: "网站重构",
    description: "公司官网全面改版与升级",
    progress: 75,
    dueDate: "2025年6月15日",
    members: 4,
    files: 23,
  },
  {
    name: "移动App发布",
    description: "新移动应用的设计与资源准备",
    progress: 60,
    dueDate: "2025年7月30日",
    members: 6,
    files: 42,
  },
  {
    name: "品牌识别系统",
    description: "新品牌指南与视觉资产",
    progress: 90,
    dueDate: "2025年5月25日",
    members: 3,
    files: 18,
  },
  {
    name: "市场营销活动",
    description: "夏季促销宣传物料",
    progress: 40,
    dueDate: "2025年8月10日",
    members: 5,
    files: 31,
  },
]

// Sample data for tutorials
const tutorials = [
  {
    title: "精通数字插画",
    description: "学习创作惊艳数字艺术的高级技巧",
    duration: "1小时45分",
    level: "高级",
    instructor: "Sarah Chen",
    category: "插画",
    views: "2.4万",
  },
  {
    title: "UI/UX设计基础",
    description: "创建直观用户界面的核心原则",
    duration: "2小时20分",
    level: "中级",
    instructor: "Michael Rodriguez",
    category: "设计",
    views: "5.6万",
  },
  {
    title: "视频剪辑大师课",
    description: "电影级视频剪辑的专业技巧",
    duration: "3小时10分",
    level: "高级",
    instructor: "James Wilson",
    category: "视频制作",
    views: "3.2万",
  },
  {
    title: "字体排印精要",
    description: "为任何项目设计美观有效的排版",
    duration: "1小时30分",
    level: "初级",
    instructor: "Emma Thompson",
    category: "字体排印",
    views: "1.8万",
  },
  {
    title: "设计师色彩理论",
    description: "理解色彩关系与色彩心理学",
    duration: "2小时05分",
    level: "中级",
    instructor: "David Kim",
    category: "设计",
    views: "4.1万",
  },
]

// Sample data for community posts
const communityPosts = [
  {
    title: "极简Logo设计",
    author: "Alex Morgan",
    likes: 342,
    comments: 28,
    image: "/placeholder.svg?height=300&width=400",
    time: "2天前",
  },
  {
    title: "3D角色概念图",
    author: "Priya Sharma",
    likes: 518,
    comments: 47,
    image: "/placeholder.svg?height=300&width=400",
    time: "1周前",
  },
  {
    title: "UI仪表盘重设计",
    author: "Thomas Wright",
    likes: 276,
    comments: 32,
    image: "/placeholder.svg?height=300&width=400",
    time: "3天前",
  },
  {
    title: "产品摄影布景",
    author: "Olivia Chen",
    likes: 189,
    comments: 15,
    image: "/placeholder.svg?height=300&width=400",
    time: "5天前",
  },
]

// Sample data for sidebar navigation
const sidebarItems = [
  {
    title: "首页",
    icon: <Home />,
    value: "home",
  },
  {
    title: "应用",
    icon: <Grid />,
    value: "apps",
    items: [
      { title: "回收报价", url: "#recycling", badge: "New", value: "recycling" },
      { title: "维修报价", url: "#repair", badge: "Hot", value: "repair" },
      { title: "订单管理", url: "#orders", badge: "New", value: "orders" },
    ],
  },
]

/*
* ==========================================
* ⚠️ 强制性声明 (Mandatory Declaration)
* 
* 本项目后续所有新应用模块的开发，必须采用“单页应用 (SPA) 标签页集成模式”。
* - 原则: 避免页面跳转 (Route Push)，通过 Tabs 或状态管理在当前仪表盘内切换组件。
* - 实现: 新功能应封装为独立组件 (Component)，并在下方 TabsContent 中注册。
* ==========================================
*/

export function DesignaliCreative() {
  const [progress, setProgress] = useState(0)
  const [cloudConnected, setCloudConnected] = useState(false)
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(null)
  const restoreInputRef = useRef<HTMLInputElement | null>(null)
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false)
  const [restoreDraft, setRestoreDraft] = useState<null | {
    activeTab?: string
    sidebarOpen?: boolean
    expandedItems?: Record<string, boolean>
    notifications?: Array<{ id: string; title: string; time: string; read: boolean }>
    messages?: Array<{ id: string; title: string; time: string; read: boolean }>
  }>(null)

  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; time: string; read: boolean }>>([
    { id: 'n1', title: '维修报价：新增品牌型号已同步', time: '刚刚', read: false },
    { id: 'n2', title: '系统更新：导入/导出 CSV 已上线', time: '10 分钟前', read: false },
    { id: 'n3', title: '提示：可在管理菜单进行批量操作', time: '1 小时前', read: false },
    { id: 'n4', title: '安全提醒：建议定期导出备份', time: '昨天', read: false },
    { id: 'n5', title: '欢迎使用 ChinaTechOS 控制台', time: '2 天前', read: false },
  ])
  const [messages, setMessages] = useState<Array<{ id: string; title: string; time: string; read: boolean }>>([
    { id: 'm1', title: '欢迎：这里会展示系统消息与更新说明', time: '刚刚', read: false },
    { id: 'm2', title: '提示：支持快捷键切换应用模块', time: '今天', read: true },
  ])
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const unreadNotifications = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])
  const unreadMessages = useMemo(() => messages.filter((m) => !m.read).length, [messages])
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [showMainHeader, setShowMainHeader] = useState(true)
  const lastScrollY = useRef(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollY = e.currentTarget.scrollTop
    if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setShowMainHeader(false)
    } else {
        setShowMainHeader(true)
    }
    lastScrollY.current = currentScrollY
  }

  const downloadTextFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const exportBackup = () => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      activeTab,
      sidebarOpen,
      expandedItems,
      notifications,
      messages,
    }
    downloadTextFile(`ChinaTechOS_backup_${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2), 'application/json')
  }

  const requestRestoreBackup = () => {
    restoreInputRef.current?.click()
  }

  const handleRestoreFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      const draft: typeof restoreDraft = {
        activeTab: typeof parsed?.activeTab === 'string' ? parsed.activeTab : undefined,
        sidebarOpen: typeof parsed?.sidebarOpen === 'boolean' ? parsed.sidebarOpen : undefined,
        expandedItems: typeof parsed?.expandedItems === 'object' && parsed?.expandedItems ? parsed.expandedItems : undefined,
        notifications: Array.isArray(parsed?.notifications) ? parsed.notifications : undefined,
        messages: Array.isArray(parsed?.messages) ? parsed.messages : undefined,
      }
      setRestoreDraft(draft)
      setRestoreDialogOpen(true)
    } catch {
      setRestoreDraft(null)
      setRestoreDialogOpen(true)
    } finally {
      e.target.value = ''
    }
  }

  const applyRestoreDraft = () => {
    if (!restoreDraft) return
    if (restoreDraft.activeTab) setActiveTab(restoreDraft.activeTab)
    if (typeof restoreDraft.sidebarOpen === 'boolean') setSidebarOpen(restoreDraft.sidebarOpen)
    if (restoreDraft.expandedItems) setExpandedItems(restoreDraft.expandedItems)
    if (restoreDraft.notifications) setNotifications(restoreDraft.notifications)
    if (restoreDraft.messages) setMessages(restoreDraft.messages)
  }

  // Simulate progress loading
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && !e.shiftKey) {
            switch(e.key) {
                case '1': e.preventDefault(); handleSidebarClick("home", false, ""); break;
                case '2': e.preventDefault(); handleSidebarClick("apps", true, "应用"); break;
                case '3': e.preventDefault(); handleSidebarClick("files", true, "文件"); break;
                case '4': e.preventDefault(); handleSidebarClick("projects", true, "项目"); break;
                case '5': e.preventDefault(); handleSidebarClick("learn", true, "学习"); break;
            }
        }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // Handle Sidebar clicks and Sync state
  const handleSidebarClick = (value: string, hasItems: boolean, title: string) => {
    if (value) {
        setActiveTab(value)
        // Update URL
        const url = new URL(window.location.href)
        url.searchParams.set("tab", value)
        window.history.replaceState({}, "", url)
    }
    if (hasItems) toggleExpanded(title)
    if (window.innerWidth < 768 && !hasItems) setMobileMenuOpen(false)
  }

  // Initial load from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get("tab")
    if (tab) setActiveTab(tab)
    
    // Auto expand sidebar item if it matches the active tab
    const matchedItem = sidebarItems.find(item => item.value === tab || item.items?.some(sub => sub.value === tab))
    if (matchedItem && matchedItem.items) {
        setExpandedItems(prev => ({ ...prev, [matchedItem.title]: true }))
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(233, 30, 99, 0.5) 0%, rgba(81, 45, 168, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(76, 175, 80, 0.5) 0%, rgba(32, 119, 188, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Hidden Restore Input */}
      <input ref={restoreInputRef} type="file" accept="application/json" className="hidden" onChange={handleRestoreFileChange} />

      {/* Floating Toggle Buttons */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
         {/* Mobile Toggle */}
         <Button 
            variant="secondary" 
            size="icon" 
            className={cn("md:hidden rounded-full shadow-md bg-background/80 backdrop-blur-sm border", mobileMenuOpen ? "hidden" : "flex")}
            onClick={() => setMobileMenuOpen(true)}
         >
            <Menu className="h-5 w-5" />
         </Button>

         {/* Desktop Toggle */}
         <Button 
            variant="secondary" 
            size="icon" 
            className={cn("hidden md:flex rounded-full shadow-md bg-background/80 backdrop-blur-sm border transition-all duration-300", sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100")}
             onClick={() => setSidebarOpen(true)}
         >
            <PanelLeft className="h-5 w-5" />
         </Button>
      </div>

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-[100] w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold">ChinaTechOS</h1>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="搜索..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-1">
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                      (activeTab === item.value || (item.items && item.items.some(sub => sub.value === activeTab))) ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                    onClick={() => handleSidebarClick(item.value || "", !!item.items, item.title)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.items && (
                      <ChevronDown
                        className={cn(
                          "ml-2 h-4 w-4 transition-transform",
                          expandedItems[item.title] ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </button>

                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className={cn(
                            "flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted",
                            activeTab === subItem.value ? "bg-primary/5 text-primary font-medium" : ""
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            if (subItem.value) {
                                handleSidebarClick(subItem.value, false, subItem.title);
                            } else if (subItem.url.startsWith("#")) {
                                // Fallback for items without explicit value
                                const tabName = subItem.url.replace("#", "");
                                handleSidebarClick(tabName, false, subItem.title);
                            }
                          }}
                        >
                          {subItem.title}
                          {subItem.badge && (
                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                              {subItem.badge}
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="flex items-center justify-between px-1 mb-3">
              {/* Cloud */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" title="云存储">
                    <Cloud className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="top" className="min-w-56 ml-2">
                  <DropdownMenuLabel>
                    {cloudConnected ? "云端已连接" : "云端未连接"}
                    {lastSyncAt ? ` · ${lastSyncAt.slice(11, 16)}` : ""}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => {
                      if (!cloudConnected) setCloudConnected(true)
                      setLastSyncAt(new Date().toISOString())
                    }}
                  >
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    立即同步
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => exportBackup()}>
                    <Download className="h-4 w-4 mr-2" />
                    下载备份
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => requestRestoreBackup()}>
                    <Upload className="h-4 w-4 mr-2" />
                    恢复备份
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => {
                      setCloudConnected((v) => !v)
                      if (cloudConnected) setLastSyncAt(null)
                    }}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {cloudConnected ? "断开连接" : "连接云端"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Messages */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-lg relative text-muted-foreground hover:text-foreground" 
                onClick={() => setMessagesOpen(true)} 
                title="消息"
              >
                <MessageSquare className="h-4 w-4" />
                {unreadMessages > 0 && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />}
              </Button>

              {/* Notifications */}
              <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg relative text-muted-foreground hover:text-foreground" title="通知">
                    <Bell className="h-4 w-4" />
                    {unreadNotifications > 0 && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" side="top" className="w-80 p-0 ml-2">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <div className="text-sm font-semibold">通知</div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 rounded-xl text-xs"
                        onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                      >
                        全部已读
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 rounded-xl text-xs"
                        onClick={() => setNotifications([])}
                      >
                        清空
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-64">
                    <div className="p-2 space-y-1">
                      {notifications.length === 0 ? (
                        <div className="px-2 py-8 text-sm text-muted-foreground text-center">暂无通知</div>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            className={cn(
                              "w-full text-left rounded-xl px-3 py-2 hover:bg-accent transition-colors",
                              !n.read && "bg-accent/50"
                            )}
                            onClick={() => setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                          >
                            <div className="text-sm font-medium">{n.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{n.time}</div>
                          </button>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              {/* Settings */}
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" title="设置">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-2xl p-2 hover:bg-accent transition-all duration-200 group">
                  <Avatar className="h-9 w-9 border-2 border-background shadow-sm group-hover:border-primary/20 transition-colors">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="用户" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className="text-sm font-medium truncate w-full text-left">John Doe</span>
                    <span className="text-xs text-muted-foreground truncate w-full text-left">Pro Plan</span>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="top" className="min-w-56 ml-2">
                <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setMessagesOpen(true)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  查看消息
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setNotificationsOpen(true)}>
                  <Bell className="h-4 w-4 mr-2" />
                  查看通知
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setMobileMenuOpen(false)}>
                   <X className="h-4 w-4 mr-2" />
                   关闭菜单
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden transform border-r bg-background transition-all duration-300 ease-in-out md:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <div className={cn("flex items-center p-4", isSidebarCollapsed ? "justify-center" : "justify-between")}>
             {!isSidebarCollapsed && <h1 className="text-xl font-semibold">ChinaTechOS</h1>}
            {!isSidebarCollapsed && (
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl" onClick={() => setIsSidebarCollapsed(true)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
             {/* If collapsed, maybe show nothing or a logo? User didn't specify, but keeping it clean is safer. */}
          </div>

          <div className="px-3 py-2">
            {!isSidebarCollapsed ? (
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="搜索..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
                </div>
            ) : (
                <div className="flex justify-center">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl" onClick={() => setIsSidebarCollapsed(false)}>
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            )}
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-1">
                  {isSidebarCollapsed ? (
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <button
                                    className={cn(
                                    "flex w-full items-center justify-center rounded-2xl px-3 py-2 text-sm font-medium",
                                    (activeTab === item.value || (item.items && item.items.some(sub => sub.value === activeTab))) ? "bg-primary/10 text-primary" : "hover:bg-muted",
                                    )}
                                    onClick={() => {
                                        if (item.items) {
                                            setIsSidebarCollapsed(false)
                                            setExpandedItems(prev => ({ ...prev, [item.title]: true }))
                                        } else {
                                            handleSidebarClick(item.value || "", !!item.items, item.title)
                                        }
                                    }}
                                >
                                    {item.icon}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                {item.title}
                            </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                  ) : (
                      <>
                        <button
                            className={cn(
                            "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                            (activeTab === item.value || (item.items && item.items.some(sub => sub.value === activeTab))) ? "bg-primary/10 text-primary" : "hover:bg-muted",
                            )}
                            onClick={() => handleSidebarClick(item.value || "", !!item.items, item.title)}
                        >
                            <div className="flex items-center gap-3">
                            {item.icon}
                            <span>{item.title}</span>
                            </div>
                            {item.badge && (
                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                                {item.badge}
                            </Badge>
                            )}
                            {item.items && (
                            <ChevronDown
                                className={cn(
                                "ml-2 h-4 w-4 transition-transform",
                                expandedItems[item.title] ? "rotate-180" : "",
                                )}
                            />
                            )}
                        </button>

                        {item.items && expandedItems[item.title] && (
                            <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                            {item.items.map((subItem) => (
                                <a
                                key={subItem.title}
                                href={subItem.url}
                                className={cn(
                                    "flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted",
                                    activeTab === subItem.value ? "bg-primary/5 text-primary font-medium" : ""
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (subItem.value) {
                                        handleSidebarClick(subItem.value, false, subItem.title);
                                    } else if (subItem.url.startsWith("#")) {
                                        const tabName = subItem.url.replace("#", "");
                                        handleSidebarClick(tabName, false, subItem.title);
                                    }
                                }}
                                >
                                {subItem.title}
                                {subItem.badge && (
                                    <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                                    {subItem.badge}
                                    </Badge>
                                )}
                                </a>
                            ))}
                            </div>
                        )}
                      </>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className={cn("flex items-center gap-1 mb-3", isSidebarCollapsed ? "flex-col space-y-2" : "justify-between px-1")}>
              {/* Cloud */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" title="云存储">
                    <Cloud className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="right" className="min-w-56 ml-2">
                  <DropdownMenuLabel>
                    {cloudConnected ? "云端已连接" : "云端未连接"}
                    {lastSyncAt ? ` · ${lastSyncAt.slice(11, 16)}` : ""}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => {
                      if (!cloudConnected) setCloudConnected(true)
                      setLastSyncAt(new Date().toISOString())
                    }}
                  >
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    立即同步
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => exportBackup()}>
                    <Download className="h-4 w-4 mr-2" />
                    下载备份
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => requestRestoreBackup()}>
                    <Upload className="h-4 w-4 mr-2" />
                    恢复备份
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => {
                      setCloudConnected((v) => !v)
                      if (cloudConnected) setLastSyncAt(null)
                    }}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {cloudConnected ? "断开连接" : "连接云端"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Messages */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-lg relative text-muted-foreground hover:text-foreground" 
                onClick={() => setMessagesOpen(true)} 
                title="消息"
              >
                <MessageSquare className="h-4 w-4" />
                {unreadMessages > 0 && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />}
              </Button>

              {/* Notifications */}
              <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg relative text-muted-foreground hover:text-foreground" title="通知">
                    <Bell className="h-4 w-4" />
                    {unreadNotifications > 0 && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" side="right" className="w-80 p-0 ml-2">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <div className="text-sm font-semibold">通知</div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 rounded-xl text-xs"
                        onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                      >
                        全部已读
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 rounded-xl text-xs"
                        onClick={() => setNotifications([])}
                      >
                        清空
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-64">
                    <div className="p-2 space-y-1">
                      {notifications.length === 0 ? (
                        <div className="px-2 py-8 text-sm text-muted-foreground text-center">暂无通知</div>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            className={cn(
                              "w-full text-left rounded-xl px-3 py-2 hover:bg-accent transition-colors",
                              !n.read && "bg-accent/50"
                            )}
                            onClick={() => setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                          >
                            <div className="text-sm font-medium">{n.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{n.time}</div>
                          </button>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              {/* Settings */}
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground" title="设置">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn("flex w-full items-center gap-3 rounded-2xl p-2 hover:bg-accent transition-all duration-200 group", isSidebarCollapsed ? "justify-center" : "")}>
                  <Avatar className="h-9 w-9 border-2 border-background shadow-sm group-hover:border-primary/20 transition-colors">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="用户" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  {!isSidebarCollapsed && (
                    <div className="flex flex-col items-start overflow-hidden">
                      <span className="text-sm font-medium truncate w-full text-left">John Doe</span>
                      <span className="text-xs text-muted-foreground truncate w-full text-left">Pro Plan</span>
                    </div>
                  )}
                  {!isSidebarCollapsed && <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100" />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="right" className="min-w-56 ml-2">
                <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setMessagesOpen(true)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  查看消息
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setNotificationsOpen(true)}>
                  <Bell className="h-4 w-4 mr-2" />
                  查看通知
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setSidebarOpen(false)}>
                   <PanelLeft className="h-4 w-4 mr-2" />
                   收起侧栏
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {isSidebarCollapsed && (
                <Button variant="ghost" size="icon" className="w-full mt-2 h-8 hover:bg-accent rounded-xl" onClick={() => setIsSidebarCollapsed(false)} title="展开">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? (isSidebarCollapsed ? "md:pl-20" : "md:pl-64") : "md:pl-0")}>
        <motion.header 
          className="sticky top-0 z-10 flex items-center gap-3 border-b bg-background/95 px-4 backdrop-blur overflow-hidden"
          animate={{ 
            height: showMainHeader ? "4rem" : "0rem",
            opacity: showMainHeader ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col">
                {/* Dynamic Breadcrumbs */}
                <div className="hidden md:flex items-center text-xs text-muted-foreground mt-1">
                    <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSidebarClick("home", false, "")}>首页</span>
                    {activeTab !== "home" && (
                        <>
                            <ChevronRight className="h-3 w-3 mx-1" />
                            <span className="capitalize">{sidebarItems.find(i => i.value === activeTab || i.items?.some(s => s.value === activeTab))?.title || activeTab}</span>
                        </>
                    )}
                    {/* Check if current tab is a sub-item */}
                    {sidebarItems.some(i => i.items?.some(s => s.value === activeTab)) && (
                        <>
                            <ChevronRight className="h-3 w-3 mx-1" />
                            <span>{sidebarItems.flatMap(i => i.items).find(s => s?.value === activeTab)?.title}</span>
                        </>
                    )}
                </div>
            </div>

          </div>
        </motion.header>

        <Sheet open={messagesOpen} onOpenChange={setMessagesOpen}>
          <SheetContent side="right" className="w-[360px] sm:w-[420px] p-0">
            <SheetHeader className="px-4 py-3 border-b">
              <SheetTitle>消息</SheetTitle>
            </SheetHeader>
            <div className="flex items-center justify-between px-4 py-2">
              <div className="text-sm text-muted-foreground">未读：{unreadMessages}</div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 rounded-xl"
                onClick={() => setMessages((prev) => prev.map((m) => ({ ...m, read: true })))}
              >
                全部已读
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="p-2 space-y-1">
                {messages.length === 0 ? (
                  <div className="px-2 py-10 text-sm text-muted-foreground text-center">暂无消息</div>
                ) : (
                  messages.map((m) => (
                    <button
                      key={m.id}
                      className={cn(
                        "w-full text-left rounded-2xl px-3 py-3 hover:bg-accent transition-colors",
                        !m.read && "bg-accent/50"
                      )}
                      onClick={() => setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, read: true } : x)))}
                    >
                      <div className="text-sm font-medium">{m.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{m.time}</div>
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <AlertDialog
          open={restoreDialogOpen}
          onOpenChange={(open) => {
            setRestoreDialogOpen(open)
            if (!open) setRestoreDraft(null)
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>恢复备份</AlertDialogTitle>
              <AlertDialogDescription>
                将使用备份文件覆盖当前本地界面状态，不会修改数据库数据。
              </AlertDialogDescription>
            </AlertDialogHeader>

            {!restoreDraft ? (
              <div className="text-sm text-destructive">备份文件无效或解析失败。</div>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
                  {restoreDraft.activeTab && <span>Tab: {restoreDraft.activeTab}</span>}
                  {typeof restoreDraft.sidebarOpen === "boolean" && <span>侧栏: {restoreDraft.sidebarOpen ? "开" : "关"}</span>}
                  {restoreDraft.notifications && <span>通知: {restoreDraft.notifications.length}</span>}
                  {restoreDraft.messages && <span>消息: {restoreDraft.messages.length}</span>}
                </div>
              </div>
            )}

            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction
                disabled={!restoreDraft}
                onClick={() => {
                  applyRestoreDraft()
                }}
              >
                确认恢复
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <main className={cn("flex-1 transition-all duration-300", ["recycling", "repair", "orders"].includes(activeTab) ? "p-0 overflow-hidden" : "p-4 md:p-6 overflow-auto")}>
          <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full h-full">


            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="home" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-4">
                          <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">Premium</Badge>
                          <h2 className="text-3xl font-bold">欢迎使用 DesignAli 创意套件</h2>
                          <p className="max-w-[600px] text-white/80">
                            利用我们全面的专业设计工具和资源释放您的创造力。
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Button className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90">
                              查看方案
                            </Button>
                            <Button
                              variant="outline"
                              className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10"
                            >
                              功能导览
                            </Button>
                          </div>
                        </div>
                        <div className="hidden lg:block">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="relative h-40 w-40"
                          >
                            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
                            <div className="absolute inset-4 rounded-full bg-white/20" />
                            <div className="absolute inset-8 rounded-full bg-white/30" />
                            <div className="absolute inset-12 rounded-full bg-white/40" />
                            <div className="absolute inset-16 rounded-full bg-white/50" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">最近使用应用</h2>
                      <Button variant="ghost" className="rounded-2xl">
                        查看全部
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {apps
                        .filter((app) => app.recent)
                        .map((app) => (
                          <motion.div key={app.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                            <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                                    {app.icon}
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl">
                                    <Star className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <CardTitle className="text-lg">{app.name}</CardTitle>
                                <CardDescription>{app.description}</CardDescription>
                              </CardContent>
                              <CardFooter>
                                <Button variant="secondary" className="w-full rounded-2xl">
                                  打开
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                    </div>
                  </section>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">最近文件</h2>
                        <Button variant="ghost" className="rounded-2xl">
                          查看全部
                        </Button>
                      </div>
                      <div className="rounded-3xl border">
                        <div className="grid grid-cols-1 divide-y">
                          {recentFiles.slice(0, 4).map((file) => (
                            <motion.div
                              key={file.name}
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                              className="flex items-center justify-between p-4"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                                  {file.icon}
                                </div>
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {file.app} • {file.modified}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {file.shared && (
                                  <Badge variant="outline" className="rounded-xl">
                                    <Users className="mr-1 h-3 w-3" />
                                    {file.collaborators}
                                  </Badge>
                                )}
                                <Button variant="ghost" size="sm" className="rounded-xl">
                                  打开
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">进行中的项目</h2>
                        <Button variant="ghost" className="rounded-2xl">
                          查看全部
                        </Button>
                      </div>
                      <div className="rounded-3xl border">
                        <div className="grid grid-cols-1 divide-y">
                          {projects.slice(0, 3).map((project) => (
                            <motion.div
                              key={project.name}
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                              className="p-4"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">{project.name}</h3>
                                <Badge variant="outline" className="rounded-xl">
                                  截止 {project.dueDate}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>进度</span>
                                  <span>{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2 rounded-xl" />
                              </div>
                              <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Users className="mr-1 h-4 w-4" />
                                  {project.members} 成员
                                </div>
                                <div className="flex items-center">
                                  <FileText className="mr-1 h-4 w-4" />
                                  {project.files} 文件
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">社区精选</h2>
                      <Button variant="ghost" className="rounded-2xl">
                        发现更多
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {communityPosts.map((post) => (
                        <motion.div key={post.title} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl">
                            <div className="aspect-[4/3] overflow-hidden bg-muted">
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold">{post.title}</h3>
                              <p className="text-sm text-muted-foreground">作者: {post.author}</p>
                              <div className="mt-2 flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <Heart className="h-4 w-4 text-red-500" />
                                  {post.likes}
                                  <MessageSquare className="ml-2 h-4 w-4 text-blue-500" />
                                  {post.comments}
                                </div>
                                <span className="text-muted-foreground">{post.time}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="apps" className="space-y-8 mt-0">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">已安装应用</h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                        <Card 
                            className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300 cursor-pointer"
                            onClick={() => handleSidebarClick("recycling", false, "")}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                                <Sparkles className="h-6 w-6" />
                              </div>
                              <Badge className="rounded-xl bg-green-600">工具</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <CardTitle className="text-lg">回收报价</CardTitle>
                            <CardDescription>智能手机回收估价与风控系统</CardDescription>
                          </CardContent>
                          <CardFooter>
                            <Button variant="secondary" className="w-full rounded-2xl">
                              打开
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                        <Card 
                            className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300 cursor-pointer"
                            onClick={() => handleSidebarClick("repair", false, "")}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                                <Wrench className="h-6 w-6" />
                              </div>
                              <Badge className="rounded-xl bg-amber-600">查询</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <CardTitle className="text-lg">维修报价</CardTitle>
                            <CardDescription>快速查询手机维修价格与保修信息</CardDescription>
                          </CardContent>
                          <CardFooter>
                            <Button variant="secondary" className="w-full rounded-2xl">
                              打开
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="files" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">您的创意文件</h2>
                          <p className="max-w-[600px] text-white/80">
                            一站式访问、管理和分享您的所有设计文件。
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button className="rounded-2xl bg-white/20 backdrop-blur-md hover:bg-white/30">
                            <Cloud className="mr-2 h-4 w-4" />
                            云存储
                          </Button>
                          <Button className="rounded-2xl bg-white text-blue-700 hover:bg-white/90">
                            <Plus className="mr-2 h-4 w-4" />
                            上传文件
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl">
                      <FileText className="mr-2 h-4 w-4" />
                      全部文件
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Clock className="mr-2 h-4 w-4" />
                      最近
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Users className="mr-2 h-4 w-4" />
                      共享
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Star className="mr-2 h-4 w-4" />
                      收藏
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Trash className="mr-2 h-4 w-4" />
                      回收站
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="搜索文件..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">全部文件</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-2xl">
                          <PanelLeft className="mr-2 h-4 w-4" />
                          筛选
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-2xl">
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          排序
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-3xl border overflow-hidden">
                      <div className="bg-muted/50 p-3 hidden md:grid md:grid-cols-12 text-sm font-medium">
                        <div className="col-span-6">名称</div>
                        <div className="col-span-2">应用</div>
                        <div className="col-span-2">大小</div>
                        <div className="col-span-2">修改时间</div>
                      </div>
                      <div className="divide-y">
                        {recentFiles.map((file) => (
                          <motion.div
                            key={file.name}
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            className="p-3 md:grid md:grid-cols-12 items-center flex flex-col md:flex-row gap-3 md:gap-0"
                          >
                            <div className="col-span-6 flex items-center gap-3 w-full md:w-auto">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                                {file.icon}
                              </div>
                              <div>
                                <p className="font-medium">{file.name}</p>
                                {file.shared && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Users className="mr-1 h-3 w-3" />
                                    与 {file.collaborators} 人共享
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-span-2 text-sm md:text-base">{file.app}</div>
                            <div className="col-span-2 text-sm md:text-base">{file.size}</div>
                            <div className="col-span-2 flex items-center justify-between w-full md:w-auto">
                              <span className="text-sm md:text-base">{file.modified}</span>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="projects" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">项目管理</h2>
                          <p className="max-w-[600px] text-white/80">
                            组织您的创意工作，与团队高效协作。
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-indigo-700 hover:bg-white/90">
                          <Plus className="mr-2 h-4 w-4" />
                          新建项目
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl">
                      <Layers className="mr-2 h-4 w-4" />
                      全部项目
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Clock className="mr-2 h-4 w-4" />
                      最近
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Users className="mr-2 h-4 w-4" />
                      共享
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Archive className="mr-2 h-4 w-4" />
                      已归档
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="搜索项目..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">进行中的项目</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {projects.map((project) => (
                        <motion.div key={project.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle>{project.name}</CardTitle>
                                <Badge variant="outline" className="rounded-xl">
                                  截止 {project.dueDate}
                                </Badge>
                              </div>
                              <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>进度</span>
                                  <span>{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2 rounded-xl" />
                              </div>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Users className="mr-1 h-4 w-4" />
                                  {project.members} 成员
                                </div>
                                <div className="flex items-center">
                                  <FileText className="mr-1 h-4 w-4" />
                                  {project.files} 文件
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                              <Button variant="secondary" className="flex-1 rounded-2xl">
                                打开项目
                              </Button>
                              <Button variant="outline" size="icon" className="rounded-2xl">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                      <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                        <Card className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed p-8 hover:border-primary/50 transition-all duration-300">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            <Plus className="h-6 w-6" />
                          </div>
                          <h3 className="text-lg font-medium">创建新项目</h3>
                          <p className="mb-4 text-center text-sm text-muted-foreground">
                            从头开始创建新项目或使用模板
                          </p>
                          <Button className="rounded-2xl">新建项目</Button>
                        </Card>
                      </motion.div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">项目模板</h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                          <h3 className="text-lg font-medium">品牌识别</h3>
                          <p className="text-sm text-white/80">完整的品牌设计方案</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            热门
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            使用模板
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-amber-500 to-red-600 p-6 text-white">
                          <h3 className="text-lg font-medium">营销活动</h3>
                          <p className="text-sm text-white/80">多渠道营销素材</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            新品
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            使用模板
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 p-6 text-white">
                          <h3 className="text-lg font-medium">网站重构</h3>
                          <p className="text-sm text-white/80">完整的网站设计工作流</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            精选
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            使用模板
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-pink-500 to-rose-600 p-6 text-white">
                          <h3 className="text-lg font-medium">产品发布</h3>
                          <p className="text-sm text-white/80">产品发布活动素材</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            热门
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            使用模板
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="learn" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">学习与成长</h2>
                          <p className="max-w-[600px] text-white/80">
                            通过教程、课程和资源扩展您的创意技能。
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-emerald-700 hover:bg-white/90">
                          <Crown className="mr-2 h-4 w-4" />
                          升级到专业版
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl">
                      <Play className="mr-2 h-4 w-4" />
                      全部教程
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <BookOpen className="mr-2 h-4 w-4" />
                      课程
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      技巧与提示
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      趋势
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Bookmark className="mr-2 h-4 w-4" />
                      已保存
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="搜索教程..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">精选教程</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {tutorials.slice(0, 3).map((tutorial) => (
                        <motion.div key={tutorial.title} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl">
                            <div className="aspect-video overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button size="icon" variant="secondary" className="h-14 w-14 rounded-full">
                                  <Play className="h-6 w-6" />
                                </Button>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                                <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                                  {tutorial.category}
                                </Badge>
                                <h3 className="mt-2 text-lg font-medium">{tutorial.title}</h3>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{tutorial.instructor.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{tutorial.instructor}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  {tutorial.duration}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t p-4">
                              <Badge variant="outline" className="rounded-xl">
                                {tutorial.level}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Eye className="h-4 w-4" />
                                {tutorial.views} 观看
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">热门课程</h2>
                      <Button variant="ghost" className="rounded-2xl">
                        查看全部
                      </Button>
                    </div>
                    <div className="rounded-3xl border overflow-hidden">
                      <div className="divide-y">
                        {tutorials.slice(3, 5).map((tutorial) => (
                          <motion.div
                            key={tutorial.title}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-4 flex flex-col md:flex-row gap-3"
                          >
                            <div className="flex-shrink-0">
                              <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Play className="h-8 w-8 text-white" />
                                </div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{tutorial.title}</h3>
                              <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                              <div className="mt-2 flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className="rounded-xl">
                                  {tutorial.level}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {tutorial.duration}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Eye className="h-3 w-3" />
                                  {tutorial.views} 观看
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Button variant="ghost" size="sm" className="rounded-xl">
                                立即观看
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">学习路径</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className="rounded-xl bg-blue-500">初级</Badge>
                            <Award className="h-5 w-5 text-amber-500" />
                          </div>
                          <CardTitle className="mt-2">UI/UX设计基础</CardTitle>
                          <CardDescription>掌握用户界面和体验设计的基础知识</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>8 课程 • 24 小时</span>
                              <span>4.8 ★</span>
                            </div>
                            <Progress value={30} className="h-2 rounded-xl" />
                            <p className="text-xs text-muted-foreground">已完成 30%</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full rounded-2xl">
                            继续学习
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className="rounded-xl bg-amber-500">中级</Badge>
                            <Award className="h-5 w-5 text-amber-500" />
                          </div>
                          <CardTitle className="mt-2">精通数字插画</CardTitle>
                          <CardDescription>创作惊艳的数字艺术和插画作品</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>12 课程 • 36 小时</span>
                              <span>4.9 ★</span>
                            </div>
                            <Progress value={0} className="h-2 rounded-xl" />
                            <p className="text-xs text-muted-foreground">未开始</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full rounded-2xl">
                            开始学习
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className="rounded-xl bg-red-500">高级</Badge>
                            <Award className="h-5 w-5 text-amber-500" />
                          </div>
                          <CardTitle className="mt-2">动态图形与动画</CardTitle>
                          <CardDescription>制作专业的动态图形和动画</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>10 课程 • 30 小时</span>
                              <span>4.7 ★</span>
                            </div>
                            <Progress value={0} className="h-2 rounded-xl" />
                            <p className="text-xs text-muted-foreground">未开始</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full rounded-2xl">
                            开始学习
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="recycling" className="space-y-8 mt-0 h-full">
                  <div className="h-full overflow-y-auto" onScroll={handleScroll}>
                    <RecyclingApp setMainHeaderVisible={setShowMainHeader} />
                  </div>
                </TabsContent>

                <TabsContent value="repair" className="space-y-8 mt-0 h-full">
                  <div className="h-full overflow-y-auto" onScroll={handleScroll}>
                    <RepairApp setMainHeaderVisible={setShowMainHeader} />
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="space-y-8 mt-0 h-full">
                  <OrderManagementApp setMainHeaderVisible={setShowMainHeader} />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
