const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../data/database");

const Odu = sequelize.define("odu", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user: {
    type: DataTypes.TEXT, // Use TEXT instead of JSON
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("user");
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
      this.setDataValue("user", JSON.stringify(value));
    },
  },
  orderedItems: {
    type: DataTypes.TEXT, // Use TEXT instead of JSON
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("orderedItems");
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
      this.setDataValue("orderedItems", JSON.stringify(value));
    },
  },
});

module.exports = Odu;
