module.exports = `
  type Project {
    id: Int
    name: String
    type: ProjectType
    colours(limit: Int): [String]
    primaryColour: String
    isActive: Boolean
    workItems: [WorkItem]
    workItem(workItemId: Int!): WorkItem
    workItemRatio: String
    technologies: [Technology]
    createdAt: String
    updatedAt: String
  }

  enum ProjectSort {
    Name
    CreatedAt
  }

  input ProjectSorting {
    field: ProjectSort!
    direction: SortDirection!
  }
`;
