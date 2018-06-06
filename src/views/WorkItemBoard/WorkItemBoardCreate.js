import PropTypes from 'prop-types';
import React from 'react';

import { ClearableInput, SelectBox } from 'meiko';
import Form from 'components/Form/Form';
import WorkTypes from 'constants/work-types';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { enumsToSelectBoxOptions } from 'utils/mappers';
import { enumDefault } from 'utils/derived-data';

const WORK_TYPES = enumsToSelectBoxOptions(WorkTypes);
const formDefaults = Object.freeze({
  name: '',
  description: '',
  type: enumDefault(WorkTypes)
});

class WorkItemBoardCreate extends React.PureComponent {
  render() {
    const { projectId, onCompleted, onCancel } = this.props;
    const mutationProps = {
      mutation: Mutate.workItemCreate,
      onCompleted,
      variables: { projectId },
      update: (cache, { data: { workItemCreate } }) => {
        const { workItems = [] } = cache.readQuery({
          query: Fetch.projectWorkItems,
          variables: { projectId }
        });
        cache.writeQuery({
          query: Fetch.projectWorkItems,
          variables: { projectId },
          data: {
            workItems: workItems.concat([
              { ...workItemCreate, taskRatio: 'N/A' }
            ])
          }
        });
      }
    };

    return (
      <Form
        formName="work-item-create"
        defaults={formDefaults}
        mutationProps={mutationProps}
        onCancel={onCancel}
      >
        {({ values, actions }) => {
          return (
            <React.Fragment>
              <ClearableInput
                name="name"
                label="name"
                value={values.name}
                onChange={actions.handleUserInput}
              />
              <ClearableInput
                name="description"
                label="description"
                value={values.description}
                onChange={actions.handleUserInput}
              />
              <SelectBox
                name="type"
                text="type"
                value={values.type}
                onSelect={actions.handleUserInput}
                options={WORK_TYPES}
              />
            </React.Fragment>
          );
        }}
      </Form>
    );
  }
}

WorkItemBoardCreate.propTypes = {
  projectId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default WorkItemBoardCreate;
