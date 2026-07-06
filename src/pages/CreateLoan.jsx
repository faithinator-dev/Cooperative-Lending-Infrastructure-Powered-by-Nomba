import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createLoan } from '../api/loan'

const CreateLoan = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    member: '',
    principal: '',
    interestRate: '',
    tenor: '',
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
      const data = await createLoan(formData)
      setResult(data)
      setTimeout(() => navigate('/loans'), 2000)
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to create loan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Loan</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">{error}</div>}
      {result && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded mb-4">
          <div className="font-semibold">Loan Created Successfully!</div>
          <div className="text-sm mt-1">Loan ID: {result.id}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <label>
          <div className="text-sm font-semibold mb-1">Member *</div>
          <select name="member" value={formData.member} onChange={handleChange} required className="w-full border rounded px-3 py-2">
            <option value="">Select Member</option>
            <option value="1">John Doe</option>
            <option value="2">Jane Smith</option>
          </select>
        </label>
        <label>
          <div className="text-sm font-semibold mb-1">Principal (₦) *</div>
          <input type="number" name="principal" value={formData.principal} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </label>
        <label>
          <div className="text-sm font-semibold mb-1">Interest Rate (%) *</div>
          <input type="number" name="interestRate" value={formData.interestRate} onChange={handleChange} step="0.1" required className="w-full border rounded px-3 py-2" />
        </label>
        <label>
          <div className="text-sm font-semibold mb-1">Tenor (Months) *</div>
          <input type="number" name="tenor" value={formData.tenor} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </label>
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Loan'}
          </button>
          <button type="button" onClick={() => navigate('/loans')} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateLoan
