import { PageShell } from "@/modules/shared/PageShell";
import { SectionCard } from "@/modules/shared/SectionCard";
import { TicketList } from "@/modules/repairs/TicketList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function RepairsPage() {
  return (
    <PageShell
      title="Repair Tickets"
      description="Manage all incoming repair requests"
      action={<Button className="bg-indigo-600 hover:bg-indigo-700"><Plus className="mr-2 h-4 w-4" /> New Ticket</Button>}
    >
      <SectionCard>
        <TicketList />
      </SectionCard>
    </PageShell>
  );
}
