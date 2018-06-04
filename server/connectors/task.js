const { Status, AuditTask } = require('../constants/enums');
const { afterCreate, afterUpdate } = require('../hooks');

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
        afterCreate: afterCreate(AuditTask),
        afterUpdate: afterUpdate(AuditTask)
      }
    }
  );
};
