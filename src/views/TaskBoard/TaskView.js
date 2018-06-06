import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import { ClearableInput, SelectBox } from 'meiko';
import Form from 'components/Form/Form';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';
import Status from 'constants/status';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { enumDefault } from 'utils/derived-data';
import {
  enumsToSelectBoxOptions,
  mapTaskViewToOptimisticResponse
} from 'utils/mappers';

class TaskView extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseAfterAction = this.handleCloseAfterAction.bind(this);
    this.handleCacheUpdate = this.handleCacheUpdate.bind(this);
  }

  handleCloseAfterAction() {
    this.props.closeView();
  }

  handleCacheUpdate(
    cache,
    {
      data: { taskUpdate }
    }
  ) {
    const { id, workItemId } = this.props;
    const { tasks = [] } = cache.readQuery({
      query: Fetch.workItemTasks,
      variables: { workItemId }
    });

    const index = tasks.findIndex(x => x.id === id);
    const oldTask = tasks[index];

    cache.writeQuery({
      query: Fetch.workItemTasks,
      variables: { workItemId },
      data: {
        tasks: [
          ...tasks.slice(0, index),
          { ...oldTask, ...taskUpdate },
          ...tasks.slice(index + 1)
        ]
      }
    });
  }

  render() {
    const { id } = this.props;
    const mutationProps = {
      mutation: Mutate.taskUpdate,
      onCompleted: this.handleCloseAfterAction,
      update: this.handleCacheUpdate,
      buildOptimisticResponse: mapTaskViewToOptimisticResponse
    };

    return (
      <Query query={Fetch.taskById} variables={{ id }}>
        {({ loading, error, data = {} }) => {
          if (loading) return <DelayedLoader />;
          return (
            <Form
              className="card-form"
              formName="task-edit"
              defaults={data.task}
              mutationProps={mutationProps}
              onCancel={this.handleCloseAfterAction}
            >
              {({ values, actions }) => {
                const usableStatuses =
                  values.status === enumDefault(Status)
                    ? Status
                    : Status.slice(1); // remove 'Todo'
                const STATUSES = enumsToSelectBoxOptions(usableStatuses);
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
                      name="status"
                      text="status"
                      value={values.status}
                      onSelect={actions.handleUserInput}
                      options={STATUSES}
                    />
                  </React.Fragment>
                );
              }}
            </Form>
          );
        }}
      </Query>
    );
  }
}

TaskView.propTypes = {
  workItemId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  closeView: PropTypes.func.isRequired
};

export default TaskView;
