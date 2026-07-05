import { QueryProvider } from '@/providers/query-provider'
import { Toaster } from '@/components/ui/sonner'
import { Inter } from 'next/font/google';
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({
  weight: ['300', '400', '500', '700'], // Pesos que necesitas
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap', // Mejora el rendimiento
  variable: '--font-roboto', // Variable CSS opcional
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.className}>
      <body>
        <QueryProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}