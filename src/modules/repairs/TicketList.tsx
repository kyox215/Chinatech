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

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <span className="font-medium text-slate-900">{row.getValue("customer")}</span>,
  },
  {
    accessorKey: "device",
    header: "Device",
  },
  {
    accessorKey: "issue",
    header: "Issue",
  },
  {
    accessorKey: "status",
    header: "Status",
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
          {status.replace("_", " ")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span className="font-mono text-slate-600">{row.getValue("price")}</span>,
  },
  {
    id: "actions",
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Edit Ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TicketList() {
  return (
    <DataTable columns={columns} data={data} searchKey="customer" />
  )
}
