import React from 'react'

const ChartCard = ({ title, height = 160, children }) => {
  return (
    <div className="rounded-[1.75rem] border border-slate-800/80 bg-slate-950/95 p-5 shadow-sm shadow-slate-950/20">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm uppercase tracking-[0.35em] text-slate-500">{title}</h3>
      </div>
      <div style={{ height }} className="w-full rounded-3xl bg-slate-950/80 p-3">
        {children ? children : <div className="h-full flex items-center justify-center text-slate-500">Chart placeholder</div>}
      </div>
    </div>
  )
}

export default ChartCard
