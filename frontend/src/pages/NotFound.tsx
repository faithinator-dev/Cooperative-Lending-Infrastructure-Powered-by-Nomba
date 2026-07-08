import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section>
      <h2 style={{ marginTop: 0 }}>Page not found</h2>
      <p>
        Go back to <Link to="/">Dashboard</Link>
      </p>
    </section>
  );
}

