import { create } from 'zustand'
import type { AnalyticsFilters } from '../schemas/analytics.schema'

// Presets de rango que comparten todas las pestañas del análisis.
export type RangePreset = '30d' | '90d' | '12m'

interface AnalyticsFiltersState {
    range: RangePreset
    setRange: (range: RangePreset) => void
}

export const useAnalyticsFiltersStore = create<AnalyticsFiltersState>((set) => ({
    range: '90d',
    setRange: (range) => set({ range }),
}))

function toISODate(date: Date): string {
    return date.toISOString().slice(0, 10) // 'YYYY-MM-DD'
}

// Traduce el preset seleccionado a los filtros (start_date/end_date) que espera la API.
export function rangeToFilters(range: RangePreset): AnalyticsFilters {
    const end = new Date()
    const start = new Date()

    if (range === '30d') start.setDate(end.getDate() - 29)
    else if (range === '90d') start.setDate(end.getDate() - 89)
    else start.setMonth(end.getMonth() - 12) // '12m'

    return { start_date: toISODate(start), end_date: toISODate(end) }
}

// Hook de conveniencia: filtros derivados del rango activo.
export function useAnalyticsFilters(): AnalyticsFilters {
    const range = useAnalyticsFiltersStore((s) => s.range)
    return rangeToFilters(range)
}
