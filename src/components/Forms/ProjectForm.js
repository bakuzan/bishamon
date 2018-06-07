import PropTypes from 'prop-types';
import React from 'react';

import { ClearableInput, ChipListInput, SelectBox } from 'meiko';
import Form from './Form';
import ProjectTypes from 'constants/project-types';
import { enumsToSelectBoxOptions, projectColourModel } from 'utils/mappers';

const PROJECT_TYPES = enumsToSelectBoxOptions(ProjectTypes);

class ProjectForm extends React.PureComponent {
  render() {
    const { formProps } = this.props;

    return (
      <Form {...formProps}>
        {({ values, actions }) => {
          return (
            <React.Fragment>
              <ClearableInput
                name="name"
                label="name"
                value={values.name}
                onChange={actions.handleUserInput}
              />
              <SelectBox
                name="type"
                text="type"
                value={values.type}
                onSelect={actions.handleUserInput}
                options={PROJECT_TYPES}
              />
              <ChipListInput
                tagClassName="bishamon-tag"
                menuClassName="bishamon-autocomplete-menu"
                label="Colours"
                attr="code"
                name="colours"
                chipsSelected={values.colours.map(projectColourModel)}
                chipOptions={[{ code: '____' }]}
                updateChipList={actions.handleListUpdate}
                createNew={actions.handleListCreate}
                createNewMessage="Add Colour"
              />
            </React.Fragment>
          );
        }}
      </Form>
    );
  }
}

ProjectForm.propTypes = {
  formProps: PropTypes.shape({
    mutation: PropTypes.object,
    onCompleted: PropTypes.func,
    update: PropTypes.func
  }).isRequired,
  isCreate: PropTypes.bool
};

export default ProjectForm;
