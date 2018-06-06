import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import { ClearableInput, SelectBox } from 'meiko';
import Form from 'components/Form/Form';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';
import Status from 'constants/status';
import WorkTypes from 'constants/work-types';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { enumDefault } from 'utils/derived-data';
import {
  enumsToSelectBoxOptions,
  mapWorkItemViewToOptimisticResponse
} from 'utils/mappers';

const WORK_TYPES = enumsToSelectBoxOptions(WorkTypes);

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
    const { workItems = [] } = cache.readQuery({
      query: Fetch.projectWorkItems,
      variables: { projectId }
    });

    const index = workItems.findIndex(x => x.id === id);
    const oldWorkItem = workItems[index];

    cache.writeQuery({
      query: Fetch.projectWorkItems,
      variables: { projectId },
      data: {
        workItems: [
          ...workItems.slice(0, index),
          { ...oldWorkItem, ...workItemUpdate },
          ...workItems.slice(index + 1)
        ]
      }
    });
  }

  render() {
    const { id } = this.props;
    const mutationProps = {
      mutation: Mutate.workItemUpdate,
      onCompleted: this.handleCloseAfterAction,
      update: this.handleCacheUpdate,
      buildOptimisticResponse: mapWorkItemViewToOptimisticResponse
    };

    return (
      <Query query={Fetch.workItemById} variables={{ id }}>
        {({ loading, error, data = {} }) => {
          if (loading) return <DelayedLoader />;
          return (
            <Form
              className="card-form"
              formName="work-item-edit"
              defaults={data.workItem}
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
                      name="type"
                      text="type"
                      value={values.type}
                      onSelect={actions.handleUserInput}
                      options={WORK_TYPES}
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

WorkItemView.propTypes = {
  projectId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  closeView: PropTypes.func.isRequired
};

export default WorkItemView;
