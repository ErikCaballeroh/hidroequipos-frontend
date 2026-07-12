import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { z } from 'zod'

export const updateMeSchema = z.object({
    nombre: z.string().optional(),
    username: z.string().min(3).optional(),
    current_password: z.string().min(1, "La contraseña actual es requerida"),
    new_password: z.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres").optional(),
})

export type UpdateMeInput = z.infer<typeof updateMeSchema>

async function updateMe(data: UpdateMeInput) {
    const response = await apiClient.patch('/api/v1/users/me', data)
    return response.data
}

export function useUpdateMeMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateMe,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
        },
    })
}
