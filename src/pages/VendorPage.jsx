import { useParams } from 'react-router';
import { useVendors } from '../hooks/useVendors';
import MenuList from '../components/MenuList';
import { Loading, ErrorMessage } from '../components/Status';

export function VendorPage() {
  const { id } = useParams();
  const { vendors, loading, error, reload } = useVendors();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const vendor = vendors.find((v) => String(v.id) === String(id));

  if (!vendor) {
    return <h2>Vendor not found</h2>;
  }

  return (
    <div>
      <h2>{vendor.name}</h2>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        {vendor.description}
      </p>
      <h3>Menu</h3>
      <MenuList items={vendor.menu} />
    </div>
  );
}