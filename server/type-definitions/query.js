const Query = `
  type Query {
    projects(sorting: ProjectSorting): [Project]
    project(id: Int): Project
    workItems(projectId: Int, status: Status, statusIn: [Status]): [WorkItem]
    workItemsOnHoldCount(projectId: Int): Int
    workItemsOnHold(projectId: Int): [WorkItem]
    workItemsHistoricCount(projectId: Int): Int
    workItemsHistoric(projectId: Int): [WorkItem]
    workItem(id: Int): WorkItem
    tasks(workItemId: Int, status: Status, statusIn: [Status]): [Task]
    tasksOnHoldCount(workItemId: Int): Int
    tasksOnHold(workItemId: Int): [Task]
    tasksHistoricCount(workItemId: Int): Int
    tasksHistoric(workItemId: Int): [Task]
    task(id: Int): Task
    technologies(sort: TechnologySortType): [Technology]
    notes: [Note]
    note(id: Int!): Note

    dashboard: Dashboard

    audits(itemId: Int, type: AuditType): [Audit]
  }
`;

const Mutation = `
  type Mutation {
    projectCreate(name: String!, type: ProjectType, colours: [String], technologies: [TechnologyInput]): Project
    projectUpdate(id: Int!, name: String, type: ProjectType, colours: [String], technologies: [TechnologyInput], isActive: Boolean): Project

    workItemCreate(projectId: Int!, name: String!, description: String, type: WorkType, cause: String): WorkItem
    workItemUpdate(id: Int!, name: String, description: String, type: WorkType, status: Status, cause: String, projectId:Int): WorkItem

    taskCreate(workItemId: Int!, name: String!, description: String): Task
    taskUpdate(id: Int!, name: String, description: String, status: Status): Task

    technologyCreate(name: String!): Technology
    technologyRemove(id: Int): RemoveResponse

    noteCreate(text: String!): Note
    noteUpdate(id: Int!, text: String!): Note
    noteRemove(id: Int): RemoveResponse
  }
`;

module.exports = [Query, Mutation];
