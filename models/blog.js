const Sequelize = require("sequelize");

const sequelize = require("../data/database");

const Blog = sequelize.define("Blog", {
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
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type:Sequelize.STRING,
    allowNull:false
  },
});

module.exports = Blog;