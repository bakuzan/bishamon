const { Audit } = require('../connectors/audit/index');
const { AuditWorkItem } = require('../constants/enums');

function mapToAudit(fieldName, newData, oldData = {}) {
  return {
    itemId: newData.id,
    type: AuditWorkItem,
    fieldName,
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
  return instance;
};

const afterUpdate = (instance, options) => {
  const { dataValues, _previousDataValues, _changed } = instance;
  const updateChanges = [];
  if (_changed.type) {
    updateChanges.push(mapToAudit('type', dataValues, _previousDataValues));
  }
  if (_changed.status) {
    updateChanges.push(mapToAudit('status', dataValues, _previousDataValues));
  }
  if (updateChanges.length) {
    Audit.bulkCreate(updateChanges).then(audits =>
      console.log(`Created ${updateChanges.length} new audit(s)`)
    );
  }
  return instance;
};

module.exports = {
  afterCreate,
  afterUpdate
};
