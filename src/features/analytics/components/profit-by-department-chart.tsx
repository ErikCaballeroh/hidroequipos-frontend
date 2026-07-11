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
import { useProfitByDepartment } from "../api/analytics.api"
import { useAnalyticsFilters } from "../store/analytics-filters.store"
import { formatCompactMXN, formatMXN, formatPct } from "../lib/format"

const chartConfig = {
    total_profit: { label: "Ganancia", color: "var(--chart-2)" },
} satisfies ChartConfig

export function ProfitByDepartmentChart() {
    const filters = useAnalyticsFilters()
    const { data, isLoading } = useProfitByDepartment(filters)

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

    const chartData = data ?? []

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Ganancia por Departamento</CardTitle>
                <CardDescription>Utilidad y margen por categoría de producto</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {chartData.length === 0 ? (
                    <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                        No hay datos de departamentos
                    </div>
                ) : (
                    <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
                            <CartesianGrid horizontal={false} />
                            <YAxis
                                dataKey="department"
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                width={120}
                                className="text-xs"
                            />
                            <XAxis
                                type="number"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(v) => formatCompactMXN(v as number)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        formatter={(value, name, item) => {
                                            const margin = item?.payload?.margin_pct as number | undefined
                                            return `${formatMXN(value as number)}${
                                                margin != null ? ` · margen ${formatPct(margin)}` : ""
                                            }`
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />
                            <Bar dataKey="total_profit" fill="var(--color-total_profit)" radius={[0, 6, 6, 0]} />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
