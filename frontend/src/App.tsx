import React from 'react';
import { Navigate, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Loans from './pages/Loans';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div
      style={{
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, Arial',
        padding: 16,
        maxWidth: 960,
        margin: '0 auto',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20 }}>Co-op Lend</h1>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/">Dashboard</Link>
          <Link to="/members">Members</Link>
          <Link to="/loans">Loans</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}


