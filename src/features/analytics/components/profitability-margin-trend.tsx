"use client"

import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts"

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
import { useMarginTrend } from "../api/analytics.api"
import { useAnalyticsFilters } from "../store/analytics-filters.store"
import { formatCompactMXN, formatMonthPeriod, formatMXN, formatPct } from "../lib/format"

const chartConfig = {
    total_sales: { label: "Ventas", color: "var(--chart-1)" },
    margin_pct: { label: "Margen %", color: "var(--chart-3)" },
} satisfies ChartConfig

export function ProfitabilityMarginTrend() {
    const filters = useAnalyticsFilters()
    const { data, isLoading } = useMarginTrend(filters)

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-56 mt-1" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[320px] w-full" />
                </CardContent>
            </Card>
        )
    }

    const chartData = data ?? []

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Tendencia de Margen</CardTitle>
                <CardDescription>
                    Ventas mensuales y margen de ganancia (%)
                </CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {chartData.length === 0 ? (
                    <div className="flex h-[320px] items-center justify-center text-muted-foreground">
                        No hay datos para el período seleccionado
                    </div>
                ) : (
                    <ChartContainer config={chartConfig} className="aspect-auto h-[320px] w-full">
                        <ComposedChart data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="period"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={formatMonthPeriod}
                            />
                            <YAxis
                                yAxisId="left"
                                tickLine={false}
                                axisLine={false}
                                width={60}
                                tickFormatter={(v) => formatCompactMXN(v as number)}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tickLine={false}
                                axisLine={false}
                                width={44}
                                tickFormatter={(v) => `${Math.round((v as number) * 100)}%`}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => formatMonthPeriod(value as string)}
                                        formatter={(value, name) =>
                                            name === "margin_pct"
                                                ? formatPct(value as number)
                                                : formatMXN(value as number)
                                        }
                                        indicator="dot"
                                    />
                                }
                            />
                            <Bar
                                yAxisId="left"
                                dataKey="total_sales"
                                fill="var(--color-total_sales)"
                                radius={[6, 6, 0, 0]}
                            />
                            <Line
                                yAxisId="right"
                                dataKey="margin_pct"
                                type="monotone"
                                stroke="var(--color-margin_pct)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </ComposedChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
