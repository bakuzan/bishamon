const { DataTypes } = require('sequelize');

module.exports = (db) => {
  return db.define('note', {
    text: { type: DataTypes.STRING }
  });
};
