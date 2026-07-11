"use client"

import { CalendarIcon, CalendarDaysIcon, ClockIcon } from "lucide-react"
import { useSalesByMonth, useSalesByWeekday, useSalesHeatmap } from "../api/analytics.api"
import { useAnalyticsFilters } from "../store/analytics-filters.store"
import { formatMXN, MONTH_LABELS, WEEKDAY_LABELS } from "../lib/format"
import { AnalyticsKpiCards, type KpiCard } from "./analytics-kpi-cards"

export function SeasonalityCards() {
    const filters = useAnalyticsFilters()
    const byMonth = useSalesByMonth(filters)
    const byWeekday = useSalesByWeekday(filters)
    const heatmap = useSalesHeatmap(filters)

    const isLoading = byMonth.isLoading || byWeekday.isLoading || heatmap.isLoading
    if (isLoading) return <AnalyticsKpiCards cards={[]} isLoading count={3} />

    // Mejor mes.
    const bestMonth = (byMonth.data ?? []).reduce(
        (best, d) => (d.total > best.total ? d : best),
        { month: 0, total: 0, ticket_count: 0 }
    )

    // Día pico.
    const bestDay = (byWeekday.data ?? []).reduce(
        (best, d) => (d.total > best.total ? d : best),
        { weekday: -1, total: 0, ticket_count: 0 }
    )

    // Hora pico: se suman las ventas por hora a través de todos los días.
    const byHour = new Array(24).fill(0)
    for (const cell of heatmap.data ?? []) {
        if (cell.hour >= 0 && cell.hour < 24) byHour[cell.hour] += cell.total
    }
    let peakHour = -1
    let peakHourTotal = 0
    byHour.forEach((total, hour) => {
        if (total > peakHourTotal) {
            peakHourTotal = total
            peakHour = hour
        }
    })

    const cards: KpiCard[] = [
        {
            title: "Mejor Mes",
            value: bestMonth.month > 0 ? MONTH_LABELS[bestMonth.month - 1] : "—",
            icon: <CalendarIcon className="size-4" />,
            footer: bestMonth.total > 0 ? formatMXN(bestMonth.total) : "Sin datos",
            subFooter: "Mes con más ventas",
        },
        {
            title: "Día Pico",
            value: bestDay.weekday >= 0 ? WEEKDAY_LABELS[bestDay.weekday] : "—",
            icon: <CalendarDaysIcon className="size-4" />,
            footer: bestDay.total > 0 ? formatMXN(bestDay.total) : "Sin datos",
            subFooter: "Día de la semana más fuerte",
        },
        {
            title: "Hora Pico",
            value: peakHour >= 0 ? `${peakHour}:00 h` : "—",
            icon: <ClockIcon className="size-4" />,
            footer: peakHourTotal > 0 ? formatMXN(peakHourTotal) : "Sin datos",
            subFooter: "Hora con mayor venta",
        },
    ]

    return <AnalyticsKpiCards cards={cards} count={3} />
}
