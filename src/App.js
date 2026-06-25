import React, { useEffect, useState } from 'react';

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    padding: '40px 16px',
  },
  card: {
    maxWidth: 700,
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    padding: '32px 36px',
    color: '#fff',
  },
  headerTitle: { margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px' },
  headerSub: { margin: '6px 0 0', fontSize: 13, opacity: 0.8 },
  body: { padding: '28px 36px' },
  formRow: { display: 'flex', gap: 10, marginBottom: 28, alignItems: 'center' },
  input: {
    flex: 1,
    padding: '10px 14px',
    border: '1.5px solid #e2e8f0',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  qtyInput: {
    width: 80,
    padding: '10px 14px',
    border: '1.5px solid #e2e8f0',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
  },
  button: {
    padding: '10px 22px',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left',
    padding: '10px 14px',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#64748b',
    borderBottom: '2px solid #f1f5f9',
  },
  td: { padding: '14px', fontSize: 14, color: '#334155', borderBottom: '1px solid #f1f5f9' },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    background: '#fef9c3',
    color: '#854d0e',
  },
  empty: { textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontSize: 14 },
  countRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  countLabel: { fontSize: 13, fontWeight: 600, color: '#64748b' },
};

export default function App() {
  const [orders, setOrders] = useState([]);
  const [item, setItem] = useState('');
  const [qty, setQty] = useState(1);

  const fetchOrders = () =>
    fetch('api/orders').then(r => r.json()).then(setOrders);

  useEffect(() => { fetchOrders(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await fetch('api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item, quantity: Number(qty) }),
    });
    setItem(''); setQty(1);
    fetchOrders();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Order Management</h1>
          <p style={styles.headerSub}>Powered by OpenChoreo · FastAPI · PostgreSQL</p>
        </div>
        <div style={styles.body}>
          <form onSubmit={submit} style={styles.formRow}>
            <input
              style={styles.input}
              value={item}
              onChange={e => setItem(e.target.value)}
              placeholder="Item name"
              required
            />
            <input
              style={styles.qtyInput}
              type="number"
              value={qty}
              onChange={e => setQty(e.target.value)}
              min={1}
            />
            <button style={styles.button} type="submit">Place Order</button>
          </form>

          <div style={styles.countRow}>
            <span style={styles.countLabel}>Orders ({orders.length})</span>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Item</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan="4" style={styles.empty}>No orders yet. Place your first order above.</td></tr>
              ) : (
                orders.map(o => (
                  <tr key={o.id}>
                    <td style={styles.td}>#{o.id}</td>
                    <td style={styles.td}>{o.item}</td>
                    <td style={styles.td}>{o.quantity}</td>
                    <td style={styles.td}><span style={styles.badge}>{o.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}