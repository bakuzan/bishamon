module.exports = (db, Types) => {
  return db.define('note', {
    text: { type: Types.STRING }
  });
};
