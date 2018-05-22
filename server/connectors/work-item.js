
module.exports = (db, Types) => {
  return db.define('workItem', {
    name: { type: Types.STRING },
    description: { type: Types.STRING },
  });
}
