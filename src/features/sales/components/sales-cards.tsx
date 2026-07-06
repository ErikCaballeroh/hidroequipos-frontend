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
    TrendingUpIcon,
    ReceiptTextIcon,
    TicketIcon,
} from "lucide-react"
import { useDailySales, usePaymentMethods } from "../api/sales.api"

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
                <Skeleton className="h-3 w-28" />
            </CardFooter>
        </Card>
    )
}

export function SalesCards() {
    const { data: dailySales, isLoading: loadingSales } = useDailySales()
    const { data: paymentMethods, isLoading: loadingPayments } = usePaymentMethods()

    const isLoading = loadingSales || loadingPayments

    const totalSales = dailySales?.reduce((sum, d) => sum + d.total_sales, 0) ?? 0
    const totalProfit = dailySales?.reduce((sum, d) => sum + d.total_profit, 0) ?? 0
    const totalTickets = paymentMethods?.reduce((sum, p) => sum + p.ticket_count, 0) ?? 0
    const avgTicket = totalTickets > 0 ? totalSales / totalTickets : 0
    const totalDays = dailySales?.length ?? 1
    const dailyAvg = totalDays > 0 ? totalSales / totalDays : 0

    if (isLoading) {
        return (
            <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        )
    }

    const cards = [
        {
            title: "Ventas Totales",
            value: formatMXN(totalSales),
            icon: <DollarSignIcon className="size-4" />,
            footer: `Promedio diario: ${formatMXN(dailyAvg)}`,
            subFooter: `${totalDays} días en el período`,
        },
        {
            title: "Ganancia Total",
            value: formatMXN(totalProfit),
            icon: <TrendingUpIcon className="size-4" />,
            footer: `Margen: ${totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : 0}%`,
            subFooter: `Promedio diario: ${formatMXN(totalDays > 0 ? totalProfit / totalDays : 0)}`,
        },
        {
            title: "Tickets Emitidos",
            value: formatNumber(totalTickets),
            icon: <ReceiptTextIcon className="size-4" />,
            footer: `${formatNumber(Math.round(totalTickets / Math.max(totalDays, 1)))} tickets/día`,
            subFooter: `${paymentMethods?.length ?? 0} métodos de pago`,
        },
        {
            title: "Ticket Promedio",
            value: formatMXN(avgTicket),
            icon: <TicketIcon className="size-4" />,
            footer: `Basado en ${formatNumber(totalTickets)} tickets`,
            subFooter: `Período de ${totalDays} días`,
        },
    ]

    return (
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
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
