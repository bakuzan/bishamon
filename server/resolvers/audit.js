const Utils = require('../utils');

module.exports = {
  updatedAt(audit) {
    return Utils.formatDateISO(audit.updatedAt);
  }
};
