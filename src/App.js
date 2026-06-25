import React, { useEffect, useState } from 'react';
  
  const API = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  export default function App() {
    const [orders, setOrders] = useState([]);
    const [item, setItem] = useState('');
    const [qty, setQty] = useState(1);

    const fetchOrders = () =>
      fetch(`${API}/orders`).then(r => r.json()).then(setOrders);

    useEffect(() => { fetchOrders(); }, []);

    const submit = async (e) => {
      e.preventDefault();
      await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      setItem(''); setQty(1);
      fetchOrders();
    };
    
    return (
      <div style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '40px auto' }}>
        <h1>Order Management</h1>
        <form onSubmit={submit} style={{ marginBottom: 24 }}>
          <input value={item} onChange={e => setItem(e.target.value)}
            placeholder="Item name" required style={{ marginRight: 8, padding: 6 }} />
          <input type="number" value={qty} onChange={e => setQty(e.target.value)}
            min={1} style={{ width: 60, marginRight: 8, padding: 6 }} />
          <button type="submit" style={{ padding: '6px 16px' }}>Place Order</button>
        </form>
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr><th>ID</th><th>Item</th><th>Qty</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}><td>{o.id}</td><td>{o.item}</td><td>{o.quantity}</td><td>{o.status}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
import React, { useEffect, useState } from 'react';

// REMOVED: const API = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default function App() {
  const [orders, setOrders] = useState([]);
  const [item, setItem] = useState('');
  const [qty, setQty] = useState(1);

  const fetchOrders = () =>
    fetch('/api/orders').then(r => r.json()).then(setOrders);  // <-- changed

  useEffect(() => { fetchOrders(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await fetch('/api/orders', {                               // <-- changed
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item, quantity: Number(qty) }),   // <-- this was missing in your version!
    });
    setItem(''); setQty(1);
    fetchOrders();
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '40px auto' }}>
      <h1>Order Management</h1>
      <form onSubmit={submit} style={{ marginBottom: 24 }}>
        <input value={item} onChange={e => setItem(e.target.value)}
          placeholder="Item name" required style={{ marginRight: 8, padding: 6 }} />
        <input type="number" value={qty} onChange={e => setQty(e.target.value)}
          min={1} style={{ width: 60, marginRight: 8, padding: 6 }} />
        <button type="submit" style={{ padding: '6px 16px' }}>Place Order</button>
      </form>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr><th>ID</th><th>Item</th><th>Qty</th><th>Status</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}><td>{o.id}</td><td>{o.item}</td><td>{o.quantity}</td><td>{o.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}