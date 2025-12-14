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



// updation____>>

exports.updateSweet = async (req, res) => {
  const { id } = req.params;

  const updatedSweet = await Sweet.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  if (!updatedSweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  return res.status(200).json(updatedSweet);
};

//  deletion swts 

exports.deleteSweet = async (req, res) => {
  const { id } = req.params;

  const deletedSweet = await Sweet.findByIdAndDelete(id);

  if (!deletedSweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  return res.status(200).json({ message: "Sweet deleted successfully" });
};
