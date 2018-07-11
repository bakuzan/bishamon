import React from 'react';

import ItemCard from './ItemCard';
import Mutate from 'queries/mutate';
import { ItemStatus } from 'constants/status';
import {
  mapWorkItemViewToOptimisticResponse,
  mapTaskViewToOptimisticResponse
} from 'utils/mappers';

const status = ItemStatus.InProgress;

function CustomItemCardWrappers({
  mutation,
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
    variables: updateVariables,
    optimisticResponse
  };

  return <ItemCard {...props} mutationProps={mutationProps} />;
}

export const WorkItemCard = (props) => (
  <CustomItemCardWrappers
    {...props}
    mutation={Mutate.workItemStatusUpdate}
    optimisticResponseMapper={mapWorkItemViewToOptimisticResponse}
  />
);

export const TaskCard = (props) => (
  <CustomItemCardWrappers
    {...props}
    mutation={Mutate.taskStatusUpdate}
    optimisticResponseMapper={mapTaskViewToOptimisticResponse}
  />
);
