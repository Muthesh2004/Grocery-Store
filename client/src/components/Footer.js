// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p><span>Contact:</span> +91 8867082099 | <span>Email:</span> muthesh2004@gmail.com</p>
        <p><span>Address:</span> 4th cross, Vivekananda nagar, Hoskote - 562114</p>
      </div>
      <div className="footer-right">
        <p>Done By: <strong>Muthesh K</strong></p>
      </div>
    </footer>
  );
};

export default Footer;
