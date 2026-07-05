import axios from 'axios'
import { env } from '@/lib/env'
import { useAuthStore } from '@/features/auth/store/auth.store'

export const apiClient = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    withCredentials: true,
})

// Si la cookie de sesión ya no sirve, limpiamos el estado local.
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout()
        }
        return Promise.reject(error)
    }
)