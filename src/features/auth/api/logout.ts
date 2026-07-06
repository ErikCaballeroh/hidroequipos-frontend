import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api/client'
import { useAuthStore } from '../store/auth.store'

async function logoutFromServer(): Promise<void> {
    await apiClient.post('/api/v1/users/logout')
}

export function useLogout() {
    const router = useRouter()
    const logout = useAuthStore((state) => state.logout)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: logoutFromServer,
        onSettled: () => {
            // Always clear local state, even if the API call failed
            logout()
            queryClient.clear()
            router.replace('/login')
        },
    })
}
