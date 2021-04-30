const { DataTypes } = require('sequelize');

const { AuditType } = require('../../constants/enums');

module.exports = (db) => {
  return db.define('audit', {
    itemId: { type: DataTypes.DOUBLE },
    type: {
      type: DataTypes.ENUM,
      values: [...AuditType]
    },
    fieldName: {
      type: DataTypes.STRING
    },
    oldValue: {
      type: DataTypes.STRING
    },
    newValue: {
      type: DataTypes.STRING
    }
  });
};
