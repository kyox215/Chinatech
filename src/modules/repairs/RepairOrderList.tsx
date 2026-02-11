
"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { Search, Plus, Filter, Wrench, Smartphone, User, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const STATUS_OPTS = ["ALL", "PENDING", "DIAGNOSING", "WAITING_PARTS", "REPAIRED", "DELIVERED", "CANCELLED"];

export function RepairOrderList() {
  const t = useTranslations("Repairs");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const { data, error, mutate } = useSWR(`/api/repairs?search=${search}&status=${status}`, fetcher);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const orders = data?.data || [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Tabs value={status} onValueChange={setStatus} className="w-full md:w-auto">
          <TabsList>
            {STATUS_OPTS.map(s => (
              <TabsTrigger key={s} value={s}>{s === 'ALL' ? t('all') : s}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
                placeholder={t("searchPlaceholder")} 
                className="pl-8" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            <CreateRepairDialog 
            open={isCreateOpen} 
            onOpenChange={setIsCreateOpen} 
            onSuccess={() => mutate()} 
            />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>{t("customer")}</TableHead>
              <TableHead>{t("device")}</TableHead>
              <TableHead>{t("problem")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("date")}</TableHead>
              <TableHead className="text-right">{t("price")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                  {t("noOrders")}
                </TableCell>
              </TableRow>
            ) : (
              orders.map((o: any) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs font-bold">{o.orderNo}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{o.customer?.name || "Unknown"}</span>
                      <span className="text-xs text-slate-500">{o.customer?.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{o.brand} {o.model}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={o.problem}>
                    {o.problem}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={o.status} />
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {o.finalPrice ? `€${o.finalPrice}` : (o.estimatedPrice ? `~€${o.estimatedPrice}` : '-')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        PENDING: "bg-slate-100 text-slate-700",
        DIAGNOSING: "bg-blue-100 text-blue-700",
        WAITING_PARTS: "bg-orange-100 text-orange-700",
        REPAIRED: "bg-green-100 text-green-700",
        DELIVERED: "bg-green-500 text-white",
        CANCELLED: "bg-red-100 text-red-700",
    };
    return (
        <Badge variant="outline" className={`border-0 ${colors[status] || "bg-gray-100"}`}>
            {status}
        </Badge>
    )
}

function CreateRepairDialog({ open, onOpenChange, onSuccess }: { open: boolean, onOpenChange: (v: boolean) => void, onSuccess: () => void }) {
  const t = useTranslations("Repairs");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed');
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      alert("Error creating order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" /> {t("newOrder")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("newOrder")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <h3 className="font-bold text-sm text-slate-500 uppercase">Customer</h3>
                <div className="grid gap-2">
                    <Label>{t("customerPhone")}</Label>
                    <Input name="customerPhone" placeholder="Search by phone..." required />
                </div>
                <div className="grid gap-2">
                    <Label>{t("customerName")}</Label>
                    <Input name="customerName" required />
                </div>
            </div>
            
            <div className="space-y-2">
                <h3 className="font-bold text-sm text-slate-500 uppercase">Device</h3>
                <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                        <Label>{t("brand")}</Label>
                        <Input name="brand" placeholder="Apple" required />
                    </div>
                    <div className="grid gap-2">
                        <Label>{t("model")}</Label>
                        <Input name="model" placeholder="iPhone 13" required />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label>{t("imei")}</Label>
                    <Input name="imeiOrSn" />
                </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("problem")}</Label>
            <Input name="problem" placeholder="Screen broken, Battery drain..." required />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
             <div className="grid gap-2">
                <Label>{t("passcode")}</Label>
                <Input name="passcode" />
             </div>
             <div className="grid gap-2">
                <Label>{t("estimatedPrice")}</Label>
                <Input name="estimatedPrice" type="number" step="0.01" />
             </div>
             <div className="grid gap-2">
                <Label>{t("deposit")}</Label>
                <Input name="deposit" type="number" step="0.01" defaultValue="0" />
             </div>
          </div>

          <Button type="submit" className="w-full bg-indigo-600" disabled={loading}>
            {loading ? "Creating..." : t("createOrder")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
