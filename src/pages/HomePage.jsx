import React from 'react';
import { useNavigate } from 'react-router';
import { useVendors } from '../hooks/useVendors';
import VendorCard from '../components/VendorCard';
import { Loading, ErrorMessage } from '../components/Status';

export function HomePage() {
  const { vendors, loading, error, reload } = useVendors();
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <div>
      <h2>Vendors</h2>
      <div
        className="vendor-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        {vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            isSelected={false}
            onSelect={(id) => navigate(`/vendor/${id}`)}
          />
        ))}
      </div>
    </div>
  );
}