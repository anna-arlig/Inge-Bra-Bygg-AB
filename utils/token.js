const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const createToken = (user) => {
  const newUser = {
    name: user.name,
    id: user._id,
    role: user.role,
  };
  const token = jwt.sign(newUser, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

module.exports = { createToken };