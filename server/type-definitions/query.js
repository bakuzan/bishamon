

module.exports = `
  type Query {
    projects: [Project],
    project(id: Int): Project
  }

  type Mutation {
    projectCreate(name: String!): Project
  }
`;
