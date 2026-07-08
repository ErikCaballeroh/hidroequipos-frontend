import { create } from 'zustand'

export interface InventoryItem {
  id: string
  name: string
  category: string
  stock: number
  rop: number
  d: number
  l: number
  ss: number
  f: number
  status: string
  supplier: string
}

const mockInventoryData: InventoryItem[] = [
  { id: "P001", name: "Cloro Líquido 20L", category: "Químicos", stock: 15, rop: 25, d: 2, l: 3, ss: 5, f: 1.5, status: "Reordenar", supplier: "Quimicos Industriales del Norte" },
  { id: "P002", name: "Bomba 1.5 HP", category: "Equipos", stock: 12, rop: 5, d: 0.5, l: 5, ss: 2, f: 1.2, status: "Óptimo", supplier: "AquaTec de México" },
  { id: "P003", name: "Filtro de Arena 24\"", category: "Equipos", stock: 8, rop: 8, d: 0.8, l: 7, ss: 3, f: 1.2, status: "Reordenar", supplier: "AquaTec de México" },
  { id: "P004", name: "Tricloro en Pastillas 1kg", category: "Químicos", stock: 45, rop: 30, d: 5, l: 2, ss: 10, f: 1.5, status: "Óptimo", supplier: "PoolChemicals S.A." },
  { id: "P005", name: "Red Saca Hojas", category: "Accesorios", stock: 3, rop: 10, d: 1, l: 3, ss: 3, f: 1.2, status: "Crítico", supplier: "Accesorios para Albercas Monterrey" },
  { id: "P006", name: "Manguera 15m", category: "Accesorios", stock: 18, rop: 15, d: 2, l: 4, ss: 5, f: 1.0, status: "Óptimo", supplier: "Plasticos Especializados" },
  { id: "P007", name: "Alguicida 1L", category: "Químicos", stock: 5, rop: 15, d: 3, l: 2, ss: 4, f: 1.5, status: "Crítico", supplier: "Quimicos Industriales del Norte" },
]

interface StockState {
  inventoryData: InventoryItem[]
  isRestockModalOpen: boolean
  selectedItem: InventoryItem | null
  restockQuantity: number
  openRestockModal: (item: InventoryItem) => void
  closeRestockModal: () => void
  setRestockQuantity: (quantity: number) => void
}

export const useStockStore = create<StockState>((set) => ({
  inventoryData: mockInventoryData,
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
}))
