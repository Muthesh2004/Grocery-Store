const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products or filter by category or search
router.get('/', async (req, res) => {
  const { category, search } = req.query;

  let query = {};

  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };

  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;
