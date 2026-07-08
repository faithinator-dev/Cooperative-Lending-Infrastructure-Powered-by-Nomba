import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function Members() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    api
      .get('/api/members')
      .then((res) =>
        setItems(
          Array.isArray(res.data) ? res.data : res.data?.members || [],
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
      <h2 style={{ marginTop: 0 }}>Members</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px 0' }}>Name</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px 0' }}>Phone</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px 0' }}>BVN</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: '10px 0' }}>No members found.</td>
              </tr>
            ) : (
              items.map((m: any, idx: number) => (
                <tr key={m._id || m.id || idx}>
                  <td style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>{m.name}</td>
                  <td style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>{m.phone}</td>
                  <td style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>{m.bvn}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}

