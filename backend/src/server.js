const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT;

// 1. Configure Middleware
app.use(cors({ origin: '*' })); // Allows cross-origin requests
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses urlencoded payloads

// 2. Configure MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 3. Basic Route
app.get('/', (req, res) => {
  res.send('API is running smoothly!');
});

// 4. Error Handling Middleware
// Must be defined last, after all other app.use() and route calls
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