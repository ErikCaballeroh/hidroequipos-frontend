'use client'

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

export function LoginForm() {
    const router = useRouter()
    const setAuth = useAuthStore((state) => state.setAuth)
    const { mutate, isPending } = useLogin()

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    })

    function onSubmit(values: LoginInput) {
        mutate(values, {
            onSuccess: (data) => {
                setAuth(data.token, data.user)
                router.push('/dashboard')
            },
            onError: () => {
                toast.error('Credenciales inválidas')
            },
        })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="login-email">Email</FieldLabel>
                            <Input
                                {...field}
                                id="login-email"
                                type="email"
                                placeholder="tucorreo@ejemplo.com"
                                aria-invalid={fieldState.invalid}
                                autoComplete="email"
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
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? 'Ingresando...' : 'Ingresar'}
                </Button>
            </FieldGroup>
        </form>
    )
}