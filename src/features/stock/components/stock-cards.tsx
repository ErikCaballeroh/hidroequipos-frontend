"use client"

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowDownToLine, Package, ShoppingCart } from "lucide-react"
import { useInventory } from "@/features/stock/api/stock.api"

export function StockCards() {
  const { data: inventoryData = [] } = useInventory()

  const totalProducts = inventoryData.length
  const itemsToReorder = inventoryData.filter(item => item.stock <= item.rop && item.stock > item.rop * 0.5).length
  const criticalItems = inventoryData.filter(item => item.stock <= item.rop * 0.5).length
  const totalStock = inventoryData.reduce((acc, item) => acc + item.stock, 0)

  const cards = [
    {
      title: "Total de Productos",
      value: totalProducts,
      icon: <Package className="size-4" />,
      footer: "Productos en catálogo",
      subFooter: "Inventario activo",
    },
    {
      title: "Stock Total",
      value: totalStock,
      icon: <ArrowDownToLine className="size-4" />,
      footer: "Unidades en almacén",
      subFooter: "Total de piezas físicas",
    },
    {
      title: "Para Reordenar",
      value: itemsToReorder,
      icon: <ShoppingCart className="size-4" />,
      footer: "Por debajo del ROP",
      subFooter: "Requieren pedido pronto",
    },
    {
      title: "Stock Crítico",
      value: criticalItems,
      icon: <AlertCircle className="size-4" />,
      footer: "Atención inmediata",
      subFooter: "Stock menor al 50% del ROP",
    },
  ]

  return (
    <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      {cards.map((card) => (
        <Card key={card.title} className="@container/card">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="text-primary border-primary/20">
                {card.icon}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footer}
            </div>
            <div className="text-muted-foreground">
              {card.subFooter}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
