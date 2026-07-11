import { SiteHeader } from "@/components/site-header"
import { DashboardChart } from "@/features/dashboard/components/dashboard-chart"
import { DashboardCards } from "@/features/dashboard/components/dasboard-cards"

export default function Page() {
  return (
    <>
      <SiteHeader title="Dashboard" />
      <main className="w-full flex flex-1 flex-col gap-4 p-6">
        <h2 className="text-4xl font-light">Bienvenido usuario</h2>
        <DashboardCards />
        <DashboardChart />
      </main>
    </>
  )
}