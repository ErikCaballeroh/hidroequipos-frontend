"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    useAnalyticsFiltersStore,
    type RangePreset,
} from "../store/analytics-filters.store"

const OPTIONS: { value: RangePreset; label: string }[] = [
    { value: "30d", label: "30 días" },
    { value: "90d", label: "90 días" },
    { value: "12m", label: "12 meses" },
]

// Selector de rango global compartido por las 3 pestañas del análisis.
export function AnalyticsRangeSelector() {
    const range = useAnalyticsFiltersStore((s) => s.range)
    const setRange = useAnalyticsFiltersStore((s) => s.setRange)

    return (
        <>
            <ToggleGroup
                type="single"
                value={range}
                onValueChange={(v) => v && setRange(v as RangePreset)}
                variant="outline"
                className="hidden sm:flex"
            >
                {OPTIONS.map((o) => (
                    <ToggleGroupItem key={o.value} value={o.value} className="px-4">
                        {o.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>

            <Select value={range} onValueChange={(v) => setRange(v as RangePreset)}>
                <SelectTrigger className="w-36 sm:hidden" size="sm" aria-label="Seleccionar rango">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                    {OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value} className="rounded-lg">
                            {o.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}
