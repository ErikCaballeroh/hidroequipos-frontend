"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardAction,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Skeleton } from "@/components/ui/skeleton"
import { useDailySales } from "../api/sales.api"

const chartConfig = {
    total_sales: {
        label: "Ventas",
        color: "var(--chart-1)",
    },
    total_profit: {
        label: "Ganancia",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

function formatMXN(value: number) {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

export function DailySalesChart() {
    const [timeRange, setTimeRange] = React.useState("30d")
    const { data: dailySales, isLoading } = useDailySales()

    const filteredData = React.useMemo(() => {
        if (!dailySales || dailySales.length === 0) return []

        const sorted = [...dailySales].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        let daysToShow = 30
        if (timeRange === "7d") daysToShow = 7
        else if (timeRange === "90d") daysToShow = 90

        return sorted.slice(-daysToShow)
    }, [dailySales, timeRange])

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-48 mt-1" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[350px] w-full" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Ventas Diarias</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Ventas y ganancias del período seleccionado
                    </span>
                    <span className="@[540px]/card:hidden">Ventas y ganancias</span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={(v) => v && setTimeRange(v)}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="90d">90 días</ToggleGroupItem>
                        <ToggleGroupItem value="30d">30 días</ToggleGroupItem>
                        <ToggleGroupItem value="7d">7 días</ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Seleccionar rango"
                        >
                            <SelectValue placeholder="30 días" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                90 días
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                30 días
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                7 días
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {filteredData.length === 0 ? (
                    <div className="flex h-[350px] items-center justify-center text-muted-foreground">
                        No hay datos para el período seleccionado
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[350px] w-full"
                    >
                        <AreaChart data={filteredData}>
                            <defs>
                                <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-total_sales)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-total_sales)"
                                        stopOpacity={0.05}
                                    />
                                </linearGradient>
                                <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-total_profit)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-total_profit)"
                                        stopOpacity={0.05}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("es-MX", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                width={70}
                                tickFormatter={(value) =>
                                    `$${new Intl.NumberFormat("es-MX", { notation: "compact" }).format(value)}`
                                }
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) =>
                                            new Date(value).toLocaleDateString("es-MX", {
                                                weekday: "short",
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }
                                        formatter={(value) => formatMXN(value as number)}
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="total_profit"
                                type="natural"
                                fill="url(#fillProfit)"
                                stroke="var(--color-total_profit)"
                                stackId="a"
                            />
                            <Area
                                dataKey="total_sales"
                                type="natural"
                                fill="url(#fillSales)"
                                stroke="var(--color-total_sales)"
                                stackId="b"
                            />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
