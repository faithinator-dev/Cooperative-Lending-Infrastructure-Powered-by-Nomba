const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// 1. Configure Middleware
app.use(cors({ origin: '*' })); // Allows cross-origin requests
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses urlencoded payloads

// 2. Configure MongoDB Connection

if (!mongoURI) {
  console.error('ERROR: MONGODB_URI is not defined in the environment variables!');
  process.exit(1); // Stop the server immediately
}

mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
// 3. Basic Route
app.get('/', (req, res) => {
  res.send('API is running smoothly!');
});

// 4. Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred!',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});