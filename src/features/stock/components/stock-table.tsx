"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mail } from "lucide-react"
import { useStockStore } from "@/features/stock/store/stock.store"

export function StockTable() {
  const { inventoryData, openRestockModal } = useStockStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado del Inventario</CardTitle>
        <CardDescription>
          Detalle de productos y niveles de stock
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!inventoryData || inventoryData.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            No hay productos en el inventario
          </div>
        ) : (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Proveedor</TableHead>
                  <TableHead className="text-right">Stock (Q)</TableHead>
                  <TableHead className="text-right">Reorden (ROP)</TableHead>
                  <TableHead className="text-right">Demanda (D)</TableHead>
                  <TableHead className="text-right">Seg. (SS)</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-sm">{item.name}</TableCell>
                    <TableCell className="text-sm">{item.category}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{item.supplier}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">{item.stock}</TableCell>
                    <TableCell className="text-right tabular-nums">{item.rop}</TableCell>
                    <TableCell className="text-right tabular-nums">{item.d}/día</TableCell>
                    <TableCell className="text-right tabular-nums">{item.ss}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.status === 'Óptimo' ? 'outline' : item.status === 'Reordenar' ? 'secondary' : 'destructive'}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => openRestockModal(item)}>
                        <Mail className="size-4 mr-2" />
                        Restock
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
