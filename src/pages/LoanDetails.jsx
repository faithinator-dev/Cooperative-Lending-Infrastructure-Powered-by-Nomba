import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const LoanDetails = () => {
  const { loanId } = useParams()
  const navigate = useNavigate()
  const [disbursing, setDisbursing] = useState(false)

  // Mock loan data — replace with API call
  const loan = {
    id: loanId,
    member: 'John Doe',
    principal: 1000000,
    interest: 200000,
    balance: 500000,
    monthlyDue: 100000,
    status: 'Active',
    merchantRef: 'MER-2024-001',
    transferId: 'TXN-2024-001',
    tenor: 12,
    createdDate: '2024-01-15',
  }

  const handleDisburse = async () => {
    setDisbursing(true)
    try {
      // Call disburseLoan(loanId) here
      alert('Loan disbursement initiated')
    } catch (err) {
      alert('Failed to disburse loan')
    } finally {
      setDisbursing(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Loan Details</h1>
        <button onClick={() => navigate('/loans')} className="px-4 py-2 bg-gray-200 rounded">Back</button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Member</div>
            <div className="text-lg font-semibold">{loan.member}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Status</div>
            <div className="text-lg font-semibold">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">{loan.status}</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Principal</div>
            <div className="text-lg font-semibold">₦{loan.principal?.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Interest</div>
            <div className="text-lg font-semibold">₦{loan.interest?.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Balance</div>
            <div className="text-lg font-semibold">₦{loan.balance?.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Monthly Due</div>
            <div className="text-lg font-semibold">₦{loan.monthlyDue?.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Tenor</div>
            <div className="text-lg font-semibold">{loan.tenor} months</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Created</div>
            <div className="text-lg font-semibold">{loan.createdDate}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Merchant Ref</div>
            <div className="font-mono text-sm">{loan.merchantRef}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Transfer ID</div>
            <div className="font-mono text-sm">{loan.transferId}</div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <button onClick={handleDisburse} disabled={disbursing} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">
            {disbursing ? 'Processing...' : 'Disburse Loan'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoanDetails
