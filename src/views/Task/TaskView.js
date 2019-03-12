import React from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

import Forms from 'components/Forms';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { buildUrlWithIds, taskBoardUrl } from 'constants/routes';
import { mapTaskViewToOptimisticResponse } from 'utils/mappers';
import taskUpdater from './TaskViewUpdater';

class TaskView extends React.Component {
  render() {
    const { history, match, projectData } = this.props;
    const projectId = Number(match.params.projectId);
    const workItemId = Number(match.params.workItemId);
    const id = Number(match.params.taskId);

    function goToBoard() {
      const cancelUrl = buildUrlWithIds(taskBoardUrl, {
        projectId,
        workItemId
      });
      history.push(cancelUrl);
    }

    const mutationProps = {
      mutation: Mutate.taskUpdate,
      onCompleted: goToBoard,
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
      <Query
        query={Fetch.taskById}
        variables={{ id }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data = {} }) => {
          if (loading) return <DelayedLoader />;

          const formProps = {
            formName: 'task-edit',
            defaults: data.task,
            mutationProps,
            onCancel: goToBoard
          };

          return (
            <React.Fragment>
              <Helmet>
                {projectData && (
                  <title>{`${projectData.name} / ${
                    projectData.workItem.name
                  } / Edit Task, ${data.task.name}`}</title>
                )}
              </Helmet>
              <Forms.TaskForm formProps={formProps} />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default TaskView;
