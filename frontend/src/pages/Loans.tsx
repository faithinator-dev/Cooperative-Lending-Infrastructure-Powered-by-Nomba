import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function Loans() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    api
      .get('/api/loans')
      .then((res) =>
        setItems(
          Array.isArray(res.data) ? res.data : res.data?.loans || [],
        ),
      )
      .catch((e) =>
        setError(
          e?.response?.data?.message ||
            e?.message ||
            'Request failed',
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 style={{ marginTop: 0 }}>Loans</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {!loading && !error && (
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 8, overflow: 'auto' }}>
          {JSON.stringify(items, null, 2)}
        </pre>
      )}
    </section>
  );
}

