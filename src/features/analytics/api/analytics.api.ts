import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { apiClient } from '@/lib/api/client'
import {
    accountsReceivableItemSchema,
    creditVsPaymentsItemSchema,
    customerSummarySchema,
    marginSummarySchema,
    marginTrendItemSchema,
    profitByDepartmentItemSchema,
    salesByMonthItemSchema,
    salesByWeekdayItemSchema,
    salesHeatmapItemSchema,
    topCustomerItemSchema,
    topProfitableProductItemSchema,
    type AccountsReceivableItem,
    type AnalyticsFilters,
    type CreditVsPaymentsItem,
    type CustomerSummary,
    type MarginSummary,
    type MarginTrendItem,
    type ProfitByDepartmentItem,
    type SalesByMonthItem,
    type SalesByWeekdayItem,
    type SalesHeatmapItem,
    type TopCustomerItem,
    type TopProfitableProductItem,
} from '../schemas/analytics.schema'

const BASE = '/api/v1/analytics'

function buildParams(filters?: AnalyticsFilters) {
    const params: Record<string, string | number> = {}
    if (filters?.start_date) params.start_date = filters.start_date
    if (filters?.end_date) params.end_date = filters.end_date
    if (filters?.limit) params.limit = filters.limit
    return params
}

// ---------- Tema 1: Rentabilidad ----------

async function getMarginSummary(filters?: AnalyticsFilters): Promise<MarginSummary> {
    const { data } = await apiClient.get(`${BASE}/margin-summary`, { params: buildParams(filters) })
    return marginSummarySchema.parse(data)
}
export function useMarginSummary(filters?: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'margin-summary', filters],
        queryFn: () => getMarginSummary(filters),
    })
}

async function getMarginTrend(filters?: AnalyticsFilters): Promise<MarginTrendItem[]> {
    const { data } = await apiClient.get(`${BASE}/margin-trend`, { params: buildParams(filters) })
    return z.array(marginTrendItemSchema).parse(data)
}
export function useMarginTrend(filters?: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'margin-trend', filters],
        queryFn: () => getMarginTrend(filters),
    })
}

async function getProfitByDepartment(filters?: AnalyticsFilters): Promise<ProfitByDepartmentItem[]> {
    const { data } = await apiClient.get(`${BASE}/profit-by-department`, { params: buildParams(filters) })
    return z.array(profitByDepartmentItemSchema).parse(data)
}
export function useProfitByDepartment(filters?: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'profit-by-department', filters],
        queryFn: () => getProfitByDepartment(filters),
    })
}

async function getTopProfitableProducts(filters?: AnalyticsFilters): Promise<TopProfitableProductItem[]> {
    const { data } = await apiClient.get(`${BASE}/top-profitable-products`, { params: buildParams(filters) })
    return z.array(topProfitableProductItemSchema).parse(data)
}
export function useTopProfitableProducts(filters?: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'top-profitable-products', filters],
        queryFn: () => getTopProfitableProducts(filters),
    })
}

// ---------- Tema 2: Clientes y crédito ----------

async function getCustomerSummary(filters?: AnalyticsFilters): Promise<CustomerSummary> {
    const { data } = await apiClient.get(`${BASE}/customer-summary`, { params: buildParams(filters) })
    return customerSummarySchema.parse(data)
}
export function useCustomerSummary(filters?: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'customer-summary', filters],
        queryFn: () => getCustomerSummary(filters),
    })
}

async function getTopCustomers(filters?: AnalyticsFilters): Promise<TopCustomerItem[]> {
    const { data } = await apiClient.get(`${BASE}/top-customers`, { params: buildParams(filters) })
    return z.array(topCustomerItemSchema).parse(data)
}
export function useTopCustomers(filters?: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'top-customers', filters],
        queryFn: () => getTopCustomers(filters),
    })
}

async function getCreditVsPayments(filters?: AnalyticsFilters): Promise<CreditVsPaymentsItem[]> {
    const { data } = await apiClient.get(`${BASE}/credit-vs-payments`, { params: buildParams(filters) })
    return z.array(creditVsPaymentsItemSchema).parse(data)
}
export function useCreditVsPayments(filters?: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'credit-vs-payments', filters],
        queryFn: () => getCreditVsPayments(filters),
    })
}

async function getAccountsReceivable(filters?: AnalyticsFilters): Promise<AccountsReceivableItem[]> {
    const { data } = await apiClient.get(`${BASE}/accounts-receivable`, { params: buildParams(filters) })
    return z.array(accountsReceivableItemSchema).parse(data)
}
export function useAccountsReceivable(filters?: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'accounts-receivable', filters],
        queryFn: () => getAccountsReceivable(filters),
    })
}

// ---------- Tema 3: Estacionalidad ----------

async function getSalesHeatmap(filters?: AnalyticsFilters): Promise<SalesHeatmapItem[]> {
    const { data } = await apiClient.get(`${BASE}/sales-heatmap`, { params: buildParams(filters) })
    return z.array(salesHeatmapItemSchema).parse(data)
}
export function useSalesHeatmap(filters?: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'sales-heatmap', filters],
        queryFn: () => getSalesHeatmap(filters),
    })
}

async function getSalesByMonth(filters?: AnalyticsFilters): Promise<SalesByMonthItem[]> {
    const { data } = await apiClient.get(`${BASE}/sales-by-month`, { params: buildParams(filters) })
    return z.array(salesByMonthItemSchema).parse(data)
}
export function useSalesByMonth(filters?: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'sales-by-month', filters],
        queryFn: () => getSalesByMonth(filters),
    })
}

async function getSalesByWeekday(filters?: AnalyticsFilters): Promise<SalesByWeekdayItem[]> {
    const { data } = await apiClient.get(`${BASE}/sales-by-weekday`, { params: buildParams(filters) })
    return z.array(salesByWeekdayItemSchema).parse(data)
}
export function useSalesByWeekday(filters?: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'sales-by-weekday', filters],
        queryFn: () => getSalesByWeekday(filters),
    })
}
