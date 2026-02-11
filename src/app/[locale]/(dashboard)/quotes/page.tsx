import { quoteService } from "@/services/quote.service";
import { QuoteManagementClient } from "./client";
import { QuoteRecord } from "@/modules/quotes/types";

// Force dynamic rendering to ensure fresh data
export const dynamic = "force-dynamic";

export default async function QuotePage() {
  // Fetch all quotes for client-side filtering/grouping
  // In a larger app, we would move filtering to the server, but to retain 
  // the exact current functionality (grouping by brand, etc.), we fetch all.
  const { data } = await quoteService.getQuotes({ 
    limit: 10000, 
    currency: "EUR" 
  });

  // Map to QuoteRecord interface (snake_case) expected by the client component
  const initialData: QuoteRecord[] = data.map(q => ({
    id: q.id,
    brand: q.brand,
    model: q.model,
    repair_id: q.repairId,
    repair_label: q.repairLabel,
    repair_type: q.repairType as any,
    quality: q.quality as any,
    price: q.price,
    warranty: q.warranty,
    count: q.count,
    is_unstable: q.isUnstable,
    price_spread: q.priceSpread,
    created_at: q.createdAt.toISOString(),
    updated_at: q.updatedAt.toISOString(),
  }));

  return <QuoteManagementClient initialData={initialData} />;
}
