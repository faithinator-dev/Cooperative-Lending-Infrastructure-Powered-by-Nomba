import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getVirtualAccounts } from '../api/virtualAccount'
import { SkeletonTable } from '../components/Skeleton'
import ErrorBoundary from '../components/ErrorBoundary'

const VirtualAccounts = () => {
  const { isLoading, error, data: accounts = [], refetch } = useQuery({
    queryKey: ['virtualAccounts'],
    queryFn: () => getVirtualAccounts().catch(() => []),
  })

  const mockAccounts = [
    { id: 1, member: 'John Doe', savingsAccount: '1234567890', loanAccount: '0987654321', bank: 'Access Bank', status: 'Active' },
    { id: 2, member: 'Jane Smith', savingsAccount: '1111111111', loanAccount: '2222222222', bank: 'GTB', status: 'Active' },
  ]

  const normalizedAccounts = Array.isArray(accounts) ? accounts : []
  const displayAccounts = normalizedAccounts.length > 0 ? normalizedAccounts : mockAccounts

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied!')
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 shadow-[0_35px_120px_-70px_rgba(98,0,238,0.65)]">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Virtual accounts</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Account rails and wallet access</h1>
          <p className="mt-2 text-sm text-slate-400">Copy and manage savings and loan virtual account references instantly.</p>
        </div>
      </div>

      {error && <ErrorBoundary error={error.message} onRetry={refetch} />}

      {isLoading ? (
        <SkeletonTable rows={5} cols={6} />
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/90 shadow-sm shadow-slate-950/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/90 text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Member</th>
                <th className="px-4 py-3 text-left font-medium">Savings Account</th>
                <th className="px-4 py-3 text-left font-medium">Loan Account</th>
                <th className="px-4 py-3 text-left font-medium">Bank</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayAccounts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No virtual accounts found</td>
                </tr>
              ) : (
                displayAccounts.map((acc) => (
                  <tr key={acc.id} className="border-t border-slate-800/70 bg-slate-950/70 text-slate-300 hover:bg-slate-900/80">
                    <td className="px-4 py-3">{acc.member}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{acc.savingsAccount}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{acc.loanAccount}</td>
                    <td className="px-4 py-3">{acc.bank}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">{acc.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => copyToClipboard(acc.savingsAccount)} className="rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-purple-500/40 hover:bg-slate-800">Copy Savings</button>
                        <button onClick={() => copyToClipboard(acc.loanAccount)} className="rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-purple-500/40 hover:bg-slate-800">Copy Loan</button>
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

export default VirtualAccounts
