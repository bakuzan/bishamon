import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

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
    const { projectData, projectId, onCompleted, onCancel } = this.props;
    const mutationProps = {
      mutation: Mutate.workItemCreate,
      onCompleted,
      variables: { projectId },
      update: (cache, { data: { workItemCreate } }) => {
        const { workItems = [], ...other } = cache.readQuery({
          query: Fetch.projectWorkItems,
          variables: { projectId }
        });
        cache.writeQuery({
          query: Fetch.projectWorkItems,
          variables: { projectId },
          data: {
            ...other,
            workItems: workItems.concat([
              { ...workItemCreate, projectId, taskRatio: 'N/A' }
            ])
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

WorkItemBoardCreate.propTypes = {
  projectData: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  projectId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default WorkItemBoardCreate;
