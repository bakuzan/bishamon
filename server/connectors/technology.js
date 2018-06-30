module.exports = (db, Types) => {
  return db.define('technology', {
    name: {
      type: Types.STRING,
      unique: true,
      allowNull: false
    }
  });
};
