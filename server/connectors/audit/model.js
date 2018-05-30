const { AuditType } = require('../../constants/enums');

module.exports = (db, Types) => {
  return db.define('workItem', {
    itemId: { type: Types.Int },
    type: {
      type: Types.ENUM,
      values: [...AuditType]
    },
    fieldName: {
      type: Types.STRING
    },
    oldValue: {
      type: Types.STRING
    },
    newValue: {
      type: Types.STRING
    }
  });
};
