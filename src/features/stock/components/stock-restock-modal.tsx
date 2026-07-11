"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useStockStore } from "@/features/stock/store/stock.store"
import { useRestock } from "@/features/stock/api/stock.api"

export function StockRestockModal() {
  const { 
    isRestockModalOpen, 
    selectedItem, 
    restockQuantity, 
    closeRestockModal, 
    setRestockQuantity 
  } = useStockStore()

  const restockMutation = useRestock()

  const handleConfirmRestock = () => {
    if (selectedItem) {
      restockMutation.mutate({
        product_id: selectedItem.id,
        quantity: restockQuantity,
      }, {
        onSuccess: () => {
          toast.success(`Solicitud enviada a ${selectedItem.supplier}`, {
            description: <span className="text-foreground font-medium">Se han solicitado {restockQuantity} unidades de {selectedItem.name}.</span>,
          })
          closeRestockModal()
        },
        onError: () => {
          toast.error("Error al enviar la solicitud")
        }
      })
    }
  }

  return (
    <Dialog open={isRestockModalOpen} onOpenChange={(open) => !open && closeRestockModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solicitar Reabastecimiento</DialogTitle>
          <DialogDescription>
            Solicitar nuevo stock a {selectedItem?.supplier}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="col-span-4 text-sm text-muted-foreground">
              Cantidad sugerida: <span className="font-medium text-foreground">{selectedItem ? Math.max(0, selectedItem.rop + selectedItem.ss - selectedItem.stock) : 0}</span> unidades
            </Label>
            <Label htmlFor="quantity" className="text-right">
              Cantidad
            </Label>
            <Input 
              id="quantity" 
              type="number" 
              value={restockQuantity} 
              onChange={(e) => setRestockQuantity(Number(e.target.value))} 
              className="col-span-3" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleConfirmRestock} disabled={restockMutation.isPending}>
            {restockMutation.isPending ? "Enviando..." : "Enviar Solicitud"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
