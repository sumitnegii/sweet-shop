const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // check duplicate
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // save user
  await User.create({ email, password: hashedPassword });

  // sign JWT
  const token = jwt.sign({ email }, "secret123", { expiresIn: "1h" });

  return res.status(201).json({ token });
};
