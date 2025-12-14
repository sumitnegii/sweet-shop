const Sweet = require("../models/Sweet");

exports.createSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  const sweet = await Sweet.create({
    name,
    category,
    price,
    quantity,
  });

  return res.status(201).json(sweet);
};
exports.getAllSweets = async (req, res) => {
  const sweets = await Sweet.find();
  return res.status(200).json(sweets);
};

/// new test yet
exports.searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sweets = await Sweet.find(query);
  return res.status(200).json(sweets);
};

