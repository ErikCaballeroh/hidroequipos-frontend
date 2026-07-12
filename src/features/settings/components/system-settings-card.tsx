"use client"

import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useRestockConfig, useUpdateRestockConfig } from "@/features/stock/api/stock.api"
import { Loader2 } from "lucide-react"

export function SystemSettingsCard() {
    const { data: config, isLoading } = useRestockConfig()
    const updateConfig = useUpdateRestockConfig()

    const enabled = config?.auto_restock_activo ?? false

    const handleToggle = () => {
        updateConfig.mutate({ auto_restock_activo: true }, {
            onSuccess: () => toast.success("Pedido de restock automático activado"),
            onError: () => toast.error("Error al activar restock automático")
        })
    }

    const handleDisable = () => {
        updateConfig.mutate({ auto_restock_activo: false }, {
            onSuccess: () => toast.success("Pedido de restock automático desactivado"),
            onError: () => toast.error("Error al desactivar restock automático")
        })
    }

    return (
        <Card className="flex flex-col sm:flex-row items-center justify-between p-6">
            <div className="space-y-2">
                <CardTitle className="text-xl">Pedido de restock automático</CardTitle>
                <CardDescription>
                    Solicita automáticamente nuevos productos cuando el inventario esté bajo.
                </CardDescription>
                {isLoading ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" /> Cargando estado...
                    </div>
                ) : (
                    <p className="text-sm font-medium">
                        Estado actual: {enabled ? <span className="text-green-600">Activado</span> : <span className="text-muted-foreground">Desactivado</span>}
                    </p>
                )}
            </div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button 
                        variant={enabled ? "destructive" : "default"} 
                        className="mt-4 sm:mt-0"
                        disabled={isLoading || updateConfig.isPending}
                    >
                        {updateConfig.isPending ? (
                             <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...</>
                        ) : enabled ? "Desactivar restock" : "Activar restock"}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Confirmas esta acción?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {enabled
                                ? "Se detendrán los pedidos automáticos de restock. Tendrás que hacer los pedidos manualmente."
                                : "Al activar esta opción, el sistema realizará pedidos automáticamente cuando el stock llegue al nivel mínimo de cada producto configurado."
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={enabled ? handleDisable : handleToggle}>
                            {enabled ? "Sí, desactivar" : "Sí, activar automáticamente"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    )
}

