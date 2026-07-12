"use client"

import { useState, useMemo, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { useStockStore } from "@/features/stock/store/stock.store"
import { useInventory, useBulkRestock } from "@/features/stock/api/stock.api"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export function BulkRestockModal() {
  const { isBulkRestockModalOpen, closeBulkRestockModal, initialBulkItems } = useStockStore()
  const { data: inventoryData = [], isLoading } = useInventory()
  const bulkRestockMutation = useBulkRestock()

  // State: Record of product_id -> quantity
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({})

  // Reset when modal opens
  useEffect(() => {
    if (isBulkRestockModalOpen) {
      setSelectedItems(initialBulkItems || {})
    }
  }, [isBulkRestockModalOpen, initialBulkItems])

  const groupedInventory = useMemo(() => {
    const groups: Record<string, typeof inventoryData> = {}
    for (const item of inventoryData) {
      if (!groups[item.supplier]) {
        groups[item.supplier] = []
      }
      groups[item.supplier].push(item)
    }
    return groups
  }, [inventoryData])

  const handleToggleSelection = (productId: string, defaultQuantity: number) => {
    setSelectedItems(prev => {
      const next = { ...prev }
      if (next[productId] !== undefined) {
        delete next[productId]
      } else {
        next[productId] = defaultQuantity > 0 ? defaultQuantity : 1
      }
      return next
    })
  }

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [productId]: quantity
    }))
  }

  const handleSubmit = () => {
    const items = Object.entries(selectedItems).map(([product_id, quantity]) => ({
      product_id,
      quantity
    }))

    if (items.length === 0) {
      toast.error("Selecciona al menos un producto")
      return
    }

    bulkRestockMutation.mutate({ items }, {
      onSuccess: (res) => {
        toast.success("Pedidos enviados", {
          description: res.message
        })
        closeBulkRestockModal()
      },
      onError: () => {
        toast.error("Error al enviar pedidos")
      }
    })
  }

  return (
    <Dialog open={isBulkRestockModalOpen} onOpenChange={(open) => !open && closeBulkRestockModal()}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Nuevo Pedido (Reabastecimiento Múltiple)</DialogTitle>
          <DialogDescription>
            Selecciona los productos que deseas pedir. Se enviará un correo agrupado a cada proveedor correspondiente.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto -mx-6 px-6">
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">Cargando inventario...</div>
          ) : (
            <Accordion type="multiple" className="w-full">
              {Object.entries(groupedInventory).map(([supplier, items]) => {
                const selectedInSupplier = items.filter(i => selectedItems[i.id] !== undefined).length
                return (
                  <AccordionItem value={supplier} key={supplier}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{supplier}</span>
                        {selectedInSupplier > 0 && (
                          <Badge variant="secondary">{selectedInSupplier} seleccionados</Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pt-2">
                        {items.map((item) => {
                          const isSelected = selectedItems[item.id] !== undefined
                          const suggested = Math.max(0, item.rop + item.ss - item.stock)
                          
                          return (
                            <div key={item.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 border border-transparent hover:border-border transition-colors">
                              <div className="flex items-center gap-3">
                                <Checkbox 
                                  checked={isSelected}
                                  onCheckedChange={() => handleToggleSelection(item.id, suggested)}
                                />
                                <div className="flex flex-col">
                                  <span className="font-medium">{item.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    Stock: {item.stock} / ROP: {item.rop} 
                                    {item.status !== "Óptimo" && (
                                      <span className="ml-2 text-destructive">({item.status})</span>
                                    )}
                                  </span>
                                </div>
                              </div>
                              
                              {isSelected && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Cantidad:</span>
                                  <Input 
                                    type="number"
                                    className="w-24 h-8"
                                    value={selectedItems[item.id]}
                                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                    min={1}
                                  />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          )}
        </div>

        <DialogFooter className="pt-4 border-t mt-4">
          <Button variant="outline" onClick={closeBulkRestockModal}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={bulkRestockMutation.isPending || Object.keys(selectedItems).length === 0}>
            {bulkRestockMutation.isPending ? "Enviando..." : `Enviar Pedidos (${Object.keys(selectedItems).length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
