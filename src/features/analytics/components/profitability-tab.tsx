"use client"

import { ProfitabilityCards } from "./profitability-cards"
import { ProfitabilityMarginTrend } from "./profitability-margin-trend"
import { ProfitByDepartmentChart } from "./profit-by-department-chart"
import { TopProfitableProductsTable } from "./top-profitable-products-table"

export function ProfitabilityTab() {
    return (
        <div className="flex flex-col gap-4">
            <ProfitabilityCards />
            <ProfitabilityMarginTrend />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <ProfitByDepartmentChart />
                <TopProfitableProductsTable />
            </div>
        </div>
    )
}
