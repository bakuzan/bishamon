module.exports = `
  type RemoveResponse {
    success: Boolean
    errorMessage: String
  }

  type Dashboard {
    dashboardCurrentWork: [WorkItem]
  }
`;
