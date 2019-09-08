const { Note } = require('../../connectors');

module.exports = {
  notes() {
    return Note.findAll({ order: [['createdAt', 'ASC']] });
  },
  note(_, args) {
    const { id } = args;
    return Note.findByPk(id);
  }
};
