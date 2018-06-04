import { generateUniqueId, capitaliseEachWord, fromCamelCase } from './common';

export const projectColourModel = code => ({
  id: generateUniqueId(),
  code
});

export const enumsToSelectBoxOptions = arr =>
  arr.map(value => ({ value, text: capitaliseEachWord(fromCamelCase(value)) }));

const mapOptimisticResponse = obj => {
  return {
    __typename: 'Mutation',
    ...obj
  };
};

export const mapWorkItemViewToOptimisticResponse = values => {
  return mapOptimisticResponse({
    workItemUpdate: {
      ...values
    }
  });
};

export const mapTaskViewToOptimisticResponse = values => {
  return mapOptimisticResponse({
    taskUpdate: {
      ...values
    }
  });
};
