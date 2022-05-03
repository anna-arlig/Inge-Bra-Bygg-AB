const User = require("../models/User");
const Token = require("../utils/token");
const {
  UserNotFound,
  Unauthorized,
  TokenExpired,
  InvalidCredentials,
} = require("../errors");
module.exports = {
  auth: async (req, res, next) => {
    try {
      console.log("body info: ", req.body);
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new UserNotFound();
      }
      console.log("user from database: ", user);
      const isMatch = await user.validatePassword(password);
      console.log("isMatch value form user method validatepassword; ", isMatch);
      if (isMatch) {
        const token = Token.createToken(user.email, user.name, user.role);
        res.json({ token });
      } else {
        throw new InvalidCredentials();
      }
    } catch (error) {
      //   res.status(403).json({ error: "Login failed" });
      next(error);
    }
  },

  createUser: async (req, res) => {
    const { email, name, password, role } = req.body;
    const { zipCode, street, city } = req.body.address;
    const user = await User.create({
      email,
      name,
      password,
      role,
      address: { zipCode, street, city },
    });
    res.json({
      message: "User created!",
      user: {
        id: user.id,
        email,
        name,
        role,
        address: { city, street, zipCode },
      },
    });
  },

  getById: async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
  },

  me: async (req, res) => {
    const { email } = req.user;
    const user = await User.findOne({ email });
    console.log(user);
    // delete user.password;
    res.json({ ...user._doc, password: null });
  },

  all: async (req, res) => {
    const users = await User.find({});
    res.json({ users });
  },

  update: async (req, res) => {
    const { city, street, zipCode } = req.body;
    await User.updateOne(
      { _id: req.params.id },
      { address: { city, street, zipCode } }
    );
    res.json({ message: "User updated" });
  },

  delete: async (req, res) => {
    const user = await User.findById(req.params.id);
    await user.delete({ _id: user._id });
    res.json({ message: "User deleted" });
  },
};
