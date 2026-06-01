const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');
const authMiddleware = require('../middleware/authMiddleware');

// Get only active discounts (Public)
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const query = {
      isActive: true,
      $and: [
        {
          $or: [
            { startDate: { $exists: false } },
            { startDate: null },
            { startDate: { $lte: now } }
          ]
        },
        {
          $or: [
            { endDate: { $exists: false } },
            { endDate: null },
            { endDate: { $gte: now } }
          ]
        }
      ]
    };

    const activeDiscounts = await Discount.find(query).sort({ createdAt: -1 });
    res.json(activeDiscounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all discounts (Protected - Admin)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const discounts = await Discount.find().sort({ createdAt: -1 });
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new discount (Protected - Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newDiscount = new Discount(req.body);
    const savedDiscount = await newDiscount.save();
    res.status(201).json(savedDiscount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing discount (Protected - Admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedDiscount = await Discount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDiscount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.json(updatedDiscount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a discount (Protected - Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedDiscount = await Discount.findByIdAndDelete(req.params.id);
    if (!deletedDiscount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.json({ message: 'Discount deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
