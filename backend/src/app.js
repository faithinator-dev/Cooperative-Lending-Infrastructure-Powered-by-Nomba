const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Co-op Lending API Running"
  });
});

module.exports = app;