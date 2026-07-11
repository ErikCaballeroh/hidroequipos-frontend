"use client"

import type { ReactNode } from "react"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export interface KpiCard {
    title: string
    value: string
    icon: ReactNode
    footer?: string
    subFooter?: string
}

function CardSkeleton() {
    return (
        <Card className="@container/card">
            <CardHeader>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32 mt-2" />
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-28" />
            </CardFooter>
        </Card>
    )
}

// Fila de KPIs reutilizable por las pestañas de análisis (mismo look que SalesCards).
export function AnalyticsKpiCards({
    cards,
    isLoading,
    count = 4,
}: {
    cards: KpiCard[]
    isLoading?: boolean
    count?: number
}) {
    if (isLoading) {
        return (
            <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: count }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        )
    }

    return (
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
            {cards.map((card) => (
                <Card key={card.title} className="@container/card">
                    <CardHeader>
                        <CardDescription>{card.title}</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {card.value}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline" className="text-primary border-primary/20">
                                {card.icon}
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        {card.footer && (
                            <div className="line-clamp-1 flex gap-2 font-medium">{card.footer}</div>
                        )}
                        {card.subFooter && (
                            <div className="text-muted-foreground">{card.subFooter}</div>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
