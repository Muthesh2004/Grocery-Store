// src/pages/OrderHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = getToken();
        if (!token) return navigate('/login');

        const response = await axios.get('http://localhost:5000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete all your orders?');
    if (!confirmDelete) return;

    try {
      const token = getToken();
      await axios.delete('http://localhost:5000/api/orders/delete-all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders([]);
      alert('All orders deleted successfully.');
    } catch (err) {
      console.error('Failed to delete orders', err);
      alert('Failed to delete orders.');
    }
  };

  return (
    <div className="order-history-container">
      <h2>Your Order History 🧾</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You have not placed any orders yet.</p>
      ) : (
        <>
          <button className="delete-all-button" onClick={handleDeleteAll}>🗑️ Delete All Orders</button>
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount?.toFixed(2)}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    🛒 <strong>{item.name || '(Unnamed)'}</strong> × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderHistory;
