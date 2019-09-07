const { Note } = require('../../connectors');

module.exports = {
  noteCreate(_, args) {
    console.log('create');
    return Note.create({ ...args });
  },
  noteUpdate(_, { id, ...args }) {
    return Note.update({ ...args }, { where: { id } }).then((note) =>
      note.reload()
    );
  },
  noteRemove(_, { id }) {
    Note.destroy({
      where: { id }
    })
      .then(() => ({ success: true, errorMessage: '' }))
      .catch((error) => {
        const errorMessage =
          (error && error.message) || 'Failed to remove note.';

        return { success: false, errorMessage };
      });
  }
};
