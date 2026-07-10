"use client"

import { useState } from "react"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export function SecuritySettingsCard() {
    const [open, setOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)

    const handleSave = () => {
        setConfirmOpen(false)
        setOpen(false)
        toast.success("Contraseña actualizada exitosamente")
    }

    return (
        <Card className="flex flex-col sm:flex-row items-center justify-between p-6">
            <div className="space-y-1">
                <CardTitle className="text-xl">Seguridad y Contraseña</CardTitle>
                <CardDescription>
                    Modifica tu contraseña de acceso a la plataforma.
                </CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4 sm:mt-0">Cambiar contraseña</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cambiar Contraseña</DialogTitle>
                        <DialogDescription>
                            Ingresa tu contraseña actual y la nueva contraseña que deseas utilizar.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="current_password_sec">Contraseña actual</Label>
                            <Input id="current_password_sec" type="password" placeholder="••••••••" />
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <Label htmlFor="new_password">Nueva contraseña</Label>
                            <Input id="new_password" type="password" placeholder="••••••••" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="confirm_password">Confirmar nueva contraseña</Label>
                            <Input id="confirm_password" type="password" placeholder="••••••••" />
                        </div>
                    </div>
                    <DialogFooter>
                        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                            <AlertDialogTrigger asChild>
                                <Button>Actualizar contraseña</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>¿Confirmar cambio de contraseña?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Si cambias tu contraseña, es posible que se cierre tu sesión en otros dispositivos. ¿Deseas continuar?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleSave}>Sí, confirmar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}
