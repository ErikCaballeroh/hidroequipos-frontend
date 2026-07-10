"use client"

import { useState } from "react"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export function AccountSettingsCard() {
    const [open, setOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)

    const handleSave = () => {
        setConfirmOpen(false)
        setOpen(false)
        toast.success("Información de perfil actualizada")
    }

    return (
        <Card className="flex flex-col sm:flex-row items-center justify-between p-6">
            <div className="space-y-1">
                <CardTitle className="text-xl">Información del Perfil</CardTitle>
                <CardDescription>
                    Actualiza tu nombre y nombre de usuario.
                </CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4 sm:mt-0">Editar perfil</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Editar Perfil</DialogTitle>
                        <DialogDescription>
                            Modifica tus datos personales. Se requiere tu contraseña actual para confirmar los cambios.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" defaultValue="Administrador" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="username">Usuario</Label>
                            <Input id="username" defaultValue="admin" />
                        </div>
                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                            <Label htmlFor="current_password_profile">Contraseña actual (para autorizar)</Label>
                            <Input id="current_password_profile" type="password" placeholder="••••••••" />
                        </div>
                    </div>
                    <DialogFooter>
                        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                            <AlertDialogTrigger asChild>
                                <Button>Guardar cambios</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>¿Estás seguro de guardar los cambios?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta acción modificará tu información de perfil. ¿Deseas continuar?
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
