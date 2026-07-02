import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export type LoginInput = z.infer<typeof loginSchema>

// Forma en la que esperamos que responda tu API al hacer login
export const loginResponseSchema = z.object({
    token: z.string(),
    user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
    }),
})

export type LoginResponse = z.infer<typeof loginResponseSchema>