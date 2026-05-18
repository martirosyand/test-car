const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');
const authMiddleware = require('../middleware/authMiddleware');

// Submit a service request (Public)
router.post('/', async (req, res) => {
  try {
    const newRequest = new ServiceRequest(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json({ message: 'Service request submitted successfully', data: savedRequest });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all service requests (Protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update request status (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedReq = await ServiceRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updatedReq);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
