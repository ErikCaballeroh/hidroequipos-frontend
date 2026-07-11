import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import {
    suggestedOrdersSummarySchema,
    inventoryStatusPointSchema,
    type SuggestedOrdersSummary,
    type InventoryStatusPoint,
    type DashboardFilters,
} from '../schemas/dashboard.schema'

import { z } from 'zod'

function buildParams(filters?: DashboardFilters) {
    const params: Record<string, string> = {}
    if (filters?.branch_id) params.branch_id = filters.branch_id
    if (filters?.start_date) params.start_date = filters.start_date
    if (filters?.end_date) params.end_date = filters.end_date
    return params
}

// --- Tarjeta: Pedidos Sugeridos ---
async function getSuggestedOrdersSummary(filters?: DashboardFilters): Promise<SuggestedOrdersSummary> {
    const { data } = await apiClient.get('/api/v1/stock/suggested-orders', {
        params: buildParams(filters),
    })
    return suggestedOrdersSummarySchema.parse(data)
}

export function useSuggestedOrdersSummary(filters?: DashboardFilters) {
    return useQuery({
        queryKey: ['dashboard', 'suggested-orders', filters],
        queryFn: () => getSuggestedOrdersSummary(filters),
    })
}

// --- Gráfica: historial de estado de inventario ---
async function getInventoryStatusHistory(filters?: DashboardFilters): Promise<InventoryStatusPoint[]> {
    const { data } = await apiClient.get('/api/v1/stock/inventory-status', {
        params: buildParams(filters),
    })
    return z.array(inventoryStatusPointSchema).parse(data)
}

export function useInventoryStatusHistory(filters?: DashboardFilters) {
    return useQuery({
        queryKey: ['dashboard', 'inventory-history', filters],
        queryFn: () => getInventoryStatusHistory(filters),
    })
}