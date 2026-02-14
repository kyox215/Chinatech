# Designali 创意套件后台管理系统 (中文复刻版)

本项目是基于 `后台设计风格.zip` 的完全复刻与汉化版本。采用 Next.js + Tailwind CSS + shadcn/ui 技术栈构建。

## 功能特性

- **完全汉化**: 所有界面文本、数据、提示信息均已翻译为中文。
- **响应式设计**: 完美适配桌面端和移动端。
- **现代 UI**: 使用 shadcn/ui 组件库，风格简洁现代。
- **丰富组件**: 包含仪表盘、应用列表、文件管理、项目管理、学习中心等多个功能模块。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 项目结构

- `app/`: Next.js 页面路由与布局
- `components/creative.tsx`: 核心后台界面组件
- `components/ui/`: UI 组件库 (shadcn/ui)
- `public/`: 静态资源

## 修改记录

- 初始化项目结构
- 汉化 `components/creative.tsx` 中的所有英文内容
- 更新 `app/layout.tsx` 元数据为中文
- 汉化分页与日历组件
