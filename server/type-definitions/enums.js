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

const TechnologySortTypeGQL = `
  enum TechnologySortType {
    NAME_ASC
    NAME_DESC
  }
`;

const AuditTypeGQL = `
  enum AuditType {
    ${mapArrToGraphqlString(AuditType)}
  }
`;

module.exports = [
  ProjectTypeGQL,
  WorkTypeGQL,
  StatusGQL,
  TechnologySortTypeGQL,
  AuditTypeGQL,
  `
  enum SortDirection {
    ASC
    DESC
  }
  `
];
