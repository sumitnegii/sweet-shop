const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // save user to DB
  await User.create({
    email,
    password: hashedPassword,
  });

  // create JWT
  const token = jwt.sign(
    { email },
    "secret123",
    { expiresIn: "1h" }
  );

  return res.status(201).json({ token });
};
