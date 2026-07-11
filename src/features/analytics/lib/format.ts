// Helpers de formato compartidos por los componentes de análisis (locale es-MX).

export function formatMXN(value: number, fractionDigits = 0): string {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    }).format(value)
}

export function formatCompactMXN(value: number): string {
    return `$${new Intl.NumberFormat('es-MX', { notation: 'compact' }).format(value)}`
}

export function formatNumber(value: number, fractionDigits = 0): string {
    return new Intl.NumberFormat('es-MX', {
        minimumFractionDigits: 0,
        maximumFractionDigits: fractionDigits,
    }).format(value)
}

// Recibe una razón 0..1 y la muestra como porcentaje.
export function formatPct(ratio: number, fractionDigits = 1): string {
    return `${(ratio * 100).toFixed(fractionDigits)}%`
}

// 'YYYY-MM' -> 'ene 2026'
export function formatMonthPeriod(period: string): string {
    const [year, month] = period.split('-').map(Number)
    if (!year || !month) return period
    const date = new Date(year, month - 1, 1)
    return date.toLocaleDateString('es-MX', { month: 'short', year: 'numeric' })
}

export const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

export const MONTH_LABELS = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]
