require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Routes
const adminRoutes = require('./routes/adminRoutes');
const carRoutes = require('./routes/carRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const discountRoutes = require('./routes/discountRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
async function connectDB() {
  while (true) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected");
      break;
    } catch (err) {
      console.log("MongoDB not ready, retrying in 5s...");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

connectDB();

// Register Routes
app.use('/api/admin', adminRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/discounts', discountRoutes);

app.get('/', (req, res) => {
  res.send('GT Auto API is running...');
});

const fs = require('fs');
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
