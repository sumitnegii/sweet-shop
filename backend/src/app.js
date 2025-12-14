const express = require("express");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

// protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

module.exports = app;
