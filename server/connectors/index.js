const Sequelize = require('sequelize');
const casual = require('casual');

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

// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
  Array(10).fill(null).forEach(() => {
    return ProjectModel.create({
      name: casual.first_name,
    }).then((project) => {
      return project.createWorkItem({
        name: `Some task for ${project.name}`,
        description: casual.sentences(3),
      });
    });
  });
});

const Project = db.models.project;
const WorkItem = db.models.workItem;

module.exports = { Project, WorkItem };
