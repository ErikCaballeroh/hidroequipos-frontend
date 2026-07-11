"use client"

import { CustomersCards } from "./customers-cards"
import { TopCustomersChart } from "./top-customers-chart"
import { CreditVsPaymentsChart } from "./credit-vs-payments-chart"
import { AccountsReceivableTable } from "./accounts-receivable-table"

export function CustomersTab() {
    return (
        <div className="flex flex-col gap-4">
            <CustomersCards />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <TopCustomersChart />
                <CreditVsPaymentsChart />
            </div>
            <AccountsReceivableTable />
        </div>
    )
}
