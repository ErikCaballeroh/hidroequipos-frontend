'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { useCurrentUserQuery } from '@/features/auth/api/session'

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

export default function DashboardPage() {
    const router = useRouter()
    const setAuth = useAuthStore((state) => state.setAuth)
    const logout = useAuthStore((state) => state.logout)
    const { data, isLoading, isError } = useCurrentUserQuery()

    useEffect(() => {
        if (data) {
            setAuth(mapUser(data))
            return
        }

        if (!isLoading && isError) {
            logout()
            router.replace('/login')
        }
    }, [data, isLoading, isError, logout, router, setAuth])

    if (isLoading || !data) return null

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Bienvenido, aquí irá el contenido.</p>
        </main>
    )
}