import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import Forms from 'components/Forms';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { mapWorkItemViewToOptimisticResponse } from 'utils/mappers';

class WorkItemView extends React.Component {
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
      data: { workItemUpdate }
    }
  ) {
    const { id, projectId } = this.props;
    const { workItems = [], ...other } = cache.readQuery({
      query: Fetch.projectWorkItems,
      variables: { projectId }
    });

    const index = workItems.findIndex((x) => x.id === id);
    const oldWorkItem = workItems[index];

    cache.writeQuery({
      query: Fetch.projectWorkItems,
      variables: { projectId },
      data: {
        ...other,
        workItems: [
          ...workItems.slice(0, index),
          { ...oldWorkItem, ...workItemUpdate },
          ...workItems.slice(index + 1)
        ]
      }
    });
  }

  render() {
    const { id, projectId } = this.props;
    const mutationProps = {
      mutation: Mutate.workItemUpdate,
      onCompleted: this.handleCloseAfterAction,
      update: this.handleCacheUpdate,
      refetchQueries: () => [
        {
          query: Fetch.projectRefreshOnWorkItemMutation,
          variables: { id: projectId }
        }
      ],
      buildOptimisticResponse: mapWorkItemViewToOptimisticResponse
    };

    return (
      <Query query={Fetch.workItemById} variables={{ id }}>
        {({ loading, error, data = {} }) => {
          if (loading) return <DelayedLoader />;

          const formProps = {
            className: 'card-form',
            formName: 'work-item-edit',
            defaults: data.workItem,
            mutationProps,
            onCancel: this.handleCloseAfterAction
          };

          return <Forms.WorkItemForm formProps={formProps} />;
        }}
      </Query>
    );
  }
}

WorkItemView.propTypes = {
  projectId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  closeView: PropTypes.func.isRequired
};

export default WorkItemView;
