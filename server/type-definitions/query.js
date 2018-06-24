const Query = `
  type Query {
    projects: [Project]
    project(id: Int): Project
    workItems(projectId: Int, status: Status, statusIn: [Status]): [WorkItem]
    workItemsHistoric(projectId: Int): [WorkItem]
    workItem(id: Int): WorkItem
    tasks(workItemId: Int, status: Status): [Task]
    tasksHistoric(workItemId: Int): [Task]
    task(id: Int): Task

    audits(itemId: Int, type: AuditType): [Audit]
  }
`;

const Mutation = `
  type Mutation {
    projectCreate(name: String!, type: ProjectType, colours: [String]): Project
    projectUpdate(id: Int!, name: String, type: ProjectType, colours: [String]): Project

    workItemCreate(projectId: Int!, name: String!, description: String, type: WorkType): WorkItem
    workItemUpdate(id: Int!, name: String, description: String, type: WorkType, status: Status): WorkItem

    taskCreate(workItemId: Int!, name: String!, description: String): Task
    taskUpdate(id: Int!, name: String, description: String, status: Status): Task
  }
`;

module.exports = [Query, Mutation];
