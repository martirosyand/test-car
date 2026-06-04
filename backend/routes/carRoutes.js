const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Car = require('../models/Car');
const authMiddleware = require('../middleware/authMiddleware');

// Configure local multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Wrapper middleware to intercept Multer errors and log diagnostics
const handleUpload = (req, res, next) => {
  upload.array('images', 20)(req, res, (err) => {
    if (err) {
      console.error("=== MULTER UPLOAD ERROR ===");
      console.error("Message:", err.message);
      console.error("Field name:", err.field);
      console.error("Request body keys:", Object.keys(req.body || {}));
      if (req.files) {
        console.error("Uploaded file field names:", req.files.map(f => f.fieldname));
      } else if (req.file) {
        console.error("Uploaded file field name:", req.file.fieldname);
      }
      console.error("===========================");

      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          message: err.message,
          field: err.field || 'images'
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || "File upload failed"
      });
    }
    next();
  });
};

// Get all cars
router.get('/', async (req, res) => {
  try {
    // Add searching and filtering based on query params
    let filter = {};
    if (req.query.brand) filter.brand = new RegExp(req.query.brand, 'i');
    if (req.query.minPrice) filter.price = { $gte: Number(req.query.minPrice) };
    if (req.query.maxPrice) filter.price = { ...filter.price, $lte: Number(req.query.maxPrice) };
    if (req.query.year) filter.year = Number(req.query.year);

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single car
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new car (Protected)
router.post('/', authMiddleware, handleUpload, async (req, res) => {
  try {
    const newFiles = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    let images = [];
    
    if (req.body.imageOrder) {
      const order = JSON.parse(req.body.imageOrder);
      images = order.map(item => {
        if (item.startsWith('existing:')) {
          return item.slice('existing:'.length);
        } else if (item.startsWith('new:')) {
          const index = parseInt(item.slice('new:'.length), 10);
          return newFiles[index];
        }
        return null;
      }).filter(Boolean);
    } else {
      images = newFiles;
    }

    const newCar = new Car({
      ...req.body,
      images: images
    });
    console.log(images);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update car (Protected)
router.put('/:id', authMiddleware, handleUpload, async (req, res) => {
  try {
    let updateData = { ...req.body };
    const newFiles = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    
    if (req.body.imageOrder) {
      const order = JSON.parse(req.body.imageOrder);
      updateData.images = order.map(item => {
        if (item.startsWith('existing:')) {
          return item.slice('existing:'.length);
        } else if (item.startsWith('new:')) {
          const index = parseInt(item.slice('new:'.length), 10);
          return newFiles[index];
        }
        return null;
      }).filter(Boolean);
    } else {
      // Fallback for old behavior
      if (req.files && req.files.length > 0) {
        updateData.images = newFiles;
      } else if (req.body.existingImages) {
        updateData.images = Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages];
      }
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete car (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
