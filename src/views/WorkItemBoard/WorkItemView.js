import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import Forms from 'components/Forms';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { mapWorkItemViewToOptimisticResponse } from 'utils/mappers';
import workItemUpdater from './WorkItemViewUpdater';

class WorkItemView extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseAfterAction = this.handleCloseAfterAction.bind(this);
  }

  handleCloseAfterAction() {
    this.props.closeView();
  }

  render() {
    const { id, projectId } = this.props;
    const mutationProps = {
      mutation: Mutate.workItemUpdate,
      onCompleted: this.handleCloseAfterAction,
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
