const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql3702828', 'sql3702828', 'l97dZsD8kg', {
    host: 'sql3.freesqldatabase.com',
    dialect: 'mysql',
    port: 3306
  });

module.exports = sequelize;