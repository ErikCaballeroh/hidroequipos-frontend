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
import { useRecentTickets } from "../api/sales.api"

function formatMXN(value: number) {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

function getPaymentBadgeVariant(method: string): "default" | "secondary" | "outline" {
    const lower = method.toLowerCase()
    if (lower.includes("efectivo") || lower.includes("cash")) return "default"
    if (lower.includes("tarjeta") || lower.includes("card") || lower.includes("credito") || lower.includes("debito")) return "secondary"
    return "outline"
}

export function RecentTicketsTable() {
    const { data: recentTickets, isLoading } = useRecentTickets({ limit: 15 })

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-44 mt-1" />
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
                <CardTitle>Tickets Recientes</CardTitle>
                <CardDescription>
                    Últimos 15 tickets registrados
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!recentTickets || recentTickets.length === 0 ? (
                    <div className="flex h-32 items-center justify-center text-muted-foreground">
                        No hay tickets recientes
                    </div>
                ) : (
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Folio</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                    <TableHead>Método de Pago</TableHead>
                                    <TableHead>Fecha</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentTickets.map((ticket, idx) => (
                                    <TableRow key={`${ticket.folio ?? idx}-${ticket.sold_at}`}>
                                        <TableCell className="font-mono text-sm">
                                            {ticket.folio ?? "—"}
                                        </TableCell>
                                        <TableCell className="text-right tabular-nums font-medium">
                                            {formatMXN(ticket.total)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getPaymentBadgeVariant(ticket.payment_method)}>
                                                {ticket.payment_method}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {formatDate(ticket.sold_at)}
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
