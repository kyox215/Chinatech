
# Order Management System Documentation

## Overview
The Order Management System (OMS) handles customer repair orders, tracking devices from intake to delivery. It replaces the legacy Excel-based tracking.

## Database Schema

### Customer
- **id**: Unique ID (CUID)
- **name**: Customer Name
- **phone**: Phone Number (Indexed)
- **email**: Email Address
- **taxId**: P.IVA / Codice Fiscale
- **repairOrders**: Relation to RepairOrder

### RepairOrder
- **orderNo**: Human-readable ID (e.g., REP-2024-ABCD)
- **status**: PENDING, DIAGNOSING, WAITING_PARTS, REPAIRED, DELIVERED, CANCELLED
- **brand/model**: Device details
- **imeiOrSn**: Serial Number
- **problem**: Customer reported issue
- **diagnosis**: Technician notes
- **financials**: estimatedPrice, finalPrice, deposit
- **logs**: Audit trail of status changes

## API Endpoints

### Customers
- `GET /api/customers?search=...`: Search customers by name, phone, or tax ID.
- `POST /api/customers`: Create a new customer.

### Repairs
- `GET /api/repairs?status=...&search=...`: List repair orders with filtering.
- `POST /api/repairs`: Create a new repair order.
  - Links to existing customer by phone automatically.

## Legacy Import
A migration script `scripts/import-legacy-excel.ts` is provided to import data from `ChinaTech_RIPARAZIONE.xlsx`.
- Maps legacy statuses to new Enum.
- Creates Customers from Name/Phone.
- Generates logs for legacy data.

## Usage
1. **New Order**: Go to `/repairs`, click "New Order". Enter Customer Phone (auto-search) and Device Details.
2. **Track Status**: Use the Tabs in `/repairs` to filter by status.
3. **Customer History**: Go to `/customers`, click "View" to see all orders for a customer.
