import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const MemberProfile = () => {
  const { memberId } = useParams()
  const navigate = useNavigate()
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data — replace with API call: getMember(memberId)
    setMember({
      id: memberId,
      name: 'John Doe',
      phone: '08123456789',
      bvn: '12345678901',
      savingsBalance: 500000,
      loanBalance: 2000000,
      savingsVA: '1234567890',
      loanVA: '0987654321',
      recentTransactions: [
        { id: 1, date: '2024-01-15', type: 'Deposit', amount: 50000, status: 'Success' },
        { id: 2, date: '2024-01-10', type: 'Withdrawal', amount: 10000, status: 'Success' },
      ],
      loans: [
        { id: 1, principal: 1000000, interest: 200000, status: 'Active', balance: 500000 },
      ],
    })
    setLoading(false)
  }, [memberId])

  if (loading) return <div className="p-6">Loading...</div>
  if (!member) return <div className="p-6">Member not found</div>

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{member.name}</h1>
        <button onClick={() => navigate('/members')} className="px-4 py-2 bg-gray-200 rounded">Back</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <div className="text-sm text-gray-500">Phone</div>
          <div className="text-lg font-semibold">{member.phone}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <div className="text-sm text-gray-500">BVN</div>
          <div className="text-lg font-semibold">{member.bvn}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <div className="text-sm text-gray-500">Savings Balance</div>
          <div className="text-lg font-semibold">₦{member.savingsBalance?.toLocaleString()}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <div className="text-sm text-gray-500">Loan Balance</div>
          <div className="text-lg font-semibold">₦{member.loanBalance?.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <div className="text-sm text-gray-500 mb-2">Savings Virtual Account</div>
          <div className="font-mono text-lg">{member.savingsVA}</div>
          <button className="text-xs mt-2 px-2 py-1 bg-gray-100 rounded" onClick={() => navigator.clipboard.writeText(member.savingsVA)}>Copy</button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <div className="text-sm text-gray-500 mb-2">Loan Virtual Account</div>
          <div className="font-mono text-lg">{member.loanVA}</div>
          <button className="text-xs mt-2 px-2 py-1 bg-gray-100 rounded" onClick={() => navigator.clipboard.writeText(member.loanVA)}>Copy</button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-right">Amount</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {member.recentTransactions?.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="p-2">{tx.date}</td>
                <td className="p-2">{tx.type}</td>
                <td className="p-2 text-right">₦{tx.amount?.toLocaleString()}</td>
                <td className="p-2"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{tx.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Loans</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left">Principal</th>
              <th className="p-2 text-left">Interest</th>
              <th className="p-2 text-right">Balance</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {member.loans?.map((ln) => (
              <tr key={ln.id} className="border-t">
                <td className="p-2">₦{ln.principal?.toLocaleString()}</td>
                <td className="p-2">₦{ln.interest?.toLocaleString()}</td>
                <td className="p-2 text-right">₦{ln.balance?.toLocaleString()}</td>
                <td className="p-2"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{ln.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MemberProfile
