const { ItemStatus } = require('../constants/enums');

const IgnoreStatuses = [
  ItemStatus.Todo,
  ItemStatus.InProgress,
  ItemStatus.OnHold
];

module.exports = (db, instance, options) => {
  const {
    _modelOptions: { whereCollection }
  } = instance;
  const { workItemId } = whereCollection;

  db.models.workItem.findById(workItemId).then(workItem => {
    if (IgnoreStatuses.includes(workItem.status)) return;

    db.models.workItem.update(
      { status: ItemStatus.InProgress },
      {
        where: { id: workItemId },
        individualHooks: true,
        transaction: options.transaction
      }
    );
  });

  return instance;
};
