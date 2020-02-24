const { Sequelize, sequelize } = require("../db");

const Device = sequelize.define("Device", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  hostname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  ipAddress: {
    type: Sequelize.STRING,
    validate: {
      isIPv4: true
    },
    allowNull: false
  },
  model: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "n/a"
  },
  reachability: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Device;
