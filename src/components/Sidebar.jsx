import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/members', label: 'Members' },
  { to: '/loans', label: 'Loans' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/virtual-accounts', label: 'Virtual Accounts' },
  { to: '/webhook-logs', label: 'Webhook Logs' },
  { to: '/settings', label: 'Settings' },
]

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 overflow-hidden border-r border-slate-800/70 bg-slate-950 text-slate-100 shadow-[20px_0_120px_-80px_rgba(22,17,47,0.8)] transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 py-7">
          <div>
            <div className="mb-10 flex items-center gap-3 rounded-3xl border border-slate-800/80 bg-slate-900/90 px-4 py-4 shadow-xl shadow-slate-950/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-indigo-600 text-lg font-semibold text-white shadow-lg shadow-purple-500/20">
                N
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Nomba</p>
                <p className="text-lg font-semibold text-white">Finance Hub</p>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-3xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-700/20 text-white ring-1 ring-purple-500/40'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-4 text-sm text-slate-400">
            <div className="mb-3 flex items-center gap-2 text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Live status
            </div>
            <p className="text-xs leading-5 text-slate-500">
              Connected to cooperative data, payments, and member services.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
