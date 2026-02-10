import { PageShell } from "@/modules/shared/PageShell";
import { SectionCard } from "@/modules/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");

  return (
    <PageShell
      title={t("title")}
      description={t("description")}
      action={<Button className="bg-indigo-600 hover:bg-indigo-700"><Plus className="mr-2 h-4 w-4" /> {t("newTicket")}</Button>}
    >
      <div className="grid gap-6 md:grid-cols-3">
        <SectionCard title={t("activeTickets")} description={t("currentlyInProgress")}>
          <div className="text-3xl font-bold font-mono text-indigo-600">12</div>
        </SectionCard>
        <SectionCard title={t("pendingParts")} description={t("waitingForDelivery")}>
          <div className="text-3xl font-bold font-mono text-orange-500">5</div>
        </SectionCard>
        <SectionCard title={t("completedToday")} description={t("revenueGenerated")}>
          <div className="text-3xl font-bold font-mono text-emerald-600">$1,240</div>
        </SectionCard>
      </div>

      <SectionCard title={t("recentActivity")} description={t("latestUpdates")}>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
              <div>
                <p className="font-medium text-slate-900">iPhone 13 Screen Replacement</p>
                <p className="text-sm text-slate-500">Ticket #2024-{100 + i} • {t("assignedTo")} Mike</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                {t("inProgress")}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
