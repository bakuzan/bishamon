const { WorkType, Status, AuditWorkItem } = require('../constants/enums');
const { afterCreate, afterUpdate } = require('../hooks');

module.exports = (db, Types) => {
  return db.define(
    'workItem',
    {
      name: { type: Types.STRING },
      description: { type: Types.STRING },
      type: {
        type: Types.ENUM,
        values: [...WorkType]
      },
      status: {
        type: Types.ENUM,
        values: [...Status]
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
