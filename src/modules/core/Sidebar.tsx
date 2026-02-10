"use client";

import { LayoutDashboard, Wrench, Package, Settings, LogOut, Recycle, CircleDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function Sidebar({ className }: { className?: string }) {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();

  const navigation = [
    { name: t("dashboard"), href: "/", icon: LayoutDashboard },
    { name: t("repairs"), href: "/repairs", icon: Wrench },
    { name: t("recycling"), href: "/recycling", icon: Recycle },
    { name: t("quotes"), href: "/quotes", icon: CircleDollarSign },
    { name: t("inventory"), href: "/inventory", icon: Package },
    { name: t("settings"), href: "/settings", icon: Settings },
  ];

  return (
    <div className={cn("flex h-full w-full flex-col bg-white border-r border-slate-200 text-slate-900", className)}>
      <div className="flex h-20 items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
          <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/20">
            <span className="text-white font-mono text-lg">C</span>
          </div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">ChinaTechOS</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-200 group",
                  isActive 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 translate-x-1" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1"
                )}
              >
                <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-slate-200" : "text-slate-400 group-hover:text-slate-600")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group">
          <LogOut className="h-5 w-5 group-hover:text-red-500" />
          {t("signOut")}
        </button>
      </div>
    </div>
  );
}
