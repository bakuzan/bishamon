import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import Forms from 'components/Forms';
import WorkTypes from 'constants/workTypes';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { buildUrlWithIds, workItemBoardUrl } from 'constants/routes';
import { enumDefault } from 'utils/derivedData';

const formDefaults = Object.freeze({
  name: '',
  description: '',
  type: enumDefault(WorkTypes)
});

class WorkItemBoardCreate extends React.PureComponent {
  render() {
    const { projectData, history, match } = this.props;
    const projectId = Number(match.params.projectId);

    function goToBoard() {
      const boardUrl = buildUrlWithIds(workItemBoardUrl, { projectId });
      history.push(boardUrl);
    }

    const mutationProps = {
      mutation: Mutate.workItemCreate,
      onCompleted: goToBoard,
      variables: { projectId },
      update: (cache, { data: { workItemCreate } }) => {
        const newWorkItem = {
          ...workItemCreate,
          projectId,
          taskRatio: 'N/A'
        };

        const { workItems = [], ...other } = cache.readQuery({
          query: Fetch.projectWorkItems,
          variables: { projectId }
        });

        cache.writeQuery({
          query: Fetch.projectWorkItems,
          variables: { projectId },
          data: {
            ...other,
            workItems: workItems.concat([newWorkItem])
          }
        });

        // Dashboard Update
        const dashboardData = cache.readQuerySafeBIS({
          query: Fetch.getDashboard
        });

        if (dashboardData) {
          const {
            dashboardCurrentWork,
            ...otherDash
          } = dashboardData.dashboard;

          cache.writeQuery({
            query: Fetch.getDashboard,
            data: {
              dashboard: {
                ...otherDash,
                dashboardCurrentWork: [
                  ...dashboardCurrentWork,
                  {
                    ...newWorkItem,
                    project: { name: projectData.name, __typename: 'Project' }
                  }
                ]
              }
            }
          });
        }
      },
      refetchQueries: () => [
        {
          query: Fetch.projectRefreshOnWorkItemMutation,
          variables: { id: projectId }
        }
      ]
    };

    const formProps = {
      name: 'work-item-create',
      defaults: formDefaults,
      mutationProps,
      onCancel: goToBoard
    };

    return (
      <React.Fragment>
        <Helmet>
          {projectData && (
            <title>{`${projectData.name} / Create Work Item`}</title>
          )}
        </Helmet>
        <Forms.WorkItemForm formProps={formProps} isCreate />
      </React.Fragment>
    );
  }
}

WorkItemBoardCreate.defaultProps = {
  projectData: {}
};

WorkItemBoardCreate.propTypes = {
  projectData: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

export default WorkItemBoardCreate;
