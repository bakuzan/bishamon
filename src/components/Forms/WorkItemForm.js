import PropTypes from 'prop-types';
import React from 'react';

import { ClearableInput, SelectBox } from 'meiko-lib';
import Form from './Form';
import Status from 'constants/status';
import WorkTypes, { WorkType } from 'constants/work-types';
import { enumDefault } from 'utils/derived-data';
import { enumsToSelectBoxOptions } from 'utils/mappers';

const WORK_TYPES = enumsToSelectBoxOptions(WorkTypes);

class WorkItemForm extends React.PureComponent {
  render() {
    const { formProps, isCreate } = this.props;
    return (
      <Form {...formProps}>
        {({ values, actions }) => {
          const usableStatuses =
            values.status === enumDefault(Status) ? Status : Status.slice(1); // remove 'Todo'
          const STATUSES = enumsToSelectBoxOptions(usableStatuses);
          const isBug = values.type === WorkType.Bug;

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
              {!isCreate && (
                <SelectBox
                  name="status"
                  text="status"
                  value={values.status}
                  onSelect={actions.handleUserInput}
                  options={STATUSES}
                />
              )}
              {!isCreate &&
                isBug && (
                  <ClearableInput
                    name="cause"
                    label="cause"
                    value={values.cause}
                    onChange={actions.handleUserInput}
                  />
                )}
            </React.Fragment>
          );
        }}
      </Form>
    );
  }
}

WorkItemForm.propTypes = {
  formProps: PropTypes.shape({
    mutation: PropTypes.object,
    onCompleted: PropTypes.func,
    update: PropTypes.func
  }).isRequired,
  isCreate: PropTypes.bool
};

export default WorkItemForm;
