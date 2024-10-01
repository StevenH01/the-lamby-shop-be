const express = require('express');
const cors = require('cors');  // Optional: Use if you're allowing cross-origin requests
const stripeRoutes = require('./routes/stripeRoutes');  // Import stripe route
const userRoutes = require('./routes/userRoutes');      // Import user routes (optional)
const productRoutes = require('./routes/productRoutes');  // Import product routes (optional)

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS if frontend and backend are hosted on different domains

// Routes
app.use('/api/stripe', stripeRoutes);   // Stripe API routes mounted at /api/stripe
app.use('/api/users', userRoutes);      // User API routes (optional)
app.use('/api/products', productRoutes);  // Product API routes (optional)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
