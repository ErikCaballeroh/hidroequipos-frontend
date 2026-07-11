"use client"

import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsRangeSelector } from "@/features/analytics/components/analytics-range-selector"

export default function AnalyticsPage() {
    return (
        <>
            <SiteHeader title="Análisis" />
            <main className="w-full flex flex-1 flex-col gap-4 p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">Panel de Análisis</h2>
                        <p className="text-sm text-muted-foreground">
                            Rentabilidad, clientes y patrones temporales del negocio
                        </p>
                    </div>
                    <AnalyticsRangeSelector />
                </div>

                <Tabs defaultValue="profitability" className="w-full">
                    <TabsList>
                        <TabsTrigger value="profitability">Rentabilidad</TabsTrigger>
                        <TabsTrigger value="customers">Clientes y Crédito</TabsTrigger>
                        <TabsTrigger value="seasonality">Estacionalidad</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profitability" className="mt-4">
                        <p className="text-sm text-muted-foreground">
                            Próximamente: márgenes, descuentos y productos más rentables.
                        </p>
                    </TabsContent>

                    <TabsContent value="customers" className="mt-4">
                        <p className="text-sm text-muted-foreground">
                            Próximamente: top clientes, crédito y cuentas por cobrar.
                        </p>
                    </TabsContent>

                    <TabsContent value="seasonality" className="mt-4">
                        <p className="text-sm text-muted-foreground">
                            Próximamente: mapa de calor, ventas por mes y por día de la semana.
                        </p>
                    </TabsContent>
                </Tabs>
            </main>
        </>
    )
}
