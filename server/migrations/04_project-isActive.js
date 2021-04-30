const TABLE = 'projects';
const COLUMN = 'isActive';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(TABLE, COLUMN, {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(TABLE, COLUMN);
  }
};
