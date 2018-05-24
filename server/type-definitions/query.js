
const Query = `
  type Query {
    projects: [Project]
    project(id: Int): Project
  }
`;

const Mutation = `
  type Mutation {
    projectCreate(name: String!, type: ProjectType, colours: [String]): Project
  }
`;

module.exports = [
  Query,
  Mutation
]
