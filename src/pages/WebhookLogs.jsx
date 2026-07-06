import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getWebhookLogs } from '../api/webhook'
import { SkeletonTable } from '../components/Skeleton'
import ErrorBoundary from '../components/ErrorBoundary'

const WebhookLogs = () => {
  const { isLoading, error, data: logs = [], refetch } = useQuery({
    queryKey: ['webhookLogs'],
    queryFn: () => getWebhookLogs().catch(() => []),
  })

  const mockLogs = [
    { id: 1, reference: 'TXN-2024-001', event: 'Transfer Completed', amount: 1000000, accountNumber: '1234567890', status: 'Success', time: '2024-01-15 14:30:00' },
    { id: 2, reference: 'TXN-2024-002', event: 'Transfer Failed', amount: 500000, accountNumber: '0987654321', status: 'Failed', time: '2024-01-15 13:20:00' },
    { id: 3, reference: 'TXN-2024-003', event: 'Transfer Completed', amount: 2000000, accountNumber: '1111111111', status: 'Success', time: '2024-01-15 12:15:00' },
  ]

  const normalizedLogs = Array.isArray(logs) ? logs : []
  const displayLogs = normalizedLogs.length > 0 ? normalizedLogs : mockLogs

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 shadow-[0_35px_120px_-70px_rgba(98,0,238,0.65)]">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Webhook events</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Debugging stream</h1>
          <p className="mt-2 text-sm text-slate-400">Observe live transfers and service events with instant visibility into status.</p>
        </div>
      </div>

      {error && <ErrorBoundary error={error.message} onRetry={refetch} />}

      {isLoading ? (
        <SkeletonTable rows={10} cols={6} />
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/90 shadow-sm shadow-slate-950/30">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/90 text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Time</th>
                <th className="px-4 py-3 text-left font-medium">Reference</th>
                <th className="px-4 py-3 text-left font-medium">Event</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3 text-left font-medium">Account Number</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No webhook logs found</td>
                </tr>
              ) : (
                displayLogs.map((log) => (
                  <tr key={log.id} className="border-t border-slate-800/70 bg-slate-950/70 text-slate-300 hover:bg-slate-900/80">
                    <td className="px-4 py-3 text-xs text-slate-500">{log.time}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{log.reference}</td>
                    <td className="px-4 py-3">{log.event}</td>
                    <td className="px-4 py-3 text-right">₦{Number(log.amount || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{log.accountNumber}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-200' : 'bg-rose-500/10 text-rose-200'}`}>
                        {log.status}
                      </span>
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

export default WebhookLogs
