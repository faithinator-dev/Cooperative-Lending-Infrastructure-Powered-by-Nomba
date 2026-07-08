import React from 'react'

export default function ErrorBoundary({ error, onRetry }) {
  return (
    <div className="rounded-[1.5rem] border border-rose-500/20 bg-rose-500/10 p-5 text-slate-100 shadow-lg shadow-rose-500/10">
      <div className="font-semibold text-white mb-2">Action required</div>
      <div className="text-sm leading-6 text-slate-300 mb-4">{error || 'Something went wrong while loading data.'}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex rounded-3xl bg-rose-500/20 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/30"
        >
          Retry here
        </button>
      )}
    </div>
  )
}
