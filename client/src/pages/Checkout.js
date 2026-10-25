import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../utils/auth';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [upiAddress, setUpiAddress] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async () => {
    if (!address) {
      alert('Please enter a delivery address.');
      return;
    }

    if (paymentMethod === 'upi' && !upiAddress) {
      alert('Please enter your UPI ID.');
      return;
    }

    if (
      paymentMethod === 'card' &&
      (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)
    ) {
      alert('Please fill in all card details.');
      return;
    }

    const token = getToken();

    const formattedItems = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const paymentDetails = {
      method: paymentMethod,
      ...(paymentMethod === 'upi' && { upiAddress }),
      ...(paymentMethod === 'card' && { ...cardDetails }),
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/orders',
        {
          items: formattedItems,
          address,
          totalAmount: total,
          payment: paymentDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      navigate('/order-confirmation', { state: { order: res.data } });
    } catch (err) {
      console.error('Order error:', err.response?.data || err.message);
      alert('Order failed. Please login again or check your network.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <label htmlFor="address">Delivery Address:</label>
      <textarea
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows="4"
        className="checkout-input"
      />

      <label htmlFor="payment-method">Payment Method:</label>
      <select
        id="payment-method"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="checkout-input"
      >
        <option value="cash">Cash on Delivery</option>
        <option value="upi">UPI</option>
        <option value="card">Credit/Debit Card</option>
      </select>

      {paymentMethod === 'upi' && (
        <input
          type="text"
          placeholder="Enter UPI ID (e.g., user@upi)"
          value={upiAddress}
          onChange={(e) => setUpiAddress(e.target.value)}
          className="checkout-input"
        />
      )}

      {paymentMethod === 'card' && (
        <div className="card-details">
          <input
            type="text"
            placeholder="Card Number"
            value={cardDetails.number}
            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
            className="checkout-input"
          />
          <input
            type="text"
            placeholder="Valid Thru (MM/YY)"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            className="checkout-input"
          />
          <input
            type="password"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            className="checkout-input"
          />
        </div>
      )}

      <h3>Order Summary:</h3>
      <ul className="checkout-list">
        {cart.map((item) => (
          <li key={item._id}>
            {item.name} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <h4 className="checkout-total">Total: ₹{total.toFixed(2)}</h4>

      <button className="checkout-button" onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
