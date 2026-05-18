const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  mileage: { type: Number, required: true },
  engine: { type: String, required: true },
  transmission: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Car', CarSchema);
