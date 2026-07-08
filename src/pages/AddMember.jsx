import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMember } from '../api/member'
import { SkeletonTable } from '../components/Skeleton'

const AddMember = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bvn: '',
    cooperative: '',
    bankName: '',
    bankCode: '',
    accountNumber: '',
    accountName: '',
  })
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await createMember(formData)
      setResult(data)
      // Show success for 2 seconds then go back to members
      setTimeout(() => navigate('/members'), 2000)
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to create member')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Member</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">{error}</div>}
      {result && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded mb-4">
          <div className="font-semibold">Member Created Successfully!</div>
          <div className="text-sm mt-1">
            {result.savingsAccount && <div>Savings VA: <span className="font-mono">{result.savingsAccount}</span></div>}
            {result.loanAccount && <div>Loan VA: <span className="font-mono">{result.loanAccount}</span></div>}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label>
            <div className="text-sm font-semibold mb-1">Name *</div>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
          <label>
            <div className="text-sm font-semibold mb-1">Phone *</div>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
          <label>
            <div className="text-sm font-semibold mb-1">BVN *</div>
            <input type="text" name="bvn" value={formData.bvn} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
          <label>
            <div className="text-sm font-semibold mb-1">Cooperative *</div>
            <input type="text" name="cooperative" value={formData.cooperative} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
          <label>
            <div className="text-sm font-semibold mb-1">Bank Name *</div>
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
          <label>
            <div className="text-sm font-semibold mb-1">Bank Code *</div>
            <input type="text" name="bankCode" value={formData.bankCode} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
          <label>
            <div className="text-sm font-semibold mb-1">Account Number *</div>
            <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
          <label>
            <div className="text-sm font-semibold mb-1">Account Name *</div>
            <input type="text" name="accountName" value={formData.accountName} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Member'}
          </button>
          <button type="button" onClick={() => navigate('/members')} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddMember
