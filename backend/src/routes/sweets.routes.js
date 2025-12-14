const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
} = require("../controllers/sweets.controller");

router.post("/", authMiddleware, adminMiddleware, createSweet);
router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);
router.put("/:id", authMiddleware, adminMiddleware, updateSweet);

module.exports = router;
