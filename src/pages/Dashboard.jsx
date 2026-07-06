import React from 'react'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import SavingsChart from '../components/charts/SavingsChart'
import LoanChart from '../components/charts/LoanChart'
import RepaymentsChart from '../components/charts/RepaymentsChart'
import ChartWithControls from '../components/ChartWithControls'
import ErrorBoundary from '../components/ErrorBoundary'
import { SkeletonChart } from '../components/Skeleton'
import useDashboard from '../hooks/useDashboard'

const Dashboard = () => {
  const { loading, error, stats, chartData, refetch } = useDashboard()

  const displayStats = [
    { title: 'Total Members', value: stats.totalMembers?.toLocaleString() || '0' },
    { title: 'Total Savings', value: `₦${Number(stats.totalSavings || 0).toLocaleString()}` },
    { title: 'Total Active Loans', value: stats.totalActiveLoans?.toLocaleString() || '0' },
    { title: 'Total Loan Outstanding', value: `₦${Number(stats.totalLoanOutstanding || 0).toLocaleString()}` },
    { title: 'Total Repaid', value: `₦${Number(stats.totalRepaid || 0).toLocaleString()}` },
  ]

  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 shadow-[0_35px_120px_-70px_rgba(98,0,238,0.7)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Fintech overview</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Cooperative intelligence, beautifully surfaced.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Monitor contributions, active loan pipelines, and payout health in a premium command center.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Live view • {today}
          </div>
        </div>
      </header>

      {error && <ErrorBoundary error={error} onRetry={refetch} />}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Financial summary</h2>
          <div className="rounded-full border border-slate-800/80 bg-slate-900/70 px-3 py-1 text-xs text-slate-400">
            Updated in real time
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-28 animate-pulse rounded-[1.75rem] border border-slate-800/80 bg-slate-950/80" />
              ))
            : displayStats.map((s) => <StatCard key={s.title} title={s.title} value={s.value} />)}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Performance analytics</h2>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <ChartCard title="Savings Growth" height={270}>
            {loading ? <SkeletonChart /> : <ChartWithControls filename="savings-growth"><SavingsChart labels={chartData.labels} values={chartData.savings} /></ChartWithControls>}
          </ChartCard>
          <ChartCard title="Loan Disbursement" height={270}>
            {loading ? <SkeletonChart /> : <ChartWithControls filename="loan-disbursement"><LoanChart labels={chartData.labels} values={chartData.loans} /></ChartWithControls>}
          </ChartCard>
          <ChartCard title="Repayments" height={270}>
            {loading ? <SkeletonChart /> : <ChartWithControls filename="repayments"><RepaymentsChart labels={['Repaid', 'Outstanding']} values={chartData.repayments} /></ChartWithControls>}
          </ChartCard>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
