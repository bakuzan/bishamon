const {ProjectType} = require('../constants/enums');

module.exports = (db, Types) => {
  return db.define('project', {
    name: { type: Types.STRING },
    type: {
      type: Types.ENUM,
      values: [...ProjectType]
    },
    colours: {
      type: Types.STRING,
      get() {
        const colours = this.getDataValue('colours');
        return colours
          ? colours.split(",")
          : [];
      },
      set(value) {
        this.setDataValue('colours', value.join(","));
      }
    }
  });
}
