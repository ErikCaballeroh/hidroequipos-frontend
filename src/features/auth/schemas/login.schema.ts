import { z } from 'zod'

export const loginSchema = z.object({
    username: z.string().min(3, 'Usuario inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export type LoginInput = z.infer<typeof loginSchema>

// Forma en la que esperamos que responda tu API al hacer login
export const loginResponseSchema = z.object({
    // API may return either a token or only an authenticated flag and user object.
    token: z.string().optional(),
    authenticated: z.boolean().optional(),
    user: z.any(),
})

export type LoginResponse = z.infer<typeof loginResponseSchema>