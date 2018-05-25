module.exports = `
  type Project {
    id: Int
    name: String
    type: ProjectType
    colours(limit: Int): [String]
    primaryColour: String
    workItems: [WorkItem]
  }
`;
