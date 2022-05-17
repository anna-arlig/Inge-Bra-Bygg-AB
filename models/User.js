const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
class User extends Model {
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
User.init(
  {
    _id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: true },
    street: { type: DataTypes.STRING, allowNull: true },
    zipCode: { type: DataTypes.STRING, allowNull: true },
    imgPath: { type: DataTypes.STRING, allowNull: true },
    role: {
      type: DataTypes.ENUM,
      values: ["client", "admin", "worker", "project-leader"],
      defaultValue: "client",
      allowNull: false,
    },
    countryCode: { type: DataTypes.INTEGER, allowNull: true },
    mobile: { type: DataTypes.INTEGER, allowNull: true },
    workPhone: { type: DataTypes.INTEGER, allowNull: true },
    contactPreference: {
      type: DataTypes.ENUM,
      values: ["sms", "email", "call"],
    },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate(instance, options) {
        if (instance.password) {
          instance.password = bcrypt.hashSync(instance.password);
        }
      },
    },
  }
);

module.exports = User;
