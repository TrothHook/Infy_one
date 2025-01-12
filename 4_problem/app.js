const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/db/connection");

dotenv.config();
const app = express();
// Connect to MongoDB
connectDB();

app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
