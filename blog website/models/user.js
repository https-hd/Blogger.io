const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');



const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

User.sync().then(() => {
  console.log('User table created successfully.');
}).catch((error) => {
  console.error('Error creating user table:', error);
});

module.exports = { User };
