import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import AddMember from './pages/AddMember'
import MemberProfile from './pages/MemberProfile'
import Loans from './pages/Loans'
import CreateLoan from './pages/CreateLoan'
import LoanDetails from './pages/LoanDetails'
import Transactions from './pages/Transactions'
import VirtualAccounts from './pages/VirtualAccounts'
import Settings from './pages/Settings'
import WebhookLogs from './pages/WebhookLogs'
import AppShell from './components/AppShell'
import { useAuth } from './context/AuthContext'

const ProtectedRoute = ({ children }) => {
  // const { user } = useAuth()
  // if (!user) return <Navigate to="/login" replace />
  return children
}

const withShell = (element) => (
  <ProtectedRoute>
    <AppShell>{element}</AppShell>
  </ProtectedRoute>
)

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={withShell(<Dashboard />)} />
      <Route path="/members" element={withShell(<Members />)} />
      <Route path="/members/add" element={withShell(<AddMember />)} />
      <Route path="/members/:memberId" element={withShell(<MemberProfile />)} />
      <Route path="/loans" element={withShell(<Loans />)} />
      <Route path="/loans/create" element={withShell(<CreateLoan />)} />
      <Route path="/loans/:loanId" element={withShell(<LoanDetails />)} />
      <Route path="/loans/:loanId/disburse" element={withShell(<LoanDetails />)} />
      <Route path="/transactions" element={withShell(<Transactions />)} />
      <Route path="/virtual-accounts" element={withShell(<VirtualAccounts />)} />
      <Route path="/settings" element={withShell(<Settings />)} />
      <Route path="/webhook-logs" element={withShell(<WebhookLogs />)} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App