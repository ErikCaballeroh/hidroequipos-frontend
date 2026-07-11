import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import {
  inventoryItemSchema,
  type InventoryItem,
  type StockFilters,
  type RestockPayload,
} from '../schemas/stock.schema'
import { z } from 'zod'

function buildParams(filters?: StockFilters) {
  const params: Record<string, string | number> = {}
  if (filters?.branch_id) params.branch_id = filters.branch_id
  return params
}

async function getInventory(filters?: StockFilters): Promise<InventoryItem[]> {
  const { data } = await apiClient.get('/api/v1/stock/inventory', {
    params: buildParams(filters),
  })
  return z.array(inventoryItemSchema).parse(data)
}

export function useInventory(filters?: StockFilters) {
  return useQuery({
    queryKey: ['stock', 'inventory', filters],
    queryFn: () => getInventory(filters),
  })
}

async function requestRestock(payload: RestockPayload): Promise<{ message: string }> {
  const { data } = await apiClient.post('/api/v1/stock/restock', payload)
  return data
}

export function useRestock() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: requestRestock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock', 'inventory'] })
    },
  })
}

async function receiveRestock(productId: string): Promise<{ message: string }> {
  const { data } = await apiClient.post(`/api/v1/stock/restock/${productId}/receive`)
  return data
}

export function useReceiveRestock() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: receiveRestock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock', 'inventory'] })
    },
  })
}
