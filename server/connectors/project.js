const { DataTypes } = require('sequelize');

const { ProjectType } = require('../constants/enums');

module.exports = (db) => {
  return db.define('project', {
    name: { type: DataTypes.STRING },
    type: {
      type: DataTypes.ENUM,
      values: [...ProjectType]
    },
    colours: {
      type: DataTypes.STRING,
      get() {
        const colours = this.getDataValue('colours');
        return colours ? colours.split(',') : [];
      },
      set(value) {
        this.setDataValue('colours', value.join(','));
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
