import PropTypes from 'prop-types';
import React from 'react';

import Forms from 'components/Forms';
import WorkTypes from 'constants/work-types';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { enumDefault } from 'utils/derived-data';

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
        const { workItems = [], workItemsHistoric } = cache.readQuery({
          query: Fetch.projectWorkItems,
          variables: { projectId }
        });
        cache.writeQuery({
          query: Fetch.projectWorkItems,
          variables: { projectId },
          data: {
            workItems: workItems.concat([
              { ...workItemCreate, taskRatio: 'N/A' }
            ]),
            workItemsHistoric
          }
        });
      },
      refetchQueries: () => [
        {
          query: Fetch.projectRefreshOnWorkItemMutation,
          variables: { id: projectId }
        }
      ]
    };

    const formProps = {
      formName: 'work-item-create',
      defaults: formDefaults,
      mutationProps,
      onCancel: onCancel
    };

    return <Forms.WorkItemForm formProps={formProps} isCreate />;
  }
}

WorkItemBoardCreate.propTypes = {
  projectId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default WorkItemBoardCreate;
