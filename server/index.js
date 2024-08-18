const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());  // Parse JSON bodies

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// API endpoint example
app.get("/api/greet", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
