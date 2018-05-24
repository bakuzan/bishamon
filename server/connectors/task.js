const {Status} = require('../constants/enums');

module.exports = (db, Types) => {
  return db.define('task', {
    name: { type: Types.STRING },
    description: { type: Types.STRING },
    status: {
      type: Types.ENUM,
      values: [...Status]
    }
  });
}
