
import { useTranslations } from "next-intl";
import { RecycleCalculator } from "@/modules/recycling/RecycleCalculator";

export default function RecyclingPage() {
  const t = useTranslations("Recycling");

  return (
    <div className="h-full flex flex-col bg-slate-50/50">
      <div className="flex-none p-6 pb-2">
        <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white px-3 py-1 rounded text-sm font-bold tracking-wider">
                {t('title')}
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase">{t('description')}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <RecycleCalculator />
      </div>
    </div>
  );
}
