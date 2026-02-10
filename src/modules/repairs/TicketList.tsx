"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/modules/shared/DataTable"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Eye, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define the shape of our data
export type Ticket = {
  id: string
  customer: string
  device: string
  issue: string
  status: "pending" | "in_progress" | "completed" | "cancelled"
  date: string
  price: string
}

// Mock data
const data: Ticket[] = [
  {
    id: "T-1001",
    customer: "Alice Johnson",
    device: "iPhone 13 Pro",
    issue: "Screen Replacement",
    status: "in_progress",
    date: "2024-02-10",
    price: "$120.00",
  },
  {
    id: "T-1002",
    customer: "Bob Smith",
    device: "Samsung S21",
    issue: "Battery Replacement",
    status: "pending",
    date: "2024-02-09",
    price: "$80.00",
  },
  {
    id: "T-1003",
    customer: "Charlie Brown",
    device: "MacBook Air M1",
    issue: "Keyboard Repair",
    status: "completed",
    date: "2024-02-08",
    price: "$200.00",
  },
  {
    id: "T-1004",
    customer: "Diana Prince",
    device: "iPad Pro 11",
    issue: "Charging Port",
    status: "pending",
    date: "2024-02-10",
    price: "$95.00",
  },
]

import { useTranslations } from "next-intl";

export function TicketList() {
  const t = useTranslations("Repairs");

  // Since we cannot use hooks inside column definitions directly, 
  // we can create columns inside the component or pass t function to a helper.
  // For simplicity here, we'll redefine columns inside or wrap the table.
  // However, react-table columns are usually static. 
  // A common pattern is to use a custom cell renderer that uses hooks, 
  // or pass the translation function as meta data.
  // Let's refactor to allow translations in columns.

  const columns: ColumnDef<Ticket>[] = [
    {
      accessorKey: "id",
      header: t("table.id"),
      cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "customer",
      header: t("table.customer"),
      cell: ({ row }) => <span className="font-medium text-slate-900">{row.getValue("customer")}</span>,
    },
    {
      accessorKey: "device",
      header: t("table.device"),
    },
    {
      accessorKey: "issue",
      header: t("table.issue"),
    },
    {
      accessorKey: "status",
      header: t("table.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge 
              variant={
                  status === "completed" ? "default" : 
                  status === "in_progress" ? "secondary" : 
                  "outline"
              }
              className={
                  status === "completed" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200" :
                  status === "in_progress" ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200" :
                  "bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200"
              }
          >
            {t(`status.${status}`)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "price",
      header: t("table.price"),
      cell: ({ row }) => <span className="font-mono text-slate-600">{row.getValue("price")}</span>,
    },
    {
      id: "actions",
      header: t("table.actions"),
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("table.actions")}</DropdownMenuLabel>
              <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" /> {t("table.viewDetails")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" /> {t("table.editTicket")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  return (
    <>
      <div className="md:hidden space-y-4">
        {data.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-lg border border-slate-200 p-4 space-y-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs text-slate-500">{ticket.id}</span>
                <h3 className="font-medium text-slate-900 mt-1">{ticket.customer}</h3>
                <p className="text-sm text-slate-600">{ticket.device}</p>
              </div>
              <Badge 
                  variant={
                      ticket.status === "completed" ? "default" : 
                      ticket.status === "in_progress" ? "secondary" : 
                      "outline"
                  }
                  className={
                      ticket.status === "completed" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200" :
                      ticket.status === "in_progress" ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200" :
                      "bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200"
                  }
              >
                {t(`status.${ticket.status}`)}
              </Badge>
            </div>
            
            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <div>
                 <p className="text-sm text-slate-900">{ticket.issue}</p>
                 <p className="font-mono text-sm text-slate-600 mt-1">{ticket.price}</p>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t("table.actions")}</DropdownMenuLabel>
                  <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> {t("table.viewDetails")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> {t("table.editTicket")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} searchKey="customer" />
      </div>
    </>
  )
}
