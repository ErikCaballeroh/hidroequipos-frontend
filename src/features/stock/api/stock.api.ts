import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import {
  inventoryItemSchema,
  type InventoryItem,
  type StockFilters,
  type RestockPayload,
  type BulkRestockPayload,
  type RestockConfigResponse,
  type RestockConfigUpdate,
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

async function requestBulkRestock(payload: BulkRestockPayload): Promise<{ message: string }> {
  const { data } = await apiClient.post('/api/v1/stock/restock/bulk', payload)
  return data
}

export function useBulkRestock() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: requestBulkRestock,
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

async function getRestockConfig(branchId?: string): Promise<RestockConfigResponse> {
  const { data } = await apiClient.get('/api/v1/stock/config', {
    params: branchId ? { branch_id: branchId } : {},
  })
  return data
}

export function useRestockConfig(branchId?: string) {
  return useQuery({
    queryKey: ['stock', 'config', branchId],
    queryFn: () => getRestockConfig(branchId),
  })
}

async function updateRestockConfig(payload: RestockConfigUpdate, branchId?: string): Promise<RestockConfigResponse> {
  const { data } = await apiClient.put('/api/v1/stock/config', payload, {
    params: branchId ? { branch_id: branchId } : {},
  })
  return data
}

export function useUpdateRestockConfig(branchId?: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: RestockConfigUpdate) => updateRestockConfig(payload, branchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock', 'config', branchId] })
    },
  })
}
