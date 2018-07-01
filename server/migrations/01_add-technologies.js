module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Technology', {
      name: {
        type: Sequelize.STRING,
        unique: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Technology');
  }
};
