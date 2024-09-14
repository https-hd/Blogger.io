const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blogger.io', 'root', 'hooda786', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  port: 3305,
});


module.exports = { sequelize };

