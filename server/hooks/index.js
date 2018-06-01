const { Audit } = require('../connectors/audit/index');
const { AuditWorkItem } = require('../constants/enums');

function mapToAudit(fieldName, newData, oldData = {}) {
  return {
    itemId: newData.id,
    type: AuditWorkItem,
    fieldName: fieldName,
    oldValue: oldData[fieldName] || '',
    newValue: newData[fieldName] || ''
  };
}

const afterCreate = (instance, options) => {
  const { dataValues } = instance;
  Audit.bulkCreate([
    mapToAudit('type', dataValues),
    mapToAudit('status', dataValues)
  ]);
};

const afterUpdate = (instance, options) => {
  const { dataValues, _previousDataValues, _changed } = instance;
  const updateChanges = [];
  if (_changed.type) {
    updateChanges.concat([mapToAudit('type', dataValues, _previousDataValues)]);
  }
  if (_changed.status) {
    updateChanges.concat([
      mapToAudit('status', dataValues, _previousDataValues)
    ]);
  }
  Audit.bulkCreate(updateChanges);
  return instance;
};
