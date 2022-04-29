const mongoose = require("mongoose");
const { MONGODB_URL } = require("../config");

module.exports = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("connected with monogdb");
  } catch (error) {
    console.log("error connecting with monogdb: ", error);
  }
};
