import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getSettings, updateSettings } from '../api/settings'
import ErrorBoundary from '../components/ErrorBoundary'

const Settings = () => {
  const [formData, setFormData] = useState({
    cooperativeName: '',
    adminName: '',
    adminEmail: '',
    webhookUrl: '',
  })
  const [message, setMessage] = useState(null)

  const { isLoading, error, data: settings, refetch } = useQuery({
    queryKey: ['settings'],
    queryFn: () => getSettings().catch(() => ({})),
  })

  const mutation = useMutation({
    mutationFn: (data) => updateSettings(data),
    onSuccess: () => {
      setMessage({ type: 'success', text: 'Settings saved successfully!' })
      setTimeout(() => setMessage(null), 3000)
    },
    onError: (err) => {
      setMessage({ type: 'error', text: err.message || 'Failed to save settings' })
    },
  })

  useEffect(() => {
    if (settings) {
      setFormData({
        cooperativeName: settings.cooperativeName || '',
        adminName: settings.adminName || '',
        adminEmail: settings.adminEmail || '',
        webhookUrl: settings.webhookUrl || '',
      })
    }
  }, [settings])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  const busy = isLoading || mutation.isPending

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] border border-slate-800/90 bg-slate-950/95 p-6 shadow-[0_40px_120px_-70px_rgba(98,0,238,0.65)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">System Settings</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Nomba Control Center</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                Configure financial workflows, webhook delivery and admin metadata from a secure, high-performance dashboard.
              </p>
            </div>

            <div className="rounded-3xl border border-purple-700/20 bg-slate-900/95 px-5 py-4 shadow-lg shadow-purple-500/10">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Current mode</p>
              <p className="mt-2 text-xl font-semibold text-white">Production</p>
              <p className="mt-1 text-sm text-slate-500">Realtime sync enabled</p>
            </div>
          </div>
        </div>

        {error && <ErrorBoundary error={error.message} onRetry={refetch} />}

        {message && (
          <div className={`mb-6 rounded-3xl border px-4 py-3 text-sm ${
            message.type === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
              : 'border-rose-500/30 bg-rose-500/10 text-rose-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
          <section className="rounded-[2rem] border border-slate-800/90 bg-slate-950/90 p-6 shadow-sm shadow-slate-950/30">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Configuration</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Global account settings</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-700/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-purple-200">
                Live edits
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  <span className="block text-slate-400">Cooperative Name</span>
                  <input
                    type="text"
                    name="cooperativeName"
                    value={formData.cooperativeName}
                    onChange={handleChange}
                    disabled={busy}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span className="block text-slate-400">Admin Name</span>
                  <input
                    type="text"
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleChange}
                    disabled={busy}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-300">
                <span className="block text-slate-400">Admin Email</span>
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  disabled={busy}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                <span className="block text-slate-400">Webhook URL</span>
                <input
                  type="url"
                  name="webhookUrl"
                  value={formData.webhookUrl}
                  onChange={handleChange}
                  disabled={busy}
                  placeholder="https://example.com/webhook"
                  className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
                <p className="text-xs text-slate-500">Inbound event callbacks are routed and verified here.</p>
              </label>

              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? 'Saving settings…' : 'Save settings'}
              </button>
            </form>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/90 p-6 shadow-sm shadow-slate-950/30">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">System Health</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Operational status</h2>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                  Online
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { label: 'Backend API', value: 'Connected' },
                  { label: 'Database', value: 'Available' },
                  { label: 'Virtual Accounts', value: 'Enabled' },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/90 p-6 shadow-sm shadow-slate-950/30">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Webhook delivery</p>
              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <p>Secure webhook forwarding with retry logic and payload validation.</p>
                <p>Event latency is monitored continuously to keep alerts accurate.</p>
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
                <span>Webhook channel traffic is stable.</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Settings
