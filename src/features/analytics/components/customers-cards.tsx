"use client"

import { UsersIcon, TicketIcon, WalletIcon, CreditCardIcon } from "lucide-react"
import { useCustomerSummary } from "../api/analytics.api"
import { useAnalyticsFilters } from "../store/analytics-filters.store"
import { formatMXN, formatNumber, formatPct } from "../lib/format"
import { AnalyticsKpiCards, type KpiCard } from "./analytics-kpi-cards"

export function CustomersCards() {
    const filters = useAnalyticsFilters()
    const { data, isLoading } = useCustomerSummary(filters)

    if (isLoading) return <AnalyticsKpiCards cards={[]} isLoading />

    const s = data
    const cards: KpiCard[] = [
        {
            title: "Clientes Activos",
            value: formatNumber(s?.active_customers ?? 0),
            icon: <UsersIcon className="size-4" />,
            footer: "Con compras en el período",
            subFooter: "Clientes distintos",
        },
        {
            title: "Ticket Prom./Cliente",
            value: formatMXN(s?.avg_ticket_per_customer ?? 0),
            icon: <TicketIcon className="size-4" />,
            footer: "Compra promedio por cliente",
            subFooter: "En el período seleccionado",
        },
        {
            title: "Saldo por Cobrar",
            value: formatMXN(s?.receivable_balance ?? 0),
            icon: <WalletIcon className="size-4" />,
            footer: "Cargos a crédito - abonos",
            subFooter: "Acumulado a la fecha",
        },
        {
            title: "% Ventas a Crédito",
            value: formatPct(s?.credit_sales_pct ?? 0),
            icon: <CreditCardIcon className="size-4" />,
            footer: "Proporción vendida a crédito",
            subFooter: "Sobre ventas del período",
        },
    ]

    return <AnalyticsKpiCards cards={cards} />
}
