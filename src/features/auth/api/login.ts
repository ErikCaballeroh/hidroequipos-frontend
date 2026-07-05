import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import {
    loginResponseSchema,
    type LoginInput,
    type LoginResponse,
} from '../schemas/login.schema'

async function login(input: LoginInput): Promise<LoginResponse> {
    // Endpoint according to your OpenAPI: /api/v1/users/login
    const { data } = await apiClient.post('/api/v1/users/login', input)
    console.log(data)
    return loginResponseSchema.parse(data)
}

export function useLogin() {
    return useMutation({
        mutationFn: login,
    })
}