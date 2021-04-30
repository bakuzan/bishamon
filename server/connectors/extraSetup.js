module.exports = function applyExtraSetup(db) {
  const {
    project: ProjectModel,
    workItem: WorkItemModel,
    task: TaskModel,
    technology: TechModel
  } = db.models;

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
};
