const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { email } = req.body;

  const token = jwt.sign(
    { email },
    "secret123",
    { expiresIn: "1h" }
  );

  return res.status(201).json({ token });
};
