const { Status, AuditTask } = require('../constants/enums');
const { afterCreate, afterUpdate } = require('../hooks');
const afterCreateTask = require('../hooks/afterCreateTask');
const afterUpdateTask = require('../hooks/afterUpdateTask');

const afterCreateAudit = afterCreate(AuditTask);
const afterUpdateAudit = afterUpdate(AuditTask);

module.exports = (db, Types) => {
  return db.define(
    'task',
    {
      name: { type: Types.STRING },
      description: { type: Types.STRING },
      status: {
        type: Types.ENUM,
        values: [...Status]
      }
    },
    {
      hooks: {
        afterCreate: (...params) => {
          afterCreateAudit(...params);
          afterCreateTask(db, ...params);
        },
        afterUpdate: (...params) => {
          afterUpdateAudit(...params);
          afterUpdateTask(db, ...params);
        }
      }
    }
  );
};
