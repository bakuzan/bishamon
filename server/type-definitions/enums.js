const {
  mapArrToGraphqlString,
  ProjectType,
  WorkType,
  Status
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

module.exports = [
  ProjectTypeGQL,
  WorkTypeGQL,
  StatusGQL
]
