module.exports = `
  type WorkItem {
    id: Int
    name: String
    description: String
    type: WorkType
    status: Status
    tasks: [Task]
    taskRatio: String
  }
`;
