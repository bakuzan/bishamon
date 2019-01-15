const { Technology } = require('../../connectors');

module.exports = {
  technologyCreate(_, args) {
    return Technology.create({ ...args });
  },
  technologyRemove(_, { id }) {
    return Technology.destroy({
      where: { id }
    })
      .then(() => ({ success: true, errorMessage: '' }))
      .catch((error) => {
        const errorMessage =
          (error && error.message) || 'Failed to remove technology.';
        return { success: false, errorMessage };
      });
  }
};
