const {
  mapArrToGraphqlString,
  ProjectType,
  WorkType,
  Status,
  AuditType
} = require('../constants/enums');

const ProjectTypeGQL = `
  enum ProjectType {
    ${mapArrToGraphqlString(ProjectType)}
  }
`;

const WorkTypeGQL = `
  enum WorkType {
    ${mapArrToGraphqlString(WorkType)}
  }
`;

const StatusGQL = `
  enum Status {
    ${mapArrToGraphqlString(Status)}
  }
`;

const AuditTypeGQL = `
  enum AuditType {
    ${mapArrToGraphqlString(AuditType)}
  }
`;

module.exports = [ProjectTypeGQL, WorkTypeGQL, StatusGQL, AuditTypeGQL];
