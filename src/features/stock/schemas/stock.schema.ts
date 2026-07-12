import { z } from 'zod'

export const inventoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  stock: z.number(),
  rop: z.number(),
  d: z.number(),
  l: z.number(),
  ss: z.number(),
  f: z.number(),
  status: z.string(),
  supplier: z.string(),
  has_pending_order: z.boolean().optional(),
})

export type InventoryItem = z.infer<typeof inventoryItemSchema>

export interface StockFilters {
  branch_id?: string
}

export interface RestockPayload {
  product_id: string
  quantity: number
}

export interface BulkRestockPayload {
  items: RestockPayload[]
}

export interface RestockConfigResponse {
  branch_id: string
  auto_restock_activo: boolean
  nivel_servicio: number
  z_alpha: number
}

export interface RestockConfigUpdate {
  auto_restock_activo: boolean
}

