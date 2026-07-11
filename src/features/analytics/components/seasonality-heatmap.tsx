"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useSalesHeatmap } from "../api/analytics.api"
import { useAnalyticsFilters } from "../store/analytics-filters.store"
import { formatMXN, WEEKDAY_LABELS } from "../lib/format"

const HOURS = Array.from({ length: 24 }, (_, h) => h)
const WEEKDAYS = Array.from({ length: 7 }, (_, wd) => wd)

export function SeasonalityHeatmap() {
    const filters = useAnalyticsFilters()
    const { data, isLoading } = useSalesHeatmap(filters)

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-60 mt-1" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[220px] w-full" />
                </CardContent>
            </Card>
        )
    }

    const rows = data ?? []

    // grid[weekday][hour] = total
    const grid: number[][] = WEEKDAYS.map(() => new Array(24).fill(0))
    let max = 0
    for (const cell of rows) {
        if (cell.weekday >= 0 && cell.weekday < 7 && cell.hour >= 0 && cell.hour < 24) {
            grid[cell.weekday][cell.hour] = cell.total
            if (cell.total > max) max = cell.total
        }
    }

    const hasData = max > 0

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Mapa de Calor de Ventas</CardTitle>
                <CardDescription>Intensidad de ventas por día de la semana y hora</CardDescription>
            </CardHeader>
            <CardContent>
                {!hasData ? (
                    <div className="flex h-[220px] items-center justify-center text-muted-foreground">
                        No hay datos para el período seleccionado
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="min-w-[680px]">
                            {/* Encabezado de horas */}
                            <div className="grid grid-cols-[3rem_repeat(24,1fr)] gap-0.5 mb-1">
                                <div />
                                {HOURS.map((h) => (
                                    <div key={h} className="text-center text-[10px] text-muted-foreground">
                                        {h % 3 === 0 ? h : ""}
                                    </div>
                                ))}
                            </div>

                            {/* Una fila por día de la semana */}
                            {WEEKDAYS.map((wd) => (
                                <div
                                    key={wd}
                                    className="grid grid-cols-[3rem_repeat(24,1fr)] gap-0.5 mb-0.5"
                                >
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        {WEEKDAY_LABELS[wd]}
                                    </div>
                                    {HOURS.map((h) => {
                                        const total = grid[wd][h]
                                        const pct = max > 0 ? (total / max) * 100 : 0
                                        // 8% mínimo para que las celdas con ventas sean visibles.
                                        const intensity = total > 0 ? Math.max(pct, 8) : 0
                                        return (
                                            <div
                                                key={h}
                                                title={`${WEEKDAY_LABELS[wd]} ${h}:00 — ${formatMXN(total)}`}
                                                className="aspect-square rounded-[3px]"
                                                style={{
                                                    backgroundColor:
                                                        total > 0
                                                            ? `color-mix(in oklab, var(--chart-1) ${intensity}%, transparent)`
                                                            : "var(--muted)",
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                            ))}

                            {/* Leyenda */}
                            <div className="mt-3 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                                <span>Menos</span>
                                {[10, 30, 55, 80, 100].map((p) => (
                                    <div
                                        key={p}
                                        className="size-3 rounded-[3px]"
                                        style={{
                                            backgroundColor: `color-mix(in oklab, var(--chart-1) ${p}%, transparent)`,
                                        }}
                                    />
                                ))}
                                <span>Más</span>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
