const Query = `
  type Query {
    projects: [Project]
    project(id: Int): Project
    workItems(projectId: Int, status: Status): [WorkItem]
    workItem(id: Int): WorkItem
    tasks(workItemId: Int, status: Status): [Task]
  }
`;

const Mutation = `
  type Mutation {
    projectCreate(name: String!, type: ProjectType, colours: [String]): Project
    workItemCreate(projectId: Int!, name: String!, description: String, type: WorkType): WorkItem
    workItemUpdate(id: Int!, name: String, description: String, type: WorkType, status: Status): WorkItem
    taskCreate(workItemId: Int!, name: String!, description: String): Task
  }
`;

module.exports = [Query, Mutation];
