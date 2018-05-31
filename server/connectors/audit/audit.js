const { AuditType } = require('../../constants/enums');

module.exports = (db, Types) => {
  return db.define('audit', {
    itemId: { type: Types.DOUBLE },
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
