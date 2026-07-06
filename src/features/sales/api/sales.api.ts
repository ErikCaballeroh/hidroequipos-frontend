import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import {
    dailySaleItemSchema,
    paymentMethodItemSchema,
    recentTicketItemSchema,
    topProductItemSchema,
    type DailySaleItem,
    type PaymentMethodItem,
    type RecentTicketItem,
    type TopProductItem,
    type SalesFilters,
} from '../schemas/sales.schema'
import { z } from 'zod'

function buildParams(filters?: SalesFilters) {
    const params: Record<string, string | number> = {}
    if (filters?.branch_id) params.branch_id = filters.branch_id
    if (filters?.start_date) params.start_date = filters.start_date
    if (filters?.end_date) params.end_date = filters.end_date
    if (filters?.limit) params.limit = filters.limit
    return params
}

// --- Daily Sales ---
async function getDailySales(filters?: SalesFilters): Promise<DailySaleItem[]> {
    const { data } = await apiClient.get('/api/v1/sales/daily-sales', {
        params: buildParams(filters),
    })
    return z.array(dailySaleItemSchema).parse(data)
}

export function useDailySales(filters?: SalesFilters) {
    return useQuery({
        queryKey: ['sales', 'daily-sales', filters],
        queryFn: () => getDailySales(filters),
    })
}

// --- Payment Methods ---
async function getPaymentMethods(filters?: SalesFilters): Promise<PaymentMethodItem[]> {
    const { data } = await apiClient.get('/api/v1/sales/payment-methods', {
        params: buildParams(filters),
    })
    return z.array(paymentMethodItemSchema).parse(data)
}

export function usePaymentMethods(filters?: SalesFilters) {
    return useQuery({
        queryKey: ['sales', 'payment-methods', filters],
        queryFn: () => getPaymentMethods(filters),
    })
}

// --- Recent Tickets ---
async function getRecentTickets(filters?: SalesFilters): Promise<RecentTicketItem[]> {
    const { data } = await apiClient.get('/api/v1/sales/recent-tickets', {
        params: buildParams(filters),
    })
    return z.array(recentTicketItemSchema).parse(data)
}

export function useRecentTickets(filters?: SalesFilters) {
    return useQuery({
        queryKey: ['sales', 'recent-tickets', filters],
        queryFn: () => getRecentTickets(filters),
    })
}

// --- Top Products ---
async function getTopProducts(filters?: SalesFilters): Promise<TopProductItem[]> {
    const { data } = await apiClient.get('/api/v1/sales/top-products', {
        params: buildParams(filters),
    })
    return z.array(topProductItemSchema).parse(data)
}

export function useTopProducts(filters?: SalesFilters) {
    return useQuery({
        queryKey: ['sales', 'top-products', filters],
        queryFn: () => getTopProducts(filters),
    })
}
