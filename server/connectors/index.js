const Sequelize = require('sequelize');

const Constants = require('../constants/index');
const migrate = require('../config');
const SQL = require('../db-scripts');

const extraSetup = require('./extraSetup');

const db = new Sequelize(Constants.appName, null, null, {
  dialect: 'sqlite',
  storage: `${process.env.DB_STORAGE_PATH}${Constants.appName}.${process.env.NODE_ENV}.sqlite`
});

const modelDefiners = [
  require('./project'),
  require('./workItem'),
  require('./task'),
  require('./technology'),
  require('./note')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(db);
}

// Other db setup...
extraSetup(db);

// Sync to create db if not exist
// then run migration scripts
db.sync()
  .then(() => migrate(db))
  .then(async () => await db.query(SQL['remove_unused_technologies']));

const Project = db.models.project;
const WorkItem = db.models.workItem;
const Task = db.models.task;
const Technology = db.models.technology;
const Note = db.models.note;

module.exports = { db, Project, WorkItem, Task, Technology, Note };
