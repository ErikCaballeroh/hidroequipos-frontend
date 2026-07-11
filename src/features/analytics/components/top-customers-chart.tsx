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
import { useTopCustomers } from "../api/analytics.api"
import { useAnalyticsFilters } from "../store/analytics-filters.store"
import { formatCompactMXN, formatMXN } from "../lib/format"

const chartConfig = {
    total: { label: "Compras", color: "var(--chart-1)" },
} satisfies ChartConfig

export function TopCustomersChart() {
    const filters = useAnalyticsFilters()
    const { data, isLoading } = useTopCustomers({ ...filters, limit: 10 })

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-52 mt-1" />
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
                <CardTitle>Top Clientes</CardTitle>
                <CardDescription>Clientes con mayor importe de compra</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {chartData.length === 0 ? (
                    <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                        No hay datos de clientes
                    </div>
                ) : (
                    <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
                            <CartesianGrid horizontal={false} />
                            <YAxis
                                dataKey="customer_name"
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                width={130}
                                className="text-xs"
                                tickFormatter={(v: string) => (v.length > 18 ? v.slice(0, 18) + "…" : v)}
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
                                            const count = item?.payload?.ticket_count as number | undefined
                                            return `${formatMXN(value as number)}${
                                                count != null ? ` · ${count} tickets` : ""
                                            }`
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />
                            <Bar dataKey="total" fill="var(--color-total)" radius={[0, 6, 6, 0]} />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
