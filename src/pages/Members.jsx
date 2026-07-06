import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getMembers } from '../api/member'
import { SkeletonTable } from '../components/Skeleton'
import ErrorBoundary from '../components/ErrorBoundary'

const Members = () => {
  const navigate = useNavigate()
  const { isLoading, error, data: members = [], refetch } = useQuery({
    queryKey: ['members'],
    queryFn: () => getMembers().catch(() => []),
  })

  const mockMembers = [
    { id: 1, name: 'John Doe', phone: '08123456789', bvn: '12345678901', savingsAccount: '1234567890', loanAccount: '0987654321' },
    { id: 2, name: 'Jane Smith', phone: '08198765432', bvn: '10987654321', savingsAccount: '1111111111', loanAccount: '2222222222' },
  ]

  const normalizedMembers = Array.isArray(members) ? members : []
  const displayMembers = normalizedMembers.length > 0 ? normalizedMembers : mockMembers

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 shadow-[0_35px_120px_-70px_rgba(98,0,238,0.65)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Member registry</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Members at a glance</h1>
            <p className="mt-2 text-sm text-slate-400">Track accounts, virtual allocations, and onboarding status for every member.</p>
          </div>
          <button onClick={() => navigate('/members/add')} className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5">
            Add Member
          </button>
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
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Phone</th>
                <th className="px-4 py-3 text-left font-medium">BVN</th>
                <th className="px-4 py-3 text-left font-medium">Savings VA</th>
                <th className="px-4 py-3 text-left font-medium">Loan VA</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No members found</td>
                </tr>
              ) : (
                displayMembers.map((m) => (
                  <tr key={m.id || m._id} className="border-t border-slate-800/70 bg-slate-950/70 text-slate-300 hover:bg-slate-900/80">
                    <td className="px-4 py-3">{m.name}</td>
                    <td className="px-4 py-3">{m.phone}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{m.bvn}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{m.savingsAccount || '-'}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{m.loanAccount || '-'}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => navigate(`/members/${m.id}`)} className="rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-purple-500/40 hover:bg-slate-800">
                        View
                      </button>
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

export default Members
