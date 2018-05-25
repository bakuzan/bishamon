const Query = `
  type Query {
    projects: [Project]
    project(id: Int): Project
    workItems(projectId: Int, status: Status): [WorkItem]
  }
`;

const Mutation = `
  type Mutation {
    projectCreate(name: String!, type: ProjectType, colours: [String]): Project
    workItemCreate(projectId: Int!, name: String!, description: String, type: WorkType): WorkItem
  }
`;

module.exports = [Query, Mutation];
