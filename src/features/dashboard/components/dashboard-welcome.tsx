"use client"

import { useAuthStore } from "@/features/auth/store/auth.store"

export function DashboardWelcome() {
    const userName = useAuthStore((state) => state.user?.name) ?? "Usuario"

    return (
        <h2 className="text-4xl font-light">Bienvenido {userName}</h2>
    )
}
