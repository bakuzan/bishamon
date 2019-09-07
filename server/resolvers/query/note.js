const { Note } = require('../../connectors');

module.exports = {
  notes() {
    console.log('notes');
    return Note.findAll({ order: [['createdDate', 'DESC']] });
  },
  note(_, args) {
    const { id } = args;
    return Note.findByPk(id);
  }
};
