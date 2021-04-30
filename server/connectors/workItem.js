const { DataTypes } = require('sequelize');

const { WorkType, Status, AuditWorkItem } = require('../constants/enums');
const { afterCreate, afterUpdate } = require('../hooks');

module.exports = (db) => {
  return db.define(
    'workItem',
    {
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      type: {
        type: DataTypes.ENUM,
        values: [...WorkType]
      },
      status: {
        type: DataTypes.ENUM,
        values: [...Status]
      },
      cause: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      }
    },
    {
      hooks: {
        afterCreate: afterCreate(AuditWorkItem),
        afterUpdate: afterUpdate(AuditWorkItem)
      }
    }
  );
};
