module.exports = `
  type WorkItem {
    id: Int
    name: String
    description: String
    type: WorkType
    status: Status
    cause: String
    tasks: [Task]
    taskRatio: String
  }
`;
