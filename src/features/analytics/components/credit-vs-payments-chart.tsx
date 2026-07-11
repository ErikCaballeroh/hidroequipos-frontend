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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useCreditVsPayments } from "../api/analytics.api"
import { useAnalyticsFilters } from "../store/analytics-filters.store"
import { formatCompactMXN, formatMonthPeriod, formatMXN } from "../lib/format"

const chartConfig = {
    credit_charges: { label: "Cargos a crédito", color: "var(--chart-4)" },
    payments: { label: "Abonos", color: "var(--chart-2)" },
} satisfies ChartConfig

export function CreditVsPaymentsChart() {
    const filters = useAnalyticsFilters()
    const { data, isLoading } = useCreditVsPayments(filters)

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-60 mt-1" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        )
    }

    const chartData = data ?? []

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Crédito vs Abonos</CardTitle>
                <CardDescription>Cargos a crédito y abonos recibidos por mes</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {chartData.length === 0 ? (
                    <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                        No hay movimientos de crédito en el período
                    </div>
                ) : (
                    <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                        <BarChart data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="period"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={formatMonthPeriod}
                            />
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
                                        labelFormatter={(value) => formatMonthPeriod(value as string)}
                                        formatter={(value) => formatMXN(value as number)}
                                        indicator="dot"
                                    />
                                }
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="credit_charges" fill="var(--color-credit_charges)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="payments" fill="var(--color-payments)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
