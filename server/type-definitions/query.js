

module.exports = `
  type Query {
    projects: [Project],
    project(id: Int): Project
  }
`;