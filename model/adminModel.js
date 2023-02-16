const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnect');

// 定义数据模型
module.exports = sequelize.define(
  'user',
  {
    username: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
