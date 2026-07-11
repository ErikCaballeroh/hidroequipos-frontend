"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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

import { useInventoryStatusHistory } from "../api/dashboard.api"

const chartConfig = {
  optimal_stock: {
    label: "Stock Saludable",
    color: "var(--chart-1)",
  },
  reorder_point: {
    label: "Punto de Reorden (ROP)",
    color: "var(--chart-4)", 
  },
  critical_stock: {
    label: "Stock Crítico",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function DashboardChart() {
  const [timeRange, setTimeRange] = React.useState("30d")
  const { data: serverData, isLoading } = useInventoryStatusHistory()

  const filteredData = React.useMemo(() => {
    if (!serverData) return []

    const sorted = [...serverData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    const referenceDate = new Date("2026-06-30")
    let daysToSubtract = 30
    if (timeRange === "7d") daysToSubtract = 7
    if (timeRange === "90d") daysToSubtract = 90

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return sorted.filter((item) => new Date(item.date) >= startDate)
  }, [serverData, timeRange])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-52 mt-1" />
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
        <CardTitle>Composición y Salud del Inventario</CardTitle>
        <CardDescription>
          Distribución diaria de productos según su nivel de riesgo y disponibilidad
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
            <SelectTrigger className="flex w-40 @[767px]/card:hidden" size="sm">
              <SelectValue placeholder="30 días" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d">90 días</SelectItem>
              <SelectItem value="30d">30 días</SelectItem>
              <SelectItem value="7d">7 días</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <BarChart data={filteredData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            {}
            <CartesianGrid vertical={false} className="stroke-muted/60" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("es-MX", { month: "short", day: "numeric" })
              }}
              className="text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={50}
              tickFormatter={(value) => `${value} u`}
              className="text-xs"
            />
            <ChartTooltip
              cursor={{ fill: "var(--primary)", opacity: 0.05 }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("es-MX", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            {}
            <Bar
              dataKey="optimal_stock"
              stackId="inventory"
              fill="var(--color-optimal_stock)"
              opacity={0.85} 
            />
            <Bar
              dataKey="reorder_point"
              stackId="inventory"
              fill="var(--color-reorder_point)"
              opacity={0.85}
            />
            <Bar
              dataKey="critical_stock"
              stackId="inventory"
              fill="var(--color-critical_stock)"
              radius={[4, 4, 0, 0]} 
              opacity={0.9}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}