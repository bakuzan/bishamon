const Sequelize = require('sequelize');

const Constants = require('../constants');

const db = new Sequelize(Constants.appName, null, null, {
  dialect: 'sqlite',
  storage: `./${Constants.appName}.${process.env.NODE_ENV}.sqlite`,
});

const ProjectModel = db.import('./project');
const WorkItemModel = db.import('./work-item');

// Create relationships
ProjectModel.hasMany(WorkItemModel);
WorkItemModel.belongsTo(ProjectModel);


const Project = db.models.project;
const WorkItem = db.models.workItem;

module.exports = { Project, WorkItem };
