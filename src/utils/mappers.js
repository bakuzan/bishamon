import { generateUniqueId, separateAndCapitaliseAll } from 'meiko-lib';
import Strings from 'constants/strings';

export const enumArrayToObject = (arr) =>
  arr.reduce((p, c) => ({ ...p, [c]: c }), {});

export const enumsToSelectBoxOptions = (arr) =>
  arr.map((value) => ({ value, text: separateAndCapitaliseAll(value) }));

export const dataToTagCloudOptions = (arr = [], projects = []) =>
  arr.map((o, i, list) => {
    const projectsWithTech = projects.filter((x) =>
      x.technologies.some((x) => x.id === o.id)
    );
    const count = projectsWithTech.length;
    return {
      ...o,
      count
    };
  });

export const removeTypename = ({ __typename, ...o }) => ({ ...o });

export const projectColourModel = (code) => ({
  id: generateUniqueId(),
  code
});

export const projectTechnologyModel = ({ __typename, ...tech }) => ({
  ...tech
});

const mapOptimisticResponse = (key, __typename) => (obj) => {
  return {
    __typename: 'Mutation',
    [key]: {
      __typename,
      id: generateUniqueId(),
      ...obj
    }
  };
};

export const mapProjectViewToOptimisticResponse = (values) => {
  return mapOptimisticResponse('projectUpdate', 'Project')({
    ...values,
    primaryColour: values.colours[0] || Strings.defaultColour
  });
};

export const mapWorkItemViewToOptimisticResponse = mapOptimisticResponse(
  'workItemUpdate',
  'WorkItem'
);

export const mapTaskViewToOptimisticResponse = mapOptimisticResponse(
  'taskUpdate',
  'Task'
);

export const mapTechnologyToOptimisticResponse = mapOptimisticResponse(
  'technologyCreate',
  'Technology'
);
