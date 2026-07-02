'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/features/auth/store/auth.store'

export default function DashboardPage() {
    const router = useRouter()
    const token = useAuthStore((state) => state.token)

    useEffect(() => {
        if (!token) {
            router.replace('/login')
        }
    }, [token, router])

    if (!token) return null

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Bienvenido, aquí irá el contenido.</p>
        </main>
    )
}