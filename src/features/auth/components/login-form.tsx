'use client'

import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { loginSchema, type LoginInput } from '../schemas/login.schema'
import { useLogin } from '../api/login'
import { useAuthStore } from '../store/auth.store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { LogIn } from 'lucide-react'

export function LoginForm() {
    const router = useRouter()
    const setAuth = useAuthStore((state) => state.setAuth)
    const { mutate, isPending } = useLogin()

    const form = useForm<LoginInput>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(loginSchema as any),
        defaultValues: { username: '', password: '' },
    })

    function onSubmit(values: LoginInput) {
        mutate(values, {
            onSuccess: (data) => {
                const apiUser = data.user ?? {}
                const user = {
                    id: apiUser.uuid ?? apiUser.id ?? '',
                    name: apiUser.nombre ?? apiUser.name ?? apiUser.username ?? '',
                    email: apiUser.email ?? '',
                }
                setAuth(user)
                router.push('/dashboard')
            },
            onError: (error) => {
                if (axios.isAxiosError(error)) {
                    const detail = error.response?.data?.detail

                    if (error.response?.status === 401) {
                        toast.error(detail ?? 'Usuario o contraseña inválidos')
                        return
                    }

                    toast.error(detail ?? 'No se pudo iniciar sesión')
                    return
                }

                toast.error(error instanceof Error ? error.message : 'No se pudo iniciar sesión')
            },
        })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border p-7 rounded-2xl">
            <FieldGroup>
                <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="login-username">Usuario</FieldLabel>
                            <Input
                                {...field}
                                id="login-username"
                                type="text"
                                placeholder="tuusuario"
                                aria-invalid={fieldState.invalid}
                                autoComplete="username"
                                className='text-lg h-10'
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="login-password">Contraseña</FieldLabel>
                            <Input
                                {...field}
                                id="login-password"
                                type="password"
                                placeholder="••••••••"
                                aria-invalid={fieldState.invalid}
                                autoComplete="current-password"
                                className='text-lg h-10'
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isPending} size="lg">
                    {isPending ? 'Ingresando...' : 'Iniciar sesion'} <LogIn data-icon="inline-end" />
                </Button>
            </FieldGroup>
        </form>
    )
}