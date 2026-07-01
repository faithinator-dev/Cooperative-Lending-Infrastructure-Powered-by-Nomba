require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

connectDB();

const PORT = process.env.PORT;



app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});