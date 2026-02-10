import { PageShell } from "@/modules/shared/PageShell";
import { RecycleCalculator } from "@/modules/recycling/RecycleCalculator";
import { useTranslations } from "next-intl";

export default function RecyclingPage() {
  const t = useTranslations("Recycling");

  return (
    <PageShell
      title={t("title")}
      description={t("description")}
    >
      <RecycleCalculator />
    </PageShell>
  );
}
