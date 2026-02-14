# ChinaTechOS v1 UI 设计规范指南 (UI Design Guide)

## ⚠️ 强制性声明 (Mandatory Declaration)

**本项目后续所有功能模块的 UI 设计与开发，必须严格遵循本指南定义的规范与逻辑。任何偏离本规范的设计都将被视为不合规，需修正后方可合并。**

---

## 1. 核心设计原则 (Core Principles)

本项目的 UI 设计遵循以下三大核心原则：

1.  **极简主义 (Minimalist)**
    *   **少即是多**: 界面应尽量减少不必要的装饰元素，专注于内容本身。
    *   **留白**: 充分利用留白 (Whitespace) 来区分内容区块，提升阅读体验。
    *   **扁平化**: 避免使用过多的渐变、阴影和纹理，保持界面干净清爽。

2.  **一致性 (Consistency)**
    *   **组件复用**: 优先复用现有的 Shadcn UI 组件，避免重复造轮子。
    *   **交互统一**: 相同的操作应具有相同的交互反馈和视觉表现。
    *   **视觉语言**: 严格遵守色彩、排版和间距规范。

3.  **现代感 (Modern)**
    *   **圆角设计**: 使用圆角 (Radius) 来增加界面的亲和力。
    *   **微妙动效**: 使用平滑的过渡动画 (Transitions) 来提升用户体验，但不应喧宾夺主。
    *   **暗色模式**: 完美支持深色模式 (Dark Mode)，确保在不同光照环境下都有良好的可读性。

---

## 2. 色彩系统 (Color System)

本项目使用 CSS 变量 (HSL 格式) 定义色彩系统，支持明暗模式自动切换。

### 2.1 基础语义色 (Semantic Colors)

| 语义变量 | Light Mode (HSL) | Dark Mode (HSL) | 用途说明 |
| :--- | :--- | :--- | :--- |
| `--background` | `0 0% 100%` | `0 0% 3.9%` | 页面整体背景色 |
| `--foreground` | `0 0% 3.9%` | `0 0% 98%` | 页面主要文本颜色 |
| `--card` | `0 0% 100%` | `0 0% 3.9%` | 卡片组件背景色 |
| `--card-foreground` | `0 0% 3.9%` | `0 0% 98%` | 卡片内文本颜色 |
| `--popover` | `0 0% 100%` | `0 0% 3.9%` | 弹出层/下拉菜单背景色 |
| `--popover-foreground` | `0 0% 3.9%` | `0 0% 98%` | 弹出层文本颜色 |
| `--primary` | `0 0% 9%` | `0 0% 98%` | 主按钮、强调文本、主要交互元素 |
| `--primary-foreground` | `0 0% 98%` | `0 0% 9%` | 主按钮上的文本颜色 |
| `--secondary` | `0 0% 96.1%` | `0 0% 14.9%` | 次级按钮、背景块 |
| `--secondary-foreground` | `0 0% 9%` | `0 0% 98%` | 次级元素上的文本颜色 |
| `--muted` | `0 0% 96.1%` | `0 0% 14.9%` | 弱化背景、禁用状态 |
| `--muted-foreground` | `0 0% 45.1%` | `0 0% 63.9%` | 辅助说明文本、占位符 |
| `--accent` | `0 0% 96.1%` | `0 0% 14.9%` | 强调背景、列表项悬停态 |
| `--accent-foreground` | `0 0% 9%` | `0 0% 98%` | 强调背景上的文本颜色 |
| `--destructive` | `0 84.2% 60.2%` | `0 62.8% 30.6%` | 危险操作 (删除/警告) |
| `--destructive-foreground` | `0 0% 98%` | `0 0% 98%` | 危险操作按钮文本颜色 |
| `--border` | `0 0% 89.8%` | `0 0% 14.9%` | 边框颜色 |
| `--input` | `0 0% 89.8%` | `0 0% 14.9%` | 输入框边框颜色 |
| `--ring` | `0 0% 3.9%` | `0 0% 83.1%` | 聚焦时的外发光圈颜色 |

### 2.2 图表配色 (Chart Colors)

| 变量 | Light Mode (HSL) | Dark Mode (HSL) |
| :--- | :--- | :--- |
| `--chart-1` | `12 76% 61%` | `220 70% 50%` |
| `--chart-2` | `173 58% 39%` | `160 60% 45%` |
| `--chart-3` | `197 37% 24%` | `30 80% 55%` |
| `--chart-4` | `43 74% 66%` | `280 65% 60%` |
| `--chart-5` | `27 87% 67%` | `340 75% 55%` |

