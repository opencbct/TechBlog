const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection.js');
const bcrypt = require('bcrypt');

class User extends Model {
  validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'user', freezeTableName: true, timestamps: false }
);

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10).catch((err) => {
    console.error(err);
  });
  user.password = hashedPassword;
});

module.exports = User;
