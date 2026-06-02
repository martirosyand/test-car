const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/authMiddleware');

// Set up initial admin during first boot if empty
router.post('/setup', async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    if (count > 0) return res.status(400).json({ message: 'Admin already exists' });
    
    // Default admin
    const passwordHash = await bcrypt.hash('admin123', 10);
    const newAdmin = new Admin({ username: 'admin', passwordHash });
    await newAdmin.save();
    res.json({ message: 'Default admin initialized (admin / admin123)' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { adminId: admin._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    // Set the token in an HTTP-only, secure, SameSite=Strict cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify if admin is authenticated
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ authenticated: true });
});

// Invalidate/logout admin session
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
