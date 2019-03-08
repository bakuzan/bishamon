import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import Forms from 'components/Forms';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { buildUrlWithIds, taskBoardUrl } from 'constants/routes';

const formDefaults = Object.freeze({
  name: '',
  description: ''
});

class TaskBoardCreate extends React.PureComponent {
  render() {
    const { projectData, history, match } = this.props;
    const projectId = Number(match.params.projectId);
    const workItemId = Number(match.params.workItemId);

    function goToBoard() {
      const cancelUrl = buildUrlWithIds(taskBoardUrl, {
        projectId,
        workItemId
      });
      history.push(cancelUrl);
    }

    const mutationProps = {
      mutation: Mutate.taskCreate,
      onCompleted: goToBoard,
      variables: { workItemId },
      update: (cache, { data: { taskCreate } }) => {
        const { tasks = [], ...other } = cache.readQuery({
          query: Fetch.workItemTasks,
          variables: { workItemId }
        });
        const updatedTasks = tasks.concat([{ ...taskCreate, workItemId }]);
        cache.writeQuery({
          query: Fetch.workItemTasks,
          variables: { workItemId },
          data: {
            ...other,
            tasks: updatedTasks
          }
        });
      },
      refetchQueries: () => [
        {
          query: Fetch.workItemRefreshOnTaskMutation,
          variables: { id: workItemId }
        }
      ]
    };

    const formProps = {
      formName: 'task-create',
      defaults: formDefaults,
      mutationProps,
      onCancel: goToBoard
    };

    return (
      <React.Fragment>
        <Helmet>
          {projectData && (
            <title>{`${projectData.name} / ${
              projectData.workItem.name
            } / Create Task`}</title>
          )}
        </Helmet>
        <Forms.TaskForm formProps={formProps} isCreate />
      </React.Fragment>
    );
  }
}

TaskBoardCreate.propTypes = {
  projectData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    workItem: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }).isRequired
};

export default TaskBoardCreate;
