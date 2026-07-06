"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

export function SectionCards() {
  return (
    <div className="w-full grid grid-cols-3 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ventas Totales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $124,850
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600 border-green-200">
              <TrendingUpIcon className="h-3 w-3" />
              +8.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-green-600">
            <TrendingUpIcon className="size-4" />
            +$9,450 vs mes anterior
          </div>
          <div className="text-muted-foreground">
            Promedio diario: $4,162
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tickets Emitidos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,432
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600 border-green-200">
              <TrendingUpIcon className="h-3 w-3" />
              +5.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-green-600">
            <TrendingUpIcon className="size-4" />
            +72 tickets más
          </div>
          <div className="text-muted-foreground">
            Ticket promedio: $87.20
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Stock Crítico</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            18
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-red-600 border-red-200">
              <TrendingDownIcon className="h-3 w-3" />
              +3
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-red-600">
            <TrendingDownIcon className="size-4" />
            3 productos más que ayer
          </div>
          <div className="text-muted-foreground">
            Requieren reabastecimiento urgente
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}