import { z } from 'zod'

// Filtros comunes de todos los endpoints de análisis.
export interface AnalyticsFilters {
    start_date?: string
    end_date?: string
    limit?: number
}

// ---------- Tema 1: Rentabilidad ----------

export const marginSummarySchema = z.object({
    total_sales: z.number(),
    total_profit: z.number(),
    margin_pct: z.number(),
    total_discount: z.number(),
    discount_pct: z.number(),
})
export type MarginSummary = z.infer<typeof marginSummarySchema>

export const marginTrendItemSchema = z.object({
    period: z.string(),
    total_sales: z.number(),
    total_profit: z.number(),
    margin_pct: z.number(),
})
export type MarginTrendItem = z.infer<typeof marginTrendItemSchema>

export const profitByDepartmentItemSchema = z.object({
    department: z.string(),
    total_sales: z.number(),
    total_profit: z.number(),
    margin_pct: z.number(),
})
export type ProfitByDepartmentItem = z.infer<typeof profitByDepartmentItemSchema>

export const topProfitableProductItemSchema = z.object({
    product_code: z.string(),
    product_name: z.string(),
    total_profit: z.number(),
    total_sold: z.number(),
    margin_pct: z.number(),
})
export type TopProfitableProductItem = z.infer<typeof topProfitableProductItemSchema>

// ---------- Tema 2: Clientes y crédito ----------

export const customerSummarySchema = z.object({
    active_customers: z.number(),
    avg_ticket_per_customer: z.number(),
    receivable_balance: z.number(),
    credit_sales_pct: z.number(),
})
export type CustomerSummary = z.infer<typeof customerSummarySchema>

export const topCustomerItemSchema = z.object({
    customer_uuid: z.string(),
    customer_name: z.string(),
    total: z.number(),
    ticket_count: z.number(),
})
export type TopCustomerItem = z.infer<typeof topCustomerItemSchema>

export const creditVsPaymentsItemSchema = z.object({
    period: z.string(),
    credit_charges: z.number(),
    payments: z.number(),
})
export type CreditVsPaymentsItem = z.infer<typeof creditVsPaymentsItemSchema>

export const accountsReceivableItemSchema = z.object({
    customer_uuid: z.string(),
    customer_name: z.string(),
    credit_limit: z.number(),
    charges: z.number(),
    payments: z.number(),
    balance: z.number(),
})
export type AccountsReceivableItem = z.infer<typeof accountsReceivableItemSchema>

// ---------- Tema 3: Estacionalidad ----------

export const salesHeatmapItemSchema = z.object({
    weekday: z.number(),
    hour: z.number(),
    total: z.number(),
    ticket_count: z.number(),
})
export type SalesHeatmapItem = z.infer<typeof salesHeatmapItemSchema>

export const salesByMonthItemSchema = z.object({
    month: z.number(),
    total: z.number(),
    ticket_count: z.number(),
})
export type SalesByMonthItem = z.infer<typeof salesByMonthItemSchema>

export const salesByWeekdayItemSchema = z.object({
    weekday: z.number(),
    total: z.number(),
    ticket_count: z.number(),
})
export type SalesByWeekdayItem = z.infer<typeof salesByWeekdayItemSchema>
