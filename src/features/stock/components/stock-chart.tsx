"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useStockStore } from "@/features/stock/store/stock.store"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  Stock: {
    label: "Stock Actual",
    color: "var(--chart-1)",
  },
  rop: {
    label: "Punto de Reorden (ROP)",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function StockChart() {
  const { inventoryData } = useStockStore()

  const chartData = inventoryData.map(item => ({
    name: item.name,
    Stock: item.stock,
    rop: item.rop,
  }))

  const minHeight = Math.max(350, chartData.length * 60)

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Niveles de Inventario vs ROP</CardTitle>
        <CardDescription>
          Comparativa del stock actual contra el punto de reorden calculado
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        {/* ScrollArea container for vertical chart */}
        <div className="h-[350px] overflow-y-auto pr-4">
          <div style={{ height: minHeight }} className="w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={150} tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value} />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'var(--muted)' }} />
                <Legend />
                <Bar dataKey="Stock" fill="var(--color-Stock)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="rop" fill="var(--color-rop)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
