import PropTypes from 'prop-types';
import React from 'react';

import { ClearableInput, SelectBox } from 'meiko';
import Form from 'components/Form/Form';
import WorkTypes from 'constants/work-types';
import Mutate from 'queries/mutate';
import { enumsToSelectBoxOptions } from 'utils/mappers';
import { enumDefault } from 'utils/derived-data';

const WORK_TYPES = enumsToSelectBoxOptions(WorkTypes);
const formDefaults = Object.freeze({
  name: '',
  description: '',
  type: enumDefault(WorkTypes)
});

class ProjectBoardCreate extends React.PureComponent {
  render() {
    const mutationProps = {
      mutation: Mutate.workItemCreate,
      onCompletion: this.props.onCompletion
    };

    return (
      <Form
        formName="work-item-create"
        default={formDefaults}
        mutationProps={mutationProps}
        onCancel={this.props.onCancel}
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
            </React.Fragment>
          );
        }}
      </Form>
    );
  }
}

ProjectBoardCreate.propTypes = {
  onCompletion: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ProjectBoardCreate;
