import gql from 'graphql-tag';

import { SwimlaneStatus } from 'constants/status';

import { workItemFields } from '../fragment/workItem';

function mapStatuses() {
  return SwimlaneStatus.join(',');
}

export const projectWorkItems = gql`
  query projectWorkItems($projectId: Int) {
    workItems(projectId: $projectId, statusIn: [${mapStatuses()}]) {
      ...WorkItemFields
      taskRatio
    }
    workItemsOnHoldCount(projectId: $projectId)
    workItemsHistoricCount(projectId: $projectId)
  }
  ${workItemFields}
`;

export const projectWorkItemsOnHold = gql`
  query projectWorkItemsOnHold($projectId: Int) {
    workItemsOnHold(projectId: $projectId) {
      ...WorkItemFields
      taskRatio
    }
  }
  ${workItemFields}
`;

export const projectWorkItemsHistoric = gql`
  query projectWorkItemsHistoric($projectId: Int) {
    workItemsHistoric(projectId: $projectId) {
      ...WorkItemFields
    }
  }
  ${workItemFields}
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
  ${workItemFields}
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
