"use client"

import { SiteHeader } from "@/components/site-header"
import { StockCards } from "@/features/stock/components/stock-cards"
import { StockChart } from "@/features/stock/components/stock-chart"
import { StockTable } from "@/features/stock/components/stock-table"
import { StockRestockModal } from "@/features/stock/components/stock-restock-modal"

export default function StockPage() {
  return (
    <>
      <SiteHeader title="Gestión de Inventario" />
      <main className="w-full flex flex-1 flex-col gap-4 p-6">
        <StockCards />
        
        {/* Full width chart (or add more charts next to it in a grid in the future) */}
        <div className="w-full">
          <StockChart />
        </div>
        
        <StockTable />
      </main>

      <StockRestockModal />
    </>
  )
}