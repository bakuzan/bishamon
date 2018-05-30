const Sequelize = require('sequelize');

const Constants = require('../../constants/index');

const db = new Sequelize(`${Constants.appName}`, null, null, {
  dialect: 'sqlite',
  storage: `${process.env.DB_STORAGE_PATH}${Constants.appName}.${
    process.env.NODE_ENV
  }.audit.sqlite`,
  operatorsAliases: false
});

db.import('./audit');

// Creates things that don't exist yet.
db.sync();

const Audit = db.models.audit;

module.exports = { Audit };
