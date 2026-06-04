require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const csrfMiddleware = require('./middleware/csrfMiddleware');

// Routes
const adminRoutes = require('./routes/adminRoutes');
const carRoutes = require('./routes/carRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const discountRoutes = require('./routes/discountRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration to support cookies/credentials from frontend
const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  // Allow all origins in development/test environments (e.g. VPS, containerized testing)
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ].filter(Boolean);
  return allowedOrigins.includes(origin);
};

app.use(cors({
  origin: function (origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
    return callback(new Error(msg), false);
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(csrfMiddleware);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '365d',
  immutable: true
}));

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
