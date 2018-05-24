const {WorkType, Status} = require('../constants/enums');

module.exports = (db, Types) => {
  return db.define('workItem', {
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
}
