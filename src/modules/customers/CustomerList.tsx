
"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { Search, Plus, User, Phone, Mail, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function CustomerList() {
  const t = useTranslations("Customers");
  const [search, setSearch] = useState("");
  const { data, error, mutate } = useSWR(`/api/customers?search=${search}`, fetcher);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const customers = data?.data || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
          <Input 
            placeholder={t("searchPlaceholder")} 
            className="pl-8" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <CreateCustomerDialog 
          open={isCreateOpen} 
          onOpenChange={setIsCreateOpen} 
          onSuccess={() => mutate()} 
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("contact")}</TableHead>
              <TableHead>{t("type")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  {t("noCustomers")}
                </TableCell>
              </TableRow>
            ) : (
              customers.map((c: any) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-2"><User className="h-3 w-3 text-slate-400"/> {c.name}</span>
                      {c.taxId && <span className="text-xs text-slate-500">{c.taxId}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm">
                      {c.phone && <span className="flex items-center gap-2"><Phone className="h-3 w-3 text-slate-400"/> {c.phone}</span>}
                      {c.email && <span className="flex items-center gap-2"><Mail className="h-3 w-3 text-slate-400"/> {c.email}</span>}
                      {c.address && <span className="flex items-center gap-2"><MapPin className="h-3 w-3 text-slate-400"/> {c.address}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                      {c.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => window.location.href = `/customers/${c.id}`}>
                      {t("view")}
                    </Button>
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

function CreateCustomerDialog({ open, onOpenChange, onSuccess }: { open: boolean, onOpenChange: (v: boolean) => void, onSuccess: () => void }) {
  const t = useTranslations("Customers");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed');
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      alert("Error creating customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" /> {t("newCustomer")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("newCustomer")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label>{t("name")}</Label>
            <Input name="name" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>{t("phone")}</Label>
              <Input name="phone" />
            </div>
            <div className="grid gap-2">
              <Label>{t("email")}</Label>
              <Input name="email" type="email" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>{t("taxId")}</Label>
            <Input name="taxId" placeholder="P.IVA / CF" />
          </div>
          <div className="grid gap-2">
            <Label>{t("address")}</Label>
            <Input name="address" />
          </div>
          <Button type="submit" className="w-full bg-indigo-600" disabled={loading}>
            {loading ? "Creating..." : t("create")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
