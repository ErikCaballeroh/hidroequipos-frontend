"use client"

import { useState, useEffect } from "react"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useCurrentUserQuery } from "@/features/auth/api/session"
import { useUpdateMeMutation } from "@/features/settings/api/update-me"
import { Loader2 } from "lucide-react"

export function AccountSettingsCard() {
    const [open, setOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)

    const { data: user, isLoading: isUserLoading } = useCurrentUserQuery()
    const updateMeMutation = useUpdateMeMutation()

    const [nombre, setNombre] = useState("")
    const [username, setUsername] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")

    useEffect(() => {
        if (user && open) {
            setNombre(user.nombre || "")
            setUsername(user.username || "")
            setCurrentPassword("")
        }
    }, [user, open])

    const handleSave = () => {
        if (!currentPassword) {
            toast.error("Debes ingresar tu contraseña actual para confirmar los cambios")
            setConfirmOpen(false)
            return
        }

        updateMeMutation.mutate(
            {
                nombre: nombre !== user?.nombre ? nombre : undefined,
                username: username !== user?.username ? username : undefined,
                current_password: currentPassword
            },
            {
                onSuccess: () => {
                    setConfirmOpen(false)
                    setOpen(false)
                    toast.success("Información de perfil actualizada")
                },
                onError: (error: any) => {
                    setConfirmOpen(false)
                    const detail = error.response?.data?.detail
                    const errorMessage = Array.isArray(detail) ? detail[0].msg : (typeof detail === 'string' ? detail : "Error al actualizar la información")
                    toast.error(errorMessage)
                }
            }
        )
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
                    <Button variant="outline" className="mt-4 sm:mt-0" disabled={isUserLoading}>
                        {isUserLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Editar perfil
                    </Button>
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
                            <Input id="name" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="username">Usuario</Label>
                            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                            <Label htmlFor="current_password_profile">Contraseña actual (para autorizar)</Label>
                            <Input id="current_password_profile" type="password" placeholder="••••••••" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                            <AlertDialogTrigger asChild>
                                <Button disabled={!currentPassword || updateMeMutation.isPending}>
                                    {updateMeMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    Guardar cambios
                                </Button>
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
