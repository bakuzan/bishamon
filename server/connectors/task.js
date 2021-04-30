const { DataTypes } = require('sequelize');

const { Status, AuditTask } = require('../constants/enums');
const { afterCreate, afterUpdate } = require('../hooks');

const afterCreateAudit = afterCreate(AuditTask);
const afterUpdateAudit = afterUpdate(AuditTask);

module.exports = (db) => {
  return db.define(
    'task',
    {
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      status: {
        type: DataTypes.ENUM,
        values: [...Status]
      }
    },
    {
      hooks: {
        afterCreate: afterCreateAudit,
        afterUpdate: afterUpdateAudit
      }
    }
  );
};
