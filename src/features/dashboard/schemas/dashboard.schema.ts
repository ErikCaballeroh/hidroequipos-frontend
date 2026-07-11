import { z } from 'zod'

// --- Historial de estado de inventario (para la gráfica) ---
export const inventoryStatusPointSchema = z.object({
    date: z.string(), 
    critical_stock: z.number(), // productos agotados o por debajo del umbral de seguridad
    reorder_point: z.number(), // productos en su punto de reorden (ROP)
    optimal_stock: z.number(), // productos dentro de rangos saludables
})

export type InventoryStatusPoint = z.infer<typeof inventoryStatusPointSchema>

// --- Resumen para la tarjeta de "Pedidos Sugeridos" 
export const suggestedOrdersSummarySchema = z.object({
    suggested_orders: z.number(), // total de productos que requieren reorden hoy (critical_stock + reorder_point)
    suggested_orders_yesterday: z.number(), // total del día anterior, para calcular la variación
    critical_products: z.number(),
    reorder_point_products: z.number(),
})

export type SuggestedOrdersSummary = z.infer<typeof suggestedOrdersSummarySchema>

export interface DashboardFilters {
    branch_id?: string
    start_date?: string
    end_date?: string
}
