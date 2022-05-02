const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String,
      required: false,
    },
    address: {
      city: { type: String },
      street: { type: String },
      zipCode: { type: String },
    },
    tasksInProgress: { type: Array, default: [] },
    role: {
      type: String,
      enum: ["admin", "worker", "client"],
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
// UserSchema.methods.validatePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

module.exports = mongoose.model("User", UserSchema);
