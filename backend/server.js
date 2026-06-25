const express = require('express');
const crypto = require('crypto');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Afrodevs!');
});

app.listen(PORT, () => console.log(`Server is running on port https://localhost:${PORT}`));

