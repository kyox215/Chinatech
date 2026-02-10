import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/modules/shared/LanguageSwitcher/LanguageSwitcher";
import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Header() {
  const t = useTranslations("Common");

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-white border-r-slate-200">
             <VisuallyHidden>
                <SheetTitle>Menu</SheetTitle>
             </VisuallyHidden>
            <Sidebar className="h-full border-none" />
          </SheetContent>
        </Sheet>

        {/* Breadcrumbs placeholder */}
        <span className="text-sm font-medium text-slate-500 hidden md:inline-block">Dashboard</span>
        <span className="text-lg font-bold text-slate-900 md:hidden">ChinaTechOS</span>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <input 
                type="text" 
                placeholder={t("search")} 
                className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
        </div>
        <LanguageSwitcher />
        <Button variant="ghost" size="icon" className="text-slate-500">
          <Bell className="h-6 w-6 md:h-5 md:w-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium text-sm border border-indigo-200">
            JD
        </div>
      </div>
    </header>
  );
}
