"use client"

import { useState, useEffect } from "react"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useUpdateMeMutation } from "@/features/settings/api/update-me"
import { Loader2 } from "lucide-react"

export function SecuritySettingsCard() {
    const [open, setOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)

    const updateMeMutation = useUpdateMeMutation()

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        if (open) {
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }
    }, [open])

    const handleSave = () => {
        if (!currentPassword) {
            toast.error("Debes ingresar tu contraseña actual")
            setConfirmOpen(false)
            return
        }
        
        if (!newPassword) {
            toast.error("Debes ingresar una nueva contraseña")
            setConfirmOpen(false)
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error("Las contraseñas nuevas no coinciden")
            setConfirmOpen(false)
            return
        }
        
        if (newPassword.length < 8) {
            toast.error("La nueva contraseña debe tener al menos 8 caracteres")
            setConfirmOpen(false)
            return
        }

        updateMeMutation.mutate(
            { 
                current_password: currentPassword,
                new_password: newPassword
            },
            {
                onSuccess: () => {
                    setConfirmOpen(false)
                    setOpen(false)
                    toast.success("Contraseña actualizada exitosamente")
                },
                onError: (error: any) => {
                    setConfirmOpen(false)
                    const detail = error.response?.data?.detail
                    const errorMessage = Array.isArray(detail) ? detail[0].msg : (typeof detail === 'string' ? detail : "Error al actualizar la contraseña")
                    toast.error(errorMessage)
                }
            }
        )
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
                            <Input id="current_password_sec" type="password" placeholder="••••••••" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <Label htmlFor="new_password">Nueva contraseña</Label>
                            <Input id="new_password" type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="confirm_password">Confirmar nueva contraseña</Label>
                            <Input id="confirm_password" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                            <AlertDialogTrigger asChild>
                                <Button disabled={updateMeMutation.isPending || !currentPassword || !newPassword || !confirmPassword}>
                                    {updateMeMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    Actualizar contraseña
                                </Button>
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
