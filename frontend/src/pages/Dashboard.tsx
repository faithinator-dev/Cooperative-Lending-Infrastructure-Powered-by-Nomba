import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Minimal page: call dashboard endpoint if it exists.
    // If the backend endpoint name differs, update this call later.
    api
      .get('/api/dashboard')
      .then((res) => setData(res.data))
      .catch((e) => {
        setError(
          e?.response?.data?.message ||
            e?.message ||
            'Request failed',
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 style={{ marginTop: 0 }}>Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && (
        <p style={{ color: 'crimson' }}>
          Could not load dashboard. <br />
          {error}
        </p>
      )}
      {!loading && !error && (
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 8, overflow: 'auto' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </section>
  );
}

