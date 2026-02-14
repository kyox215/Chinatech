import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ChinaTech 报价单管理系统 v12.1',
  description: '智能手机维修报价管理系统',
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-800 min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
