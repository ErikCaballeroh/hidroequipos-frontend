"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"

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
import { usePaymentMethods } from "../api/sales.api"

const chartConfig = {
    total: {
        label: "Total",
        color: "var(--chart-2)",
    },
    ticket_count: {
        label: "Tickets",
        color: "var(--chart-4)",
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

export function PaymentMethodsChart() {
    const { data: paymentMethods, isLoading } = usePaymentMethods()

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

    const chartData = (paymentMethods ?? []).map((pm) => ({
        ...pm,
        // Capitalize first letter for nicer display
        label: pm.payment_method.charAt(0).toUpperCase() + pm.payment_method.slice(1),
    }))

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Métodos de Pago</CardTitle>
                <CardDescription>
                    Distribución de ventas por método de pago
                </CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {chartData.length === 0 ? (
                    <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                        No hay datos de métodos de pago
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[300px] w-full"
                    >
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ left: 10, right: 10 }}
                        >
                            <CartesianGrid horizontal={false} />
                            <YAxis
                                dataKey="label"
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                width={100}
                                className="text-xs"
                            />
                            <XAxis
                                type="number"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    `$${new Intl.NumberFormat("es-MX", { notation: "compact" }).format(value)}`
                                }
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        formatter={(value, name) => {
                                            if (name === "total") return formatMXN(value as number)
                                            return `${value} tickets`
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />
                            <Bar
                                dataKey="total"
                                fill="var(--color-total)"
                                radius={[0, 6, 6, 0]}
                            />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
