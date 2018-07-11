import gql from 'graphql-tag';

import { SwimlaneStatus, ItemStatus } from 'constants/status';

function mapStatuses() {
  return SwimlaneStatus.concat([ItemStatus.OnHold]).join(',');
}

export const projectWorkItems = gql`
  query projectWorkItems($projectId: Int) {
    workItems(projectId: $projectId, statusIn: [${mapStatuses()}]) {
      id
      name
      description
      type
      status
      taskRatio
    }
    workItemsHistoric(projectId: $projectId) {
      id
      name
      description
      type
      status
      taskRatio
    }
  }
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
      id
      name
      description
      type
      status
      cause
    }
  }
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
