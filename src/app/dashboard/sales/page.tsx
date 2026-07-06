"use client"

import { SiteHeader } from "@/components/site-header"
import { SalesCards } from "@/features/sales/components/sales-cards"
import { DailySalesChart } from "@/features/sales/components/daily-sales-chart"
import { PaymentMethodsChart } from "@/features/sales/components/payment-methods-chart"
import { TopProductsTable } from "@/features/sales/components/top-products-table"
import { RecentTicketsTable } from "@/features/sales/components/recent-tickets-table"

export default function SalesPage() {
    return (
        <>
            <SiteHeader title="Ventas" />
            <main className="w-full flex flex-1 flex-col gap-4 p-6">
                <SalesCards />
                <DailySalesChart />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <PaymentMethodsChart />
                    <TopProductsTable />
                </div>
                <RecentTicketsTable />
            </main>
        </>
    )
}
