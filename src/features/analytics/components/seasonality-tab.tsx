"use client"

import { SeasonalityCards } from "./seasonality-cards"
import { SeasonalityHeatmap } from "./seasonality-heatmap"
import { SalesByMonthChart } from "./sales-by-month-chart"
import { SalesByWeekdayChart } from "./sales-by-weekday-chart"

export function SeasonalityTab() {
    return (
        <div className="flex flex-col gap-4">
            <SeasonalityCards />
            <SeasonalityHeatmap />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <SalesByMonthChart />
                <SalesByWeekdayChart />
            </div>
        </div>
    )
}
