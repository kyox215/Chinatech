# ChinaTechOS 项目开发规范与UI设计指南

## 1. 设计语言 (Design Language)

本项目采用 **极简科技风 (Clean Tech)** 与 **玻璃拟态 (Glassmorphism)** 相结合的视觉风格。核心原则是“轻盈、通透、圆润”。

### 1.1 核心风格 (Core Style)
- **背景 (Background)**:
  - 默认背景为纯白 (`bg-background`) 或极浅灰 (`bg-muted/30`)。
  - 使用大面积的渐变色块作为装饰背景（如 Header 的渐变），配合 `backdrop-blur` 实现磨砂玻璃效果。
  - **原则**: 避免深色重压，保持界面通透感。

- **圆角规范 (Border Radius)**:
  - **强制性规则**: 本项目使用超大圆角，严禁使用直角或小圆角。
  - **大卡片/容器**: `rounded-3xl` (24px) —— 适用于所有主要内容区块、应用卡片。
  - **中型元素**: `rounded-2xl` (16px) —— 适用于按钮、输入框、小卡片、头像容器。
  - **小型元素**: `rounded-xl` (12px) —— 适用于徽章 (Badge)、标签、内嵌按钮。

- **阴影与边框 (Shadows & Borders)**:
  - **阴影**: 使用柔和的扩散阴影 `shadow-lg` 或 `shadow-xl`，颜色偏淡。
  - **边框**: 使用半透明边框 `border-primary/10` 或 `border-primary/5`，在 Hover 状态下加深至 `border-primary/50`。
  - **动效**: Hover 时配合 `scale-102` 或 `y--1` 位移，营造悬浮感。

- **配色方案 (Color Palette)**:
  - **主色调**: 使用 Tailwind 默认的 `primary` (深黑/纯白)，配合渐变色。
  - **渐变色**:
    - 紫色系: `from-violet-600 to-indigo-600`
    - 蓝色系: `from-blue-500 to-cyan-500`
    - 绿色系: `from-emerald-500 to-teal-500`
    - 橙色系: `from-orange-500 to-amber-500`
  - **功能色**:
    - 成功: `text-green-600`, `bg-green-50`
    - 警告: `text-orange-600`, `bg-orange-50`
    - 错误: `text-red-600`, `bg-red-50`

### 1.2 字体排印 (Typography)
- **字体**: 使用默认 Sans-serif 字体 (Geist Sans)。
- **字重**:
  - 标题: `font-bold` 或 `font-semibold`。
  - 正文: `font-normal`。
  - 数据/代码: `font-mono`。
- **大小**:
  - 移动端正文: `text-xs` 或 `text-sm`。
  - 桌面端正文: `text-sm` 或 `text-base`。
  - 避免使用过大的标题，通过字重区分层级。

---

## 2. 组件开发规范 (Component Standards)

所有新开发的组件必须遵循以下样式标准，直接使用 Shadcn UI 组件库并覆盖样式。

### 2.1 卡片 (Card)
```tsx
<Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
  <CardHeader className="pb-2 p-4 lg:p-6">...</CardHeader>
  <CardContent className="p-4 lg:p-6">...</CardContent>
</Card>
```

### 2.2 按钮 (Button)
```tsx
// 主要操作
<Button className="rounded-2xl bg-primary text-white shadow-lg">Action</Button>

// 次要操作
<Button variant="secondary" className="rounded-2xl">Secondary</Button>

// 图标按钮
<Button variant="ghost" size="icon" className="rounded-2xl">
  <Icon className="h-5 w-5" />
</Button>
```

### 2.3 输入框 (Input)
```tsx
<Input className="rounded-2xl bg-muted border-transparent focus:bg-background transition-all" />
```

### 2.4 图标 (Icons)
- 统一使用 `lucide-react` 图标库。
- 移动端图标大小: `w-4 h-4` (16px)。
- 桌面端图标大小: `w-5 h-5` (20px)。

---

## 3. 架构与文件规范 (Architecture)

### 3.1 单页应用模式 (SPA Pattern)
- **核心原则**: 所有新应用必须作为**组件 (Component)** 集成在主仪表盘 (`components/creative.tsx`) 中。
- **禁止跳转**: 严禁使用 `router.push('/new-page')` 跳转到新路由，必须通过 Tabs 切换显示。
- **集成方式**:
  1. 在 `components/` 目录下创建应用组件文件 (如 `pixel-master.tsx`)。
  2. 在 `creative.tsx` 的 `TabsContent` 中注册新应用。
  3. 在左侧 Sidebar 添加对应的导航项。

### 3.2 数据库规范 (Database)
- **表名规范**: `[app_id]_[entity_name]` (例如: `recycling_orders`, `pixel_projects`)。
- **隔离性**: 每个应用的数据表应保持独立，通过 `user_id` (UUID) 关联到 `auth.users`。
- **类型定义**: 必须为每个数据表定义 TypeScript 接口。

---

## 4. 移动端适配规则 (Mobile First)

本项目优先适配移动端浏览器体验。

### 4.1 布局策略
- **Grid 布局**:
  - 移动端: `grid-cols-2` 或 `grid-cols-1`。
  - 平板: `md:grid-cols-3`。
  - 桌面: `lg:grid-cols-4` 或 `lg:grid-cols-5`。
- **间距 (Spacing)**:
  - 移动端: `gap-2` 或 `gap-3`, `p-3` 或 `p-4`。
  - 桌面端: `gap-6`, `p-6`。

### 4.2 触控优化
- **点击区域**: 所有可点击元素的高度至少为 `3.5rem` (56px) 或 `44px`，方便手指点击。
- **文字换行**: 严禁在移动端使用 `whitespace-nowrap`，必须允许文字换行 (`break-words`)，避免内容溢出。
- **自适应高度**: 容器高度应使用 `min-h` 而非固定 `h`，以适应不同长度的文本。

---

## 5. 项目建议 (Suggestions)

1.  **引入 Zustand 状态管理**:
    - 目前应用间状态传递依赖 Props，建议引入 `zustand` 创建全局 Store，管理 `activeTab`、`userProfile`、`globalSettings` 等状态，减少组件耦合。

2.  **严格 TypeScript 类型**:
    - 避免使用 `any`。
    - 为 Supabase 返回的数据定义明确的 Interface。

3.  **代码注释**:
    - 复杂逻辑（如报价计算、动画控制）必须添加中文注释。

4.  **Git 规范**:
    - 提交信息格式: `type: description` (例如: `feat: add recycling module`, `fix: overflow issue`).
