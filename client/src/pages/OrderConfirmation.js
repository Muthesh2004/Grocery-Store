// src/pages/OrderConfirmation.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="confirmation-container">
        <h2>❌ No Order Found</h2>
        <p>Please return to the products page and place an order.</p>
        <button className="confirmation-btn" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">🎉 Order Placed Successfully!</h1>
      <div className="confirmation-card">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Delivery Address:</strong> {order.address}</p>

        <h3 className="confirmation-subtitle">Items:</h3>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>

        <h3 className="confirmation-total">Total: ₹{order.totalAmount?.toFixed(2)}</h3>
        <button className="confirmation-btn" onClick={() => navigate('/products')}>Shop More</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
