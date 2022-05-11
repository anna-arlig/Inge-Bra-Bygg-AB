const { Model, DataTypes } = require("sequelize");
const { UserNotFound, InvalidCredentials } = require("../errors");
const sequelize = require("../database/connection");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

class Admin extends Model {
  static async register(user) {
    const { name, password, email } = user;
    try {
      const user = await User.create({ email, password, name });
      return user;
    } catch (error) {
      throw new Error("Can't register user :(" + error);
    }
  }
  static async authenticate(email, password) {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      throw new UserNotFound();
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new InvalidCredentials();
    }

    return user;
  }
  static async deleteAccount(email, password) {}
  async updateCredentials(email, password) {}
}

Admin.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: true },
    street: { type: DataTypes.STRING, allowNull: true },
    zipCode: { type: DataTypes.STRING, allowNull: true },
    imgPath: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "Admin",
    hooks: {
      beforeCreate(instance, options) {
        if (instance.password) {
          instance.password = bcrypt.hashSync(instance.password);
        }
      },
    },
  }
);

module.exports = Admin;
