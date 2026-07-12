import { create } from 'zustand'
import { type InventoryItem } from '../schemas/stock.schema'

interface StockState {
  isRestockModalOpen: boolean
  selectedItem: InventoryItem | null
  restockQuantity: number
  openRestockModal: (item: InventoryItem) => void
  closeRestockModal: () => void
  setRestockQuantity: (quantity: number) => void

  isBulkRestockModalOpen: boolean
  initialBulkItems?: Record<string, number>
  openBulkRestockModal: (initialItems?: Record<string, number>) => void
  closeBulkRestockModal: () => void
}

export const useStockStore = create<StockState>((set) => ({
  isRestockModalOpen: false,
  selectedItem: null,
  restockQuantity: 0,
  openRestockModal: (item) => {
    const suggestedQuantity = Math.max(0, item.rop + item.ss - item.stock)
    set({
      selectedItem: item,
      restockQuantity: suggestedQuantity,
      isRestockModalOpen: true,
    })
  },
  closeRestockModal: () => set({ isRestockModalOpen: false }),
  setRestockQuantity: (quantity) => set({ restockQuantity: quantity }),
  isBulkRestockModalOpen: false,
  initialBulkItems: {},
  openBulkRestockModal: (initialItems) => set({ isBulkRestockModalOpen: true, initialBulkItems: initialItems || {} }),
  closeBulkRestockModal: () => set({ isBulkRestockModalOpen: false, initialBulkItems: {} }),
}))
