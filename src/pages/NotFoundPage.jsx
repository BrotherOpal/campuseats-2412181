import React from 'react';
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
      <h2>404 - Page Not Found</h2>
      <p style={{ margin: '1rem 0', color: '#666' }}>The page you are looking for does not exist.</p>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  );
}