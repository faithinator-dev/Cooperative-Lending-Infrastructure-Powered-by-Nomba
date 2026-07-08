import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '../api/transaction'
import { exportToCSV } from '../utils/csv'
import { SkeletonTable } from '../components/Skeleton'
import ErrorBoundary from '../components/ErrorBoundary'

const Transactions = () => {
  const [filters, setFilters] = useState({ type: 'all' })
  const { isLoading, error, data: transactions = [], refetch } = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => getTransactions(filters.type === 'all' ? {} : { type: filters.type }),
  })

  const normalizedTransactions = Array.isArray(transactions) ? transactions : []
  const filteredTransactions = filters.type === 'all' ? normalizedTransactions : normalizedTransactions.filter((t) => t.type === filters.type)

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      alert('No transactions to export')
      return
    }
    exportToCSV(filteredTransactions, 'transactions')
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 shadow-[0_35px_120px_-70px_rgba(98,0,238,0.65)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Ledger activity</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Transaction intelligence</h1>
            <p className="mt-2 text-sm text-slate-400">Inspect credit, debit, and repayment movement across the network.</p>
          </div>
          <button onClick={handleExportCSV} className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5">
            Export CSV
          </button>
        </div>
      </div>

      {error && <ErrorBoundary error={error.message} onRetry={refetch} />}

      <div className="flex flex-wrap gap-2">
        {['all', 'savings', 'loan_repayment', 'loan_disbursement', 'penalty'].map((t) => (
          <button
            key={t}
            onClick={() => setFilters({ type: t })}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${filters.type === t ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'border border-slate-800/80 bg-slate-900/80 text-slate-300 hover:border-purple-500/40'}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>

      {isLoading ? (
        <SkeletonTable rows={10} cols={8} />
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/90 shadow-sm shadow-slate-950/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/90 text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Reference</th>
                <th className="px-4 py-3 text-left font-medium">Member</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-right font-medium">Credit</th>
                <th className="px-4 py-3 text-right font-medium">Debit</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Narration</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">No transactions found</td>
                </tr>
              ) : (
                filteredTransactions.map((tx, i) => (
                  <tr key={tx.id || i} className="border-t border-slate-800/70 bg-slate-950/70 text-slate-300 hover:bg-slate-900/80">
                    <td className="px-4 py-3">{new Date(tx.date || tx.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{tx.reference || '-'}</td>
                    <td className="px-4 py-3">{tx.member || '-'}</td>
                    <td className="px-4 py-3 text-sm">{tx.type}</td>
                    <td className="px-4 py-3 text-right text-emerald-300">₦{Number(tx.credit || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-rose-300">₦{Number(tx.debit || 0).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tx.status === 'success' ? 'bg-emerald-500/10 text-emerald-200' : 'bg-amber-500/10 text-amber-200'}`}>
                        {tx.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">{tx.narration || '-'}</td>
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

export default Transactions
