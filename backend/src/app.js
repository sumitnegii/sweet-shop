const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const sweetRoutes = require("./routes/sweets.routes");
const authMiddleware = require("./middleware/auth.middleware");

const app = express();

// ✅ CORS must come FIRST
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

// test protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

module.exports = app;
