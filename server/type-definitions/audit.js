module.exports = `
  type Audit {
    id: Int
    itemId: Int
    type: AuditType
    fieldName: String
    oldValue: String
    newValue: String
    updatedAt: String
  }
`;
