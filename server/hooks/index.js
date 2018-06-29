const { Audit } = require('../connectors/audit/index');
const { AuditWorkItem } = require('../constants/enums');

function mapToAudit(type, fieldName, newData, oldData = {}) {
  return {
    itemId: newData.id,
    type,
    fieldName,
    oldValue: oldData[fieldName] || '',
    newValue: newData[fieldName] || ''
  };
}

const afterCreate = (auditType) => (instance, options) => {
  const { dataValues } = instance;
  const createChanges = [mapToAudit(auditType, 'status', dataValues)];
  if (auditType === AuditWorkItem) {
    createChanges.push(mapToAudit(auditType, 'type', dataValues));
  }
  Audit.bulkCreate(createChanges);
  return instance;
};

const afterUpdate = (auditType) => (instance, options) => {
  const { dataValues, _previousDataValues, _changed } = instance;
  const updateChanges = [];
  if (_changed.type) {
    updateChanges.push(
      mapToAudit(auditType, 'type', dataValues, _previousDataValues)
    );
  }
  if (_changed.status) {
    updateChanges.push(
      mapToAudit(auditType, 'status', dataValues, _previousDataValues)
    );
  }
  if (updateChanges.length) {
    Audit.bulkCreate(updateChanges).then((audits) =>
      console.log(`Created ${updateChanges.length} new audit(s)`, dataValues)
    );
  }
  return instance;
};

module.exports = {
  afterCreate,
  afterUpdate
};
