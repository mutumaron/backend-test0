const Sequelize = require("sequelize");

const sequelize = require("../data/database");

const Deal = sequelize.define("Deal", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type:Sequelize.STRING,
    allowNull:false
  },
  image: {
    type:Sequelize.STRING,
    allowNull:false
  },

});

module.exports = Deal;