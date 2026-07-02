import { LoginForm } from '@/features/auth/components/login-form'

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center p-8">
            <div className="w-full max-w-sm space-y-6">
                <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>
                <LoginForm />
            </div>
        </main>
    )
}