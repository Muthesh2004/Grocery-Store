// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

// Place a new order
router.post('/', authMiddleware, async (req, res) => {
  const { items, totalAmount, address } = req.body;

  if (!items || !address || !totalAmount) {
    return res.status(400).json({ message: 'Missing order details' });
  }

  try {
    const order = new Order({
      userId: req.user.userId,
      items,
      totalAmount,
      address,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// Get current user's order history
router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// DELETE all orders of the logged-in user
router.delete('/delete-all', authMiddleware, async (req, res) => {
  try {
    await Order.deleteMany({ userId: req.user.userId });
    res.json({ message: 'All orders deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete orders' });
  }
});

module.exports = router;
