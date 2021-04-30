const { DataTypes } = require('sequelize');

module.exports = (db) => {
  return db.define('technology', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });
};
