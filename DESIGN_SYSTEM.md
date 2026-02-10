# ChinaTechOS Design System Specification

## 1. Design Philosophy
- **Modern & Minimalist**: Clean layouts, generous whitespace, focus on content.
- **High Contrast**: Clear distinction between interactive elements and background.
- **Card-Based**: Content organized in distinct, rounded cards with subtle shadows.
- **Data-First**: Critical numbers and metrics use monospaced fonts for readability.

## 2. Design Tokens (Tailwind CSS)

### 2.1 Colors
| Token Category | Tailwind Class | Hex Value | Usage |
|:---|:---|:---|:---|
| **Primary** | `bg-slate-900` | `#0f172a` | Main buttons, Active states, Sidebar icons (active) |
| **Secondary** | `bg-white` | `#ffffff` | Card backgrounds, Sidebar background |
| **Background** | `bg-slate-50` | `#f8fafc` | App global background, Inputs |
| **Text Primary** | `text-slate-900` | `#0f172a` | Headings, Primary values |
| **Text Secondary** | `text-slate-500` | `#64748b` | Labels, Descriptions, Inactive icons |
| **Brand Accent** | `text-indigo-600` | `#4f46e5` | Links, Primary highlights |
| **Success** | `text-green-600` | `#16a34a` | Positive trends, 'Good' status |
| **Warning** | `text-red-600` | `#dc2626` | Negative trends, 'Risk' status, Deletions |
| **Border** | `border-slate-200` | `#e2e8f0` | Dividers, Card borders |

### 2.2 Typography
- **Primary Font**: `Inter` (Variable) - UI text, Headings, Body.
- **Monospace Font**: `JetBrains Mono` - Prices, ID numbers, Technical data.
- **Weights**:
  - `font-bold` (700): Headings, Button labels, Navigation links.
  - `font-medium` (500): Subtitles, Form labels.
  - `font-normal` (400): Body text.

### 2.3 Shapes & Radius
- **Cards / Containers**: `rounded-xl` (12px) - Main content areas.
- **Buttons / Inputs**: `rounded-xl` (12px) or `rounded-lg` (8px).
- **Badges / Tags**: `rounded-full` (9999px) - Status indicators, Trend labels.

### 2.4 Shadows & Depth
- **Card Default**: `shadow-sm` + `border border-black/5` (or `border-slate-200`).
- **Card Hover**: `shadow-md` (optional for interactive cards).
- **Floating Elements**: `shadow-lg` (e.g., sticky quote panel).

### 2.5 Spacing
- **Page Padding**: `p-4` (Mobile), `p-6` (Desktop).
- **Card Padding**: `p-6` (Standard).
- **Grid Gaps**: `gap-4` or `gap-6`.

## 3. Component Standards

### 3.1 Buttons
- **Primary**: `bg-slate-900 text-white hover:bg-slate-800 shadow-sm rounded-xl px-4 py-2 font-bold`
- **Secondary/Outline**: `bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl px-4 py-2 font-bold`
- **Ghost/Icon**: `text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg p-2`

### 3.2 Inputs & Selects
- **Style**: `bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500/20`
- **Typography**: `text-slate-900 font-bold` (for main inputs).

### 3.3 Navigation (Sidebar)
- **Container**: `bg-white border-r border-slate-200`.
- **Item Default**: `text-slate-500 hover:bg-slate-50 hover:text-slate-900`.
- **Item Active**: `bg-slate-900 text-white shadow-md`.
- **Animation**: `transition-all duration-200 hover:translate-x-1`.

### 3.4 Status Badges
- **Style**: `rounded-full px-3 py-1 text-xs font-bold uppercase`.
- **Trend/Warning**: `bg-red-100 text-red-600`.
- **Success**: `bg-green-100 text-green-600`.
- **Neutral**: `bg-slate-100 text-slate-600`.

## 4. Implementation Rules
1. **Consistency**: Always use the defined `slate` color palette. Do not use random hex codes.
2. **Component Reuse**: Prefer modifying existing `shadcn/ui` components over creating custom CSS.
3. **Responsive**: Mobile-first approach. Sidebar hidden on mobile (Drawer), visible on desktop.
4. **Motion**: Use subtle transitions (`transition-all duration-200`) for hover states.

---
*This document is the single source of truth for ChinaTechOS UI design. Any changes must be approved and documented here.*
