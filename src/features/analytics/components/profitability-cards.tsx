"use client"

import { PercentIcon, TrendingUpIcon, TicketPercentIcon, TagIcon } from "lucide-react"
import { useMarginSummary } from "../api/analytics.api"
import { useAnalyticsFilters } from "../store/analytics-filters.store"
import { formatMXN, formatPct } from "../lib/format"
import { AnalyticsKpiCards, type KpiCard } from "./analytics-kpi-cards"

export function ProfitabilityCards() {
    const filters = useAnalyticsFilters()
    const { data, isLoading } = useMarginSummary(filters)

    if (isLoading) return <AnalyticsKpiCards cards={[]} isLoading />

    const s = data
    const cards: KpiCard[] = [
        {
            title: "Margen Bruto",
            value: formatPct(s?.margin_pct ?? 0),
            icon: <PercentIcon className="size-4" />,
            footer: `Ganancia: ${formatMXN(s?.total_profit ?? 0)}`,
            subFooter: `Sobre ventas de ${formatMXN(s?.total_sales ?? 0)}`,
        },
        {
            title: "Ganancia Total",
            value: formatMXN(s?.total_profit ?? 0),
            icon: <TrendingUpIcon className="size-4" />,
            footer: "Utilidad del período",
            subFooter: `Margen ${formatPct(s?.margin_pct ?? 0)}`,
        },
        {
            title: "Descuento Otorgado",
            value: formatMXN(s?.total_discount ?? 0),
            icon: <TagIcon className="size-4" />,
            footer: `${formatPct(s?.discount_pct ?? 0)} sobre subtotal`,
            subFooter: "Total descontado a clientes",
        },
        {
            title: "% Descuento",
            value: formatPct(s?.discount_pct ?? 0),
            icon: <TicketPercentIcon className="size-4" />,
            footer: "Erosión por descuentos",
            subFooter: `Descuento: ${formatMXN(s?.total_discount ?? 0)}`,
        },
    ]

    return <AnalyticsKpiCards cards={cards} />
}
