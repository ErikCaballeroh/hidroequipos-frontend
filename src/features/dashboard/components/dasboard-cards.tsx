"use client"

import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import {
    DollarSignIcon,
    ClipboardListIcon,
    AlertTriangleIcon,
} from "lucide-react"

import { useDailySales } from "../../sales/api/sales.api"
import { useSuggestedOrdersSummary } from "../api/dashboard.api"

function formatMXN(value: number) {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

function formatNumber(value: number) {
    return new Intl.NumberFormat("es-MX").format(value)
}

function CardSkeleton() {
    return (
        <Card className="@container/card">
            <CardHeader>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32 mt-2" />
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5">
                <Skeleton className="h-4 w-40" />
            </CardFooter>
        </Card>
    )
}

export function DashboardCards() {
    const { data: dailySales, isLoading: loadingSales } = useDailySales()
    const { data: suggestedSummary, isLoading: loadingSuggested } = useSuggestedOrdersSummary()

    const isLoading = loadingSales || loadingSuggested

    if (isLoading) {
        return (
            <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-3">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        )
    }

    const totalSales = dailySales?.reduce((sum, d) => sum + d.total_sales, 0) ?? 0
    const totalDays = dailySales?.length ?? 1
    const dailyAvg = totalDays > 0 ? totalSales / totalDays : 0

    const pendingOrders = suggestedSummary?.suggested_orders ?? 0
    const ordersYesterday = suggestedSummary?.suggested_orders_yesterday ?? 0
    const criticalStock = suggestedSummary?.critical_products ?? 0
    const reorderStock = suggestedSummary?.reorder_point_products ?? 0

    const orderDiff = pendingOrders - ordersYesterday
    const orderDiffText = orderDiff >= 0 ? `+${orderDiff} que ayer` : `${orderDiff} que ayer`

    const cards = [
        {
            title: "Ventas Totales",
            value: formatMXN(totalSales),
            icon: <DollarSignIcon className="size-4" />,
            footer: `Promedio diario: ${formatMXN(dailyAvg)}`,
            subFooter: `${totalDays} días en el período`,
        },
        {
            title: "Pedidos Sugeridos",
            value: `${pendingOrders} órdenes`,
            icon: <ClipboardListIcon className="size-4" />,
            footer: orderDiffText,
            subFooter: "Automatización de compras lista",
        },
        {
            title: "Stock Crítico",
            value: formatNumber(criticalStock),
            icon: <AlertTriangleIcon className="size-4" />,
            footer: `Atención inmediata`,
            subFooter: `Requieren reabastecimiento urgente`,
        },
    ]

    return (
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
            {cards.map((card) => (
                <Card key={card.title} className="@container/card">
                    <CardHeader>
                        <CardDescription>{card.title}</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {card.value}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline" className="text-primary border-primary/20">
                                {card.icon}
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {card.footer}
                        </div>
                        <div className="text-muted-foreground">
                            {card.subFooter}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

