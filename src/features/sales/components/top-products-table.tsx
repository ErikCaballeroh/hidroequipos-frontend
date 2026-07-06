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
import { useTopProducts } from "../api/sales.api"

function formatMXN(value: number) {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

function formatNumber(value: number) {
    return new Intl.NumberFormat("es-MX", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    }).format(value)
}

export function TopProductsTable() {
    const { data: topProducts, isLoading } = useTopProducts({ limit: 10 })

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-52 mt-1" />
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Productos Más Vendidos</CardTitle>
                <CardDescription>
                    Top 10 productos por volumen de venta
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!topProducts || topProducts.length === 0 ? (
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
                                    <TableHead className="text-right">Cantidad</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topProducts.map((product, idx) => (
                                    <TableRow key={product.product_code}>
                                        <TableCell>
                                            <Badge
                                                variant={idx < 3 ? "default" : "outline"}
                                                className="tabular-nums"
                                            >
                                                {idx + 1}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground">
                                            {product.product_code}
                                        </TableCell>
                                        <TableCell className="font-medium max-w-[200px] truncate">
                                            {product.product_name}
                                        </TableCell>
                                        <TableCell className="text-right tabular-nums">
                                            {formatNumber(product.quantity_sold)}
                                        </TableCell>
                                        <TableCell className="text-right tabular-nums font-medium">
                                            {formatMXN(product.total_sold)}
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
