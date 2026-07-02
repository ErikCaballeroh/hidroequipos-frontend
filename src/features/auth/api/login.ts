import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import {
    loginResponseSchema,
    type LoginInput,
    type LoginResponse,
} from '../schemas/login.schema'

async function login(input: LoginInput): Promise<LoginResponse> {
    const { data } = await apiClient.post('/auth/login', input)
    return loginResponseSchema.parse(data)
}

export function useLogin() {
    return useMutation({
        mutationFn: login,
    })
}