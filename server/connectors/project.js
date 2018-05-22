
module.exports = (db, Types) => {
  return db.define('project', {
    name: { type: Types.STRING }
  });
}
