import { SiteHeader } from "@/components/site-header"
import { AccountSettingsCard } from "@/features/settings/components/account-settings-card"
import { SecuritySettingsCard } from "@/features/settings/components/security-settings-card"
import { SystemSettingsCard } from "@/features/settings/components/system-settings-card"

export default function SettingsPage() {
    return (
        <>
            <SiteHeader title="Configuración" />
            <main className="max-w-4xl mx-auto w-full flex flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col gap-4">
                    <AccountSettingsCard />
                    <SecuritySettingsCard />
                    <SystemSettingsCard />
                </div>
            </main>
        </>
    )
}