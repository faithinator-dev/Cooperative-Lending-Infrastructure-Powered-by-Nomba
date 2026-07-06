import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getLoans } from '../api/loan'
import { SkeletonTable } from '../components/Skeleton'
import ErrorBoundary from '../components/ErrorBoundary'

const Loans = () => {
  const navigate = useNavigate()
  const { isLoading, error, data: loans = [], refetch } = useQuery({
    queryKey: ['loans'],
    queryFn: () => getLoans().catch(() => []),
  })

  const mockLoans = [
    { id: 1, member: 'John Doe', principal: 1000000, interest: 200000, tenor: 12, monthlyDue: 100000, balance: 500000, status: 'Active', transferStatus: 'Pending', createdDate: '2024-01-15' },
    { id: 2, member: 'Jane Smith', principal: 2000000, interest: 400000, tenor: 24, monthlyDue: 100000, balance: 1500000, status: 'Active', transferStatus: 'Completed', createdDate: '2024-01-10' },
  ]

  const normalizedLoans = Array.isArray(loans) ? loans : []
  const displayLoans = normalizedLoans.length > 0 ? normalizedLoans : mockLoans

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 shadow-[0_35px_120px_-70px_rgba(98,0,238,0.65)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Loan orchestration</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Loan pipeline overview</h1>
            <p className="mt-2 text-sm text-slate-400">Manage disbursement readiness, balances, and transfer status in one place.</p>
          </div>
          <button onClick={() => navigate('/loans/create')} className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5">
            Create Loan
          </button>
        </div>
      </div>

      {error && <ErrorBoundary error={error.message} onRetry={refetch} />}

      {isLoading ? (
        <SkeletonTable rows={5} cols={9} />
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/90 shadow-sm shadow-slate-950/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/90 text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Member</th>
                <th className="px-4 py-3 text-right font-medium">Principal</th>
                <th className="px-4 py-3 text-right font-medium">Interest</th>
                <th className="px-4 py-3 text-center font-medium">Tenor</th>
                <th className="px-4 py-3 text-right font-medium">Monthly Due</th>
                <th className="px-4 py-3 text-right font-medium">Balance</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Transfer</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayLoans.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-500">No loans found</td>
                </tr>
              ) : (
                displayLoans.map((ln) => (
                  <tr key={ln.id} className="border-t border-slate-800/70 bg-slate-950/70 text-slate-300 hover:bg-slate-900/80">
                    <td className="px-4 py-3">{ln.member}</td>
                    <td className="px-4 py-3 text-right">₦{Number(ln.principal || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">₦{Number(ln.interest || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">{ln.tenor} months</td>
                    <td className="px-4 py-3 text-right">₦{Number(ln.monthlyDue || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">₦{Number(ln.balance || 0).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ln.status === 'Active' ? 'bg-emerald-500/10 text-emerald-200' : 'bg-amber-500/10 text-amber-200'}`}>
                        {ln.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ln.transferStatus === 'Completed' ? 'bg-blue-500/10 text-blue-200' : 'bg-orange-500/10 text-orange-200'}`}>
                        {ln.transferStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => navigate(`/loans/${ln.id}`)} className="rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-purple-500/40 hover:bg-slate-800">View</button>
                        {ln.transferStatus !== 'Completed' && (
                          <button onClick={() => navigate(`/loans/${ln.id}/disburse`)} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/20">Disburse</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Loans
