const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const createToken = (email, name, role, id) => {
  const newUser = {
    name: name,
    email: email,
    role: role,
    id: id,
  };
  const token = jwt.sign(newUser, JWT_SECRET, { expiresIn: "1d" });
  return token;
};


module.exports = { createToken };
