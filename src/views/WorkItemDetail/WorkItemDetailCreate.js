import PropTypes from 'prop-types';
import React from 'react';

import { ClearableInput } from 'meiko';
import Form from 'components/Form/Form';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';

const formDefaults = Object.freeze({
  name: '',
  description: ''
});

class WorkItemDetailCreate extends React.PureComponent {
  render() {
    const { workItemId, onCompleted, onCancel } = this.props;
    const mutationProps = {
      mutation: Mutate.taskCreate,
      onCompleted,
      variables: { workItemId },
      update: (cache, { data: { taskCreate } }) => {
        const { tasks = [] } = cache.readQuery({
          query: Fetch.workItemTasks,
          variables: { workItemId }
        });
        cache.writeQuery({
          query: Fetch.workItemTasks,
          variables: { workItemId },
          data: {
            tasks: tasks.concat([{ ...taskCreate }])
          }
        });
      }
    };

    return (
      <Form
        formName="task-create"
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
            </React.Fragment>
          );
        }}
      </Form>
    );
  }
}

WorkItemDetailCreate.propTypes = {
  workItemId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default WorkItemDetailCreate;
