const Sequelize = require('sequelize');

const Constants = require("../constants/index");

const db = new Sequelize(Constants.appName, null, null, {
  dialect: 'sqlite',
  storage: `./${Constants.appName}.${process.env.NODE_ENV}.sqlite`,
  operatorsAliases: false,
});

const ProjectModel = db.import('./project');
const WorkItemModel = db.import('./work-item');
const TaskModel = db.import('./task');

// Create relationships
ProjectModel.hasMany(WorkItemModel);
WorkItemModel.belongsTo(ProjectModel);

WorkItemModel.hasMany(TaskModel);
TaskModel.belongsTo(WorkItemModel);

// Creates things that don't exist yet.
db.sync();

const Project = db.models.project;
const WorkItem = db.models.workItem;
const Task = db.models.task;

module.exports = { Project, WorkItem, Task };
