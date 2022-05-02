const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const createToken = (email, name, role) => {
  const newUser = {
    name: name,
    email: email,
    role: role,
  };
  const token = jwt.sign(newUser, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

module.exports = { createToken };
