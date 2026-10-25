import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { addToCart } = useCart();

  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Snacks', 'Grains', 'Meat'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = [];
        if (category) query.push(`category=${category}`);
        if (search) query.push(`search=${search}`);
        const url = `http://localhost:5000/api/products?${query.join('&')}`;
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, [category, search]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setSuccessMessage(`✅ ${product.name} added to cart`);
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  return (
    <div className="products-container">
      <h2>Our Products</h2>

      <div className="filters">
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {successMessage && <div className="cart-toast">{successMessage}</div>}

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>₹{product.price}</strong></p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
