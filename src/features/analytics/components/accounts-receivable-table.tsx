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
import { useAccountsReceivable } from "../api/analytics.api"
import { useAnalyticsFilters } from "../store/analytics-filters.store"
import { formatMXN } from "../lib/format"

export function AccountsReceivableTable() {
    const filters = useAnalyticsFilters()
    const { data, isLoading } = useAccountsReceivable(filters)

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

    const rows = data ?? []

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cuentas por Cobrar</CardTitle>
                <CardDescription>Saldo pendiente por cliente (cargos a crédito - abonos)</CardDescription>
            </CardHeader>
            <CardContent>
                {rows.length === 0 ? (
                    <div className="flex h-32 items-center justify-center text-muted-foreground">
                        No hay saldos por cobrar
                    </div>
                ) : (
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="text-right">Límite</TableHead>
                                    <TableHead className="text-right">Cargos</TableHead>
                                    <TableHead className="text-right">Abonos</TableHead>
                                    <TableHead className="text-right">Saldo</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((r) => {
                                    const overLimit = r.credit_limit > 0 && r.balance > r.credit_limit
                                    return (
                                        <TableRow key={r.customer_uuid}>
                                            <TableCell className="font-medium max-w-[220px] truncate">
                                                {r.customer_name}
                                            </TableCell>
                                            <TableCell className="text-right tabular-nums text-muted-foreground">
                                                {formatMXN(r.credit_limit)}
                                            </TableCell>
                                            <TableCell className="text-right tabular-nums">
                                                {formatMXN(r.charges)}
                                            </TableCell>
                                            <TableCell className="text-right tabular-nums">
                                                {formatMXN(r.payments)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Badge
                                                    variant={overLimit ? "destructive" : "outline"}
                                                    className="tabular-nums"
                                                >
                                                    {formatMXN(r.balance)}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
