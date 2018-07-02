import Strings from 'constants/strings';
import { generateUniqueId, separateAndCapitaliseAll } from './common';

export const enumsToSelectBoxOptions = (arr) =>
  arr.map((value) => ({ value, text: separateAndCapitaliseAll(value) }));

export const removeTypename = ({ __typename, ...o }) => o;

export const projectColourModel = (code) => ({
  id: generateUniqueId(),
  code
});

export const projectTechnologyModel = ({ __typename, ...tech }) => ({
  ...tech
});

const mapOptimisticResponse = (obj) => {
  return {
    __typename: 'Mutation',
    ...obj
  };
};

export const mapProjectViewToOptimisticResponse = ({
  technologies, // dont update these in the store manually
  ...values
}) => {
  return mapOptimisticResponse({
    projectUpdate: {
      __typename: 'Project',
      ...values,
      primaryColour: values.colours[0] || Strings.defaultColour
    }
  });
};

export const mapWorkItemViewToOptimisticResponse = (values) => {
  return mapOptimisticResponse({
    workItemUpdate: {
      __typename: 'WorkItem',
      ...values
    }
  });
};

export const mapTaskViewToOptimisticResponse = (values) => {
  return mapOptimisticResponse({
    taskUpdate: {
      __typename: 'Task',
      ...values
    }
  });
};

export const mapTechnologyToOptimisticResponse = (values) => {
  return mapOptimisticResponse({
    technologyCreate: {
      __typename: 'Technology',
      ...values
    }
  });
};
