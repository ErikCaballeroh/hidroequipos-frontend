"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useSalesByWeekday } from "../api/analytics.api"
import { useAnalyticsFilters } from "../store/analytics-filters.store"
import { formatCompactMXN, formatMXN, WEEKDAY_LABELS } from "../lib/format"

const chartConfig = {
    total: { label: "Ventas", color: "var(--chart-2)" },
} satisfies ChartConfig

export function SalesByWeekdayChart() {
    const filters = useAnalyticsFilters()
    const { data, isLoading } = useSalesByWeekday(filters)

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-44" />
                    <Skeleton className="h-4 w-56 mt-1" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        )
    }

    const chartData = (data ?? []).map((d) => ({
        ...d,
        label: WEEKDAY_LABELS[d.weekday] ?? String(d.weekday),
    }))

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Ventas por Día de la Semana</CardTitle>
                <CardDescription>Qué días vende más el negocio</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            width={60}
                            tickFormatter={(v) => formatCompactMXN(v as number)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    formatter={(value) => formatMXN(value as number)}
                                    indicator="dot"
                                />
                            }
                        />
                        <Bar dataKey="total" fill="var(--color-total)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
