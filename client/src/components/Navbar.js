import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getToken, removeToken } from '../utils/auth';
import './Navbar.css';

const logo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMXjpcpbXCji0kf--h7BUDnjTMU_S_QoAo3w&s';

const Navbar = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const token = getToken();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  let user = null;
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      user = payload?.name ? { name: payload.name } : null;
    }
  } catch (err) {
    console.error('Error decoding token:', err);
  }

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close main menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }

      // Close user dropdown
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <span className="logo-text">
          Fresh<span className="highlight">grocer</span>
        </span>
      </div>

      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* Main Links */}
      <div
        ref={menuRef}
        className={`navbar-links ${menuOpen ? 'active' : ''}`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>

        <Link to="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
          🛒Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        <Link to="/order-history" onClick={() => setMenuOpen(false)}>Orders</Link>

        {user ? (
          <div className="user-menu-container" ref={userMenuRef}>
            {/* USER BUTTON */}
            <button
              className="user-button"
              onClick={(e) => {
                e.stopPropagation(); // ✅ prevents instant close
                setUserMenuOpen(!userMenuOpen);
              }}
            >
              Welcome, {user.name} ▾
            </button>

            {/* DROPDOWN */}
            <div className={`user-dropdown ${userMenuOpen ? 'show' : ''}`}>
              <Link to="/profile">My Profile</Link>
              <Link to="/addresses">My Addresses</Link>
              <Link to="/payments">Manage Payment Methods</Link>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;