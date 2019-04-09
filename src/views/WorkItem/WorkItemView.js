import React from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet-async';

import Forms from 'components/Forms';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { buildUrlWithIds, workItemBoardUrl } from 'constants/routes';
import { mapWorkItemViewToOptimisticResponse } from 'utils/mappers';
import workItemUpdater from './WorkItemViewUpdater';

class WorkItemView extends React.Component {
  render() {
    const { history, match, projectData } = this.props;
    const projectId = Number(match.params.projectId);
    const id = Number(match.params.workItemId);

    function goToBoard() {
      const cancelUrl = buildUrlWithIds(workItemBoardUrl, { projectId });
      history.push(cancelUrl);
    }

    const mutationProps = {
      mutation: Mutate.workItemUpdate,
      onCompleted: goToBoard,
      update: workItemUpdater,
      refetchQueries: () => [
        {
          query: Fetch.projectRefreshOnWorkItemMutation,
          variables: { id: projectId }
        }
      ],
      buildOptimisticResponse: mapWorkItemViewToOptimisticResponse
    };

    return (
      <Query
        query={Fetch.workItemById}
        variables={{ id }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data = {} }) => {
          if (loading) return <DelayedLoader />;

          const formProps = {
            name: 'work-item-edit',
            defaults: data.workItem,
            mutationProps,
            onCancel: goToBoard
          };

          return (
            <React.Fragment>
              <Helmet>
                {projectData && (
                  <title>{`${projectData.name} / Edit Work Item, ${
                    data.workItem.name
                  }`}</title>
                )}
              </Helmet>
              <Forms.WorkItemForm formProps={formProps} />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default WorkItemView;
