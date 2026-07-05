import type { CSSProperties, ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const dashboardShellStyle: CSSProperties = {
    "--sidebar-width": "calc(var(--spacing) * 72)",
    "--header-height": "calc(var(--spacing) * 12)",
} as CSSProperties

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider style={dashboardShellStyle}>
            <AppSidebar variant="inset" />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    )
}