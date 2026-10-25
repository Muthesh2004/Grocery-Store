// src/pages/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome to our <span className="highlight">GroceryShop</span> 🛒</h1>
        <p>Your one-stop destination for fresh, quality groceries delivered right to your door.</p>
      </div>

      <div className="home-features">
        <h2>Why Shop With Us?</h2>
        <ul>
          <li>✅ Fresh fruits and vegetables, daily stocked</li>
          <li>✅ Dairy, snacks, beverages & more</li>
          <li>✅ Quick delivery across Food City</li>
          <li>✅ Easy online ordering and secure payment</li>
        </ul>
      </div>

      <div className="home-cta">
        <a href="/products" className="shop-now-button">🛍️ Shop Now</a>
      </div>
    </div>
  );
};

export default Home;