### 2.3 侧边栏配色 (Sidebar Colors)

| 变量 | Light Mode (HSL) | Dark Mode (HSL) |
| :--- | :--- | :--- |
| `--sidebar-background` | `0 0% 98%` | `240 5.9% 10%` |
| `--sidebar-foreground` | `240 5.3% 26.1%` | `240 4.8% 95.9%` |
| `--sidebar-primary` | `240 5.9% 10%` | `224.3 76.3% 48%` |
| `--sidebar-primary-foreground` | `0 0% 98%` | `0 0% 100%` |
| `--sidebar-accent` | `240 4.8% 95.9%` | `240 3.7% 15.9%` |
| `--sidebar-accent-foreground` | `240 5.9% 10%` | `240 4.8% 95.9%` |
| `--sidebar-border` | `220 13% 91%` | `240 3.7% 15.9%` |
| `--sidebar-ring` | `217.2 91.2% 59.8%` | `217.2 91.2% 59.8%` |

---

## 3. 排版系统 (Typography)

### 3.1 字体家族 (Font Family)
*   **Sans-serif (无衬线)**: `Geist Sans` (默认字体)
*   **Monospace (等宽)**: `Geist Mono` (代码块、数据展示)

### 3.2 字体排印规范
*   **正文**: 使用 `text-base` (16px) 或 `text-sm` (14px)。
*   **标题**: 使用 `font-semibold` 或 `font-bold` 加粗，字号根据层级递增。
*   **辅助文本**: 使用 `text-muted-foreground` 颜色，字号通常为 `text-xs` (12px) 或 `text-sm`。

---

## 4. 布局与间距 (Layout & Spacing)

### 4.1 圆角系统 (Radius)
*   **基准圆角**: `--radius: 0.5rem` (8px)
*   **大圆角 (lg)**: `var(--radius)` (8px) - 用于卡片、模态框
*   **中圆角 (md)**: `calc(var(--radius) - 2px)` (6px) - 用于按钮、输入框
*   **小圆角 (sm)**: `calc(var(--radius) - 4px)` (4px) - 用于标签、复选框

### 4.2 间距 (Spacing)
*   遵循 Tailwind CSS 的默认间距系统 (1 = 0.25rem = 4px)。
*   **常用间距**:
    *   组件内部内边距: `p-4` (16px) 或 `p-6` (24px)
    *   组件之间外边距: `gap-4` (16px)
    *   页面容器内边距: `p-4` md: `p-8`

---

## 5. 组件规范 (Component Standards)

### 5.1 按钮 (Button)
*   **Primary**: 主要操作，使用 `--primary` 背景色。
*   **Secondary**: 次要操作，使用 `--secondary` 背景色。
*   **Outline**: 辅助操作，带边框，透明背景。
*   **Ghost**: 低优先级操作，仅在悬停时显示背景。
*   **Destructive**: 危险操作，使用 `--destructive` 红色背景。

### 5.2 卡片 (Card)
*   结构应包含：
    *   `CardHeader`: 包含 `CardTitle` (标题) 和 `CardDescription` (描述)。
    *   `CardContent`: 主要内容区域。
    *   `CardFooter`: 底部操作区域 (可选)。
*   样式：默认带有细微边框和背景色，圆角为 `rounded-xl` 或 `rounded-lg`。

### 5.3 输入框 (Input)
*   高度：默认 `h-10` (40px)。
*   状态：
    *   默认: 边框颜色 `--input`。
    *   Focus: 边框颜色 `--ring`，带有 ring 效果。
    *   Error: 边框颜色 `--destructive`。

---

## 6. 动画与交互 (Animation)

### 6.1 过渡 (Transitions)
*   通用过渡时间: `duration-200` 或 `duration-300`。
*   缓动函数: `ease-in-out` 或 `ease-out`。

### 6.2 关键帧动画 (Keyframes)
*   **Accordion Down**:
    ```css
    from { height: 0 }
    to { height: var(--radix-accordion-content-height) }
    ```
*   **Accordion Up**:
    ```css
    from { height: var(--radix-accordion-content-height) }
    to { height: 0 }
    ```
*   应用: `accordion-down 0.2s ease-out`, `accordion-up 0.2s ease-out`。

---

## 7. 图标系统 (Iconography)

*   **库**: `lucide-react`
*   **风格**: 线性图标 (Line Icons)，笔画宽度通常为 `stroke-[1.5]` 或 `stroke-2`。
*   **大小**: 默认 `w-4 h-4` (16px) 或 `w-5 h-5` (20px)。

---

**最后更新**: 2026-02-14
**版本**: v1.0
