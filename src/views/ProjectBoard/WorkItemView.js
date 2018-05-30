import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import { ClearableInput, SelectBox, Loaders } from 'meiko';
import Form from 'components/Form/Form';
import Status from 'constants/status';
import WorkTypes from 'constants/work-types';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { enumsToSelectBoxOptions } from 'utils/mappers';

const WORK_TYPES = enumsToSelectBoxOptions(WorkTypes);
const STATUSES = enumsToSelectBoxOptions(Status.slice(1)); // remove 'Todo'

class WorkItemView extends React.Component {
  constructor(props) {
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
  }

  handleCancel() {
    // TODO handle cancel by removing the portal
  }

  handleCompleted() {}

  render() {
    const { id } = this.props;
    const mutationProps = {
      mutation: Mutate.workItemUpdate,
      onCompleted: this.handleCompleted,
      variables: {},
      update: (cache, { data: { workItemUpdate } }) => {
        cache.writeQuery({
          query: Fetch.workItemById,
          variables: { id },
          data: {
            workItem: workItemUpdate
          }
        });
      }
    };

    return (
      <Query query={Fetch.workItemById} variables={{ id }}>
        {({ loading, error, data = {} }) => {
          if (!data.workItem) return <Loaders.LoadingBouncer />;
          return (
            <Form
              className="card-form"
              formName="work-item-edit"
              defaults={data.workItem}
              mutationProps={mutationProps}
              onCancel={this.handleCancel}
            >
              {({ values, actions }) => {
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
                      value={values.type}
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
  id: PropTypes.number.isRequired
};

export default WorkItemView;
