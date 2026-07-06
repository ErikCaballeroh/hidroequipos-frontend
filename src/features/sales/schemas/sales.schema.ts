import { z } from 'zod'

export const dailySaleItemSchema = z.object({
    date: z.string(),
    total_sales: z.number(),
    total_profit: z.number(),
})

export type DailySaleItem = z.infer<typeof dailySaleItemSchema>

export const paymentMethodItemSchema = z.object({
    payment_method: z.string(),
    total: z.number(),
    ticket_count: z.number(),
})

export type PaymentMethodItem = z.infer<typeof paymentMethodItemSchema>

export const recentTicketItemSchema = z.object({
    folio: z.string().nullable().optional(),
    total: z.number(),
    payment_method: z.string(),
    sold_at: z.string(),
})

export type RecentTicketItem = z.infer<typeof recentTicketItemSchema>

export const topProductItemSchema = z.object({
    product_code: z.string(),
    product_name: z.string(),
    quantity_sold: z.number(),
    total_sold: z.number(),
})

export type TopProductItem = z.infer<typeof topProductItemSchema>

export interface SalesFilters {
    branch_id?: string
    start_date?: string
    end_date?: string
    limit?: number
}
