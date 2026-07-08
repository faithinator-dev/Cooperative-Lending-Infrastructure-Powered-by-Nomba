import React from 'react'

const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="rounded-[1.75rem] border border-slate-800/80 bg-slate-950/95 p-5 shadow-sm shadow-purple-500/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="text-xs uppercase tracking-[0.35em] text-slate-500">{title}</div>
      <div className="mt-4 text-3xl font-semibold tracking-tight text-white">{value}</div>
      {subtitle && <div className="mt-3 text-sm text-slate-400">{subtitle}</div>}
    </div>
  )
}

export default StatCard
