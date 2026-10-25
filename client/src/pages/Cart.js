// src/pages/Cart.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-msg">
          Your cart is empty.
          <Link to="/products" className="shop-now-btn">Shop Now 🛒</Link>
        </p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ₹{total.toFixed(2)}</h3>
          <div className="cart-buttons">
            <button className="checkout" onClick={handleCheckout}>Proceed to Checkout</button>
            <button className="clear" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
