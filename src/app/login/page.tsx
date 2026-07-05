'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/features/auth/components/login-form'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { useCurrentUserQuery } from '@/features/auth/api/session'
import Image from 'next/image'

function mapUser(user: {
    uuid?: string
    id?: string
    nombre?: string
    name?: string
    username?: string
    email?: string
}) {
    return {
        id: user.uuid ?? user.id ?? '',
        name: user.nombre ?? user.name ?? user.username ?? '',
        email: user.email ?? '',
    }
}

export default function LoginPage() {
    const router = useRouter()
    const setAuth = useAuthStore((state) => state.setAuth)
    const { data, isLoading } = useCurrentUserQuery()

    useEffect(() => {
        if (data) {
            setAuth(mapUser(data))
            router.replace('/dashboard')
        }
    }, [data, router, setAuth])

    return (
        <main className="flex min-h-screen items-center justify-center p-8">
            <div className="w-full max-w-lg p-6 space-y-6">
                <div className='flex flex-col items-center'>
                    <Image src="/logo.png" alt="" width={350} height={350} />
                    <h1 className="text-lg text-center text-neutral-600">Acceso de administrador</h1>
                </div>

                {isLoading ? <p className="text-center text-sm text-neutral-500">Verificando sesión...</p> : <LoginForm />}
            </div>
        </main>
    )
} 