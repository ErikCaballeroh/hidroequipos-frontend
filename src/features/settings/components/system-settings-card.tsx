"use client"

import { useState } from "react"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export function SystemSettingsCard() {
    const [enabled, setEnabled] = useState(false)

    const handleToggle = () => {
        setEnabled(true)
        toast.success("Pedido de restock automático activado")
    }

    const handleDisable = () => {
        setEnabled(false)
        toast.success("Pedido de restock automático desactivado")
    }

    return (
        <Card className="flex flex-col sm:flex-row items-center justify-between p-6">
            <div className="space-y-2">
                <CardTitle className="text-xl">Pedido de restock automático</CardTitle>
                <CardDescription>
                    Solicita automáticamente nuevos productos cuando el inventario esté bajo.
                </CardDescription>
                <p className="text-sm font-medium">
                    Estado actual: {enabled ? <span className="text-green-600">Activado</span> : <span className="text-muted-foreground">Desactivado</span>}
                </p>
            </div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={enabled ? "destructive" : "default"} className="mt-4 sm:mt-0">
                        {enabled ? "Desactivar restock" : "Activar restock"}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Confirmas esta acción de seguridad?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {enabled
                                ? "Se detendrán los pedidos automáticos de restock. Tendrás que hacer los pedidos manualmente."
                                : "Al activar esta opción, el sistema realizará pedidos automáticamente cuando el stock llegue al nivel mínimo."
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
