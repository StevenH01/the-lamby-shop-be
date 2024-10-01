const express = require('express');
const stripeRoutes = require('./routes/stripeRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Route setup
app.use('/stripe', stripeRoutes);    // Stripe-related routes
app.use('/users', userRoutes);       // User-related routes
app.use('/products', productRoutes); // Product-related routes

// Global error handler (optional)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
