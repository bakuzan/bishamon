import PropTypes from 'prop-types';
import React from 'react';

import { ClearableInput, SelectBox } from 'meiko-lib';
import Form from './Form';
import Status from 'constants/status';
import { enumDefault } from 'utils/derived-data';
import { enumsToSelectBoxOptions } from 'utils/mappers';

class TaskForm extends React.PureComponent {
  render() {
    const { formProps, isCreate } = this.props;
    return (
      <Form {...formProps}>
        {({ values, actions }) => {
          const usableStatuses =
            values.status === enumDefault(Status) ? Status : Status.slice(1); // remove 'Todo'
          const STATUSES = enumsToSelectBoxOptions(usableStatuses);
          return (
            <React.Fragment>
              <ClearableInput
                id="name"
                name="name"
                label="name"
                value={values.name}
                onChange={actions.handleUserInput}
              />
              <ClearableInput
                id="description"
                name="description"
                label="description"
                value={values.description}
                onChange={actions.handleUserInput}
              />
              {!isCreate && (
                <SelectBox
                  id="status"
                  name="status"
                  text="status"
                  value={values.status}
                  onSelect={actions.handleUserInput}
                  options={STATUSES}
                />
              )}
            </React.Fragment>
          );
        }}
      </Form>
    );
  }
}

TaskForm.propTypes = {
  formProps: PropTypes.shape({
    mutation: PropTypes.object,
    onCompleted: PropTypes.func,
    update: PropTypes.func
  }).isRequired,
  isCreate: PropTypes.bool
};

export default TaskForm;
