import gql from 'graphql-tag';

import { SwimlaneStatus } from 'constants/status';

function mapStatuses() {
  return SwimlaneStatus.join(',');
}

const fields = gql`
  fragment WorkItemFields on WorkItem {
    id
    name
    description
    type
    status
    projectId
  }
`;

export const projectWorkItems = gql`
  query projectWorkItems($projectId: Int) {
    workItems(projectId: $projectId, statusIn: [${mapStatuses()}]) {
      ...WorkItemFields
      taskRatio
    }
    workItemsOnHoldCount(projectId: $projectId)
    workItemsHistoricCount(projectId: $projectId)
  }
  ${fields}
`;

export const projectWorkItemsOnHold = gql`
  query projectWorkItemsOnHold($projectId: Int) {
    workItemsOnHold(projectId: $projectId) {
      ...WorkItemFields
      taskRatio
    }
  }
  ${fields}
`;

export const projectWorkItemsHistoric = gql`
  query projectWorkItemsHistoric($projectId: Int) {
    workItemsHistoric(projectId: $projectId) {
      ...WorkItemFields
    }
  }
  ${fields}
`;

export const projectWorkItemInformation = gql`
  query projectWorkItemInformation($projectId: Int, $workItemId: Int!) {
    project(id: $projectId) {
      id
      name
      primaryColour
      workItem(workItemId: $workItemId) {
        id
        name
        type
        status
      }
    }
  }
`;

export const workItemById = gql`
  query workItemById($id: Int) {
    workItem(id: $id) {
      ...WorkItemFields
      cause
    }
  }
  ${fields}
`;

export const workItemRefreshOnTaskMutation = gql`
  query workItemRefreshOnTaskMutation($id: Int) {
    workItem(id: $id) {
      id
      status
      taskRatio
    }
  }
`;
