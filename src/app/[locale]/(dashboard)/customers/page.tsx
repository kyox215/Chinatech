
import { PageShell } from "@/modules/shared/PageShell";
import { SectionCard } from "@/modules/shared/SectionCard";
import { CustomerList } from "@/modules/customers/CustomerList";
import { useTranslations } from "next-intl";

export default function CustomersPage() {
  const t = useTranslations("Customers");

  return (
    <PageShell
      title={t("title")}
      description={t("description")}
    >
      <SectionCard>
        <CustomerList />
      </SectionCard>
    </PageShell>
  );
}
