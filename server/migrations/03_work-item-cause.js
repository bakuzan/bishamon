const TABLE = 'workItems';
const COLUMN = 'cause';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(TABLE, COLUMN, {
      type: Sequelize.STRING,
      allowNull: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(TABLE, COLUMN);
  }
};
