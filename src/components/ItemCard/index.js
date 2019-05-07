import React from 'react';

import ItemCard from './ItemCard';
import Mutate from 'queries/mutate';
import { ItemStatus } from 'constants/status';
import {
  buildUrlWithIds,
  workItemBoardUrl,
  taskBoardUrl
} from 'constants/routes';
import {
  mapWorkItemViewToOptimisticResponse,
  mapTaskViewToOptimisticResponse
} from 'utils/mappers';
import { workItemUpdater, taskUpdater } from './ItemCardUpdaters';

const status = ItemStatus.InProgress;

function CustomItemCardWrappers({
  mutation,
  update,
  optimisticResponseMapper,
  ...props
}) {
  const optimisticResponse = optimisticResponseMapper({
    ...props.data,
    status
  });
  const updateVariables = {
    id: props.data.id,
    status
  };
  const mutationProps = {
    mutation,
    update,
    variables: updateVariables,
    optimisticResponse
  };

  return <ItemCard {...props} mutationProps={mutationProps} />;
}

export const WorkItemCard = (props) => (
  <CustomItemCardWrappers
    {...props}
    mutation={Mutate.workItemStatusUpdate}
    update={workItemUpdater}
    optimisticResponseMapper={mapWorkItemViewToOptimisticResponse}
    projectLinkBuilder={(data) =>
      buildUrlWithIds(workItemBoardUrl, {
        projectId: data.projectId
      })
    }
    entryLinkBuilder={(data) =>
      buildUrlWithIds(taskBoardUrl, {
        projectId: data.projectId,
        workItemId: data.id
      })
    }
  />
);

export const TaskCard = (props) => (
  <CustomItemCardWrappers
    {...props}
    mutation={Mutate.taskStatusUpdate}
    update={taskUpdater}
    optimisticResponseMapper={mapTaskViewToOptimisticResponse}
  />
);
