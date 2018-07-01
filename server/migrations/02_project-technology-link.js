module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectTechnology', {
      projectId: {
        type: Sequelize.UUID,
        references: {
          model: 'Project',
          key: 'id'
        }
      },
      technologyId: {
        type: Sequelize.UUID,
        references: {
          model: 'Technology',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProjectTechnology');
  }
};
