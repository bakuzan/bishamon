const { Audit } = require('./audit/index');
const { WorkType, Status, AuditWorkItem } = require('../constants/enums');

module.exports = (db, Types) => {
  const WorkItem = db.define('workItem', {
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
  });

  WorkItem.hook('beforeUpdate', (instance, options) => {
    console.log(options, instance);
    return instance;
  });

  WorkItem.hook('afterUpdate', (instance, options) => {
    console.log(options, instance);
    Audit.bulkCreate([
      {
        itemId: instance.id,
        type: AuditWorkItem,
        fieldName: 'type',
        oldValue: instance.type,
        newValue: ''
      },
      {
        itemId: instance.id,
        type: AuditWorkItem,
        fieldName: 'status',
        oldValue: instance.status,
        newValue: ''
      }
    ]);
    return instance;
  });

  return WorkItem;
};
