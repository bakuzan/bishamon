const Sequelize = require('sequelize');

const Constants = require('../constants/index');
const migrate = require('../config');
const SQL = require('../db-scripts');

const db = new Sequelize(Constants.appName, null, null, {
  dialect: 'sqlite',
  storage: `${process.env.DB_STORAGE_PATH}${Constants.appName}.${
    process.env.NODE_ENV
  }.sqlite`,
  operatorsAliases: false
});

const ProjectModel = db.import('./project');
const WorkItemModel = db.import('./work-item');
const TaskModel = db.import('./task');

const TechModel = db.import('./technology');

// Create relationships
ProjectModel.hasMany(WorkItemModel);
WorkItemModel.belongsTo(ProjectModel);

ProjectModel.belongsToMany(TechModel, {
  through: 'ProjectTechnology'
});
TechModel.belongsToMany(ProjectModel, {
  through: 'ProjectTechnology'
});

WorkItemModel.hasMany(TaskModel);
TaskModel.belongsTo(WorkItemModel);

// Sync to create db if not exist
// then run migration scripts
db.sync()
  .then(() => migrate(db))
  .then(async () => await db.query(SQL['remove_unused_technologies']));

const Project = db.models.project;
const WorkItem = db.models.workItem;
const Task = db.models.task;
const Technology = db.models.technology;

module.exports = { db, Project, WorkItem, Task, Technology };
