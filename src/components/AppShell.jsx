import { useState } from 'react'
import Sidebar from './Sidebar'

const AppShell = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="lg:pl-72">
        <div className="border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-3xl border border-slate-800/90 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-purple-500/40 hover:bg-slate-800/90 lg:hidden"
            >
              <span className="flex h-4 w-4 flex-col justify-between">
                <span className="block h-0.5 w-full rounded-full bg-slate-100" />
                <span className="block h-0.5 w-full rounded-full bg-slate-100" />
                <span className="block h-0.5 w-full rounded-full bg-slate-100" />
              </span>
              Menu
            </button>

            <div className="flex flex-1 items-center justify-between gap-4">
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/90 px-4 py-3 text-sm text-slate-300 shadow-sm shadow-slate-950/20">
                Nomba Pulse
              </div>
              <div className="hidden md:flex items-center gap-2 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-400">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Adaptive fintech controls
              </div>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}

export default AppShell
