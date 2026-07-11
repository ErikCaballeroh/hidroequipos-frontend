"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useTopProfitableProducts } from "../api/analytics.api"
import { useAnalyticsFilters } from "../store/analytics-filters.store"
import { formatMXN, formatPct } from "../lib/format"

export function TopProfitableProductsTable() {
    const filters = useAnalyticsFilters()
    const { data, isLoading } = useTopProfitableProducts({ ...filters, limit: 10 })

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-44" />
                    <Skeleton className="h-4 w-56 mt-1" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        )
    }

    const products = data ?? []

    return (
        <Card>
            <CardHeader>
                <CardTitle>Productos Más Rentables</CardTitle>
                <CardDescription>Top 10 por ganancia generada (no por volumen)</CardDescription>
            </CardHeader>
            <CardContent>
                {products.length === 0 ? (
                    <div className="flex h-32 items-center justify-center text-muted-foreground">
                        No hay datos de productos
                    </div>
                ) : (
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">#</TableHead>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Producto</TableHead>
                                    <TableHead className="text-right">Ganancia</TableHead>
                                    <TableHead className="text-right">Vendido</TableHead>
                                    <TableHead className="text-right">Margen</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((p, idx) => (
                                    <TableRow key={p.product_code}>
                                        <TableCell>
                                            <Badge variant={idx < 3 ? "default" : "outline"} className="tabular-nums">
                                                {idx + 1}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground">
                                            {p.product_code}
                                        </TableCell>
                                        <TableCell className="font-medium max-w-[200px] truncate">
                                            {p.product_name}
                                        </TableCell>
                                        <TableCell className="text-right tabular-nums font-medium">
                                            {formatMXN(p.total_profit)}
                                        </TableCell>
                                        <TableCell className="text-right tabular-nums text-muted-foreground">
                                            {formatMXN(p.total_sold)}
                                        </TableCell>
                                        <TableCell className="text-right tabular-nums">
                                            {formatPct(p.margin_pct)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
