# Milan Repair Manager (Core, Data & Design System)

## 1. 项目愿景 (Vision)
构建一个 **极简、可扩展且视觉高度一致** 的手机维修业务管理系统。
核心理念：**"插拔式架构" (Plug-and-Play)** + **"统一设计语言" (Unified Design Language)**。

## 2. 技术栈 (Tech Stack)
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **UI Library**: Shadcn/UI (Radix UI)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Auth**: NextAuth.js (v5)
- **Feedback**: Sonner

## 3. 目录结构设计 (Plug-and-Play)
```text
src/
├── app/                      # [路由层]
│   ├── (public)/             # 公开页面
│   ├── (auth)/               # 认证页面
│   └── (dashboard)/          # 私有后台
│       ├── layout.tsx        # 全局 Sidebar + Header
│       └── [module]/         # 动态挂载
│
├── components/               # [原子组件]
│   └── ui/                   # Shadcn 基础组件
│
├── modules/                  # [业务模块]
│   ├── shared/               # [★ 核心] 强制布局组件
│   │   ├── PageShell.tsx     # 页面外壳
│   │   ├── SectionCard.tsx   # 白色卡片容器
│   │   └── DataTable.tsx     # 表格样式
│   │
│   ├── core/                 # 系统级业务 (Sidebar, UserMenu)
│   └── repairs/              # 示例业务模块
│
├── services/                 # [服务层] 数据逻辑
├── prisma/                   # [数据层] Schema 定义
└── lib/                      # 工具函数
```

## 4. UI 设计系统 (Milan Industrial)
### Colors
- **Brand**: Indigo-600 (Primary Action)
- **Surface**: Slate-50 (Background), White (Card)
- **Text**: Slate-900 (Headings), Slate-500 (Secondary)
- **Border**: Slate-200

### Typography
- **Interface**: Inter
- **Data**: JetBrains Mono

### Radius
- **Button/Input**: rounded-md (6px)
- **Card**: rounded-lg (8px)

### Mandatory Components
- **PageShell**: 统一页面 Padding, 背景色, 标题位置。
- **SectionCard**: 统一的白色背景、边框、阴影。

## 5. 数据关联 (Prisma)
- **User**: 用户 (Admin/User)
- **Ticket**: 维修单
- **Part**: 零件库存
- **TicketPart**: 维修单与零件的关联 (多对多)

## 6. 服务层规范
模块间逻辑调用必须通过 Service，禁止直接操作 DB 或调用其他模块 UI。
