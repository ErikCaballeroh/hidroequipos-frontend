import axios from 'axios'
import { env } from '@/lib/env'
import { useAuthStore } from '@/features/auth/store/auth.store'

export const apiClient = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
})

// Se ejecuta antes de cada request: agrega el token si existe
apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Se ejecuta en cada respuesta: si el token expiró (401), cierra sesión
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout()
        }
        return Promise.reject(error)
    }
)