import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { apiClient } from '@/lib/api/client'

export const currentUserSchema = z
    .object({
        uuid: z.string().optional(),
        id: z.string().optional(),
        nombre: z.string().optional(),
        name: z.string().optional(),
        username: z.string().optional(),
        email: z.string().optional(),
    })
    .passthrough()

export type CurrentUser = z.infer<typeof currentUserSchema>

async function getCurrentUser(): Promise<CurrentUser> {
    const { data } = await apiClient.get('/api/v1/users/me')
    return currentUserSchema.parse(data)
}

export function useCurrentUserQuery(enabled = true) {
    return useQuery({
        queryKey: ['auth', 'me'],
        queryFn: getCurrentUser,
        retry: false,
        refetchOnWindowFocus: false,
        enabled,
    })
}