import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import Forms from 'components/Forms';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { mapTaskViewToOptimisticResponse } from 'utils/mappers';
import taskUpdater from './TaskViewUpdater';

class TaskView extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseAfterAction = this.handleCloseAfterAction.bind(this);
  }

  handleCloseAfterAction() {
    this.props.closeView();
  }

  render() {
    const { id, workItemId } = this.props;
    const mutationProps = {
      mutation: Mutate.taskUpdate,
      onCompleted: this.handleCloseAfterAction,
      update: taskUpdater,
      refetchQueries: () => [
        {
          query: Fetch.workItemRefreshOnTaskMutation,
          variables: { id: workItemId }
        }
      ],
      buildOptimisticResponse: mapTaskViewToOptimisticResponse
    };

    return (
      <Query query={Fetch.taskById} variables={{ id }}>
        {({ loading, error, data = {} }) => {
          if (loading) return <DelayedLoader />;

          const formProps = {
            className: 'card-form',
            formName: 'task-edit',
            defaults: data.task,
            mutationProps,
            onCancel: this.handleCloseAfterAction
          };

          return <Forms.TaskForm formProps={formProps} />;
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
