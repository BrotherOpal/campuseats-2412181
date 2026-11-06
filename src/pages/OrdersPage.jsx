import React from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router';

export function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>No Past Orders</h2>
        <p style={{ color: '#666', margin: '1rem 0' }}>You haven't placed any orders yet.</p>
        <Link to="/" className="btn">Back to Menus</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Order History</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {orders.map((order) => (
          <div key={order.id} className="card" style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong>Order ID: {order.id}</strong>
              <span style={{ color: '#666' }}>{new Date(order.date).toLocaleString()}</span>
            </div>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Mahallah:</strong> {order.mahallah}</p>
            <p><strong>Pickup Time:</strong> {order.pickupTime}</p>
            <ul style={{ margin: '1rem 0', paddingLeft: '1.2rem' }}>
              {order.items.map((line) => (
                <li key={line.item.id}>
                  {line.item.name} x {line.qty} (RM {(line.item.price * line.qty).toFixed(2)})
                </li>
              ))}
            </ul>
            {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
            <h4>Total: RM {order.total.toFixed(2)}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}