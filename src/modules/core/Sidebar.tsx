import Link from "next/link";
import { LayoutDashboard, Wrench, Package, Settings, LogOut, Recycle, CircleDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function Sidebar({ className }: { className?: string }) {
  const t = useTranslations("Sidebar");

  const navigation = [
    { name: t("dashboard"), href: "/", icon: LayoutDashboard },
    { name: t("repairs"), href: "/repairs", icon: Wrench },
    { name: t("recycling"), href: "/recycling", icon: Recycle },
    { name: t("quotes"), href: "/quotes", icon: CircleDollarSign },
    { name: t("inventory"), href: "/inventory", icon: Package },
    { name: t("settings"), href: "/settings", icon: Settings },
  ];

  return (
    <div className={cn("flex h-full w-full flex-col bg-slate-950 text-slate-50", className)}>
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="h-8 w-8 rounded bg-indigo-600 flex items-center justify-center">
            <span className="text-white">C</span>
          </div>
          <span>ChinaTechOS</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors",
                // Active state logic would go here
              )}
            >
              <item.icon className="h-6 w-6" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <LogOut className="h-6 w-6" />
          {t("signOut")}
        </button>
      </div>
    </div>
  );
}
