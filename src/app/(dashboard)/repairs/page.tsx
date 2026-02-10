import { PageShell } from "@/modules/shared/PageShell";
import { SectionCard } from "@/modules/shared/SectionCard";
import { TicketList } from "@/modules/repairs/TicketList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RepairsPage() {
  const t = useTranslations("Repairs");

  return (
    <PageShell
      title={t("title")}
      description={t("description")}
      action={<Button className="bg-indigo-600 hover:bg-indigo-700"><Plus className="mr-2 h-4 w-4" /> {t("newTicket")}</Button>}
    >
      <SectionCard>
        <TicketList />
      </SectionCard>
    </PageShell>
  );
}
