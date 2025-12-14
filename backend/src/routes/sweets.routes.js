const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const { createSweet } = require("../controllers/sweets.controller");

router.post("/", authMiddleware, adminMiddleware, createSweet);

module.exports = router;
