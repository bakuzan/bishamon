import React from 'react';

import { ClearableInput, ChipListInput, SelectBox } from 'meiko';
import Form from 'components/Form/Form';
import { PROJECT_LIST_URL } from 'constants/routes';
import ProjectTypes from 'constants/project-types';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { enumsToSelectBoxOptions, projectColourModel } from 'utils/mappers';
import { enumDefault } from 'utils/derived-data';

const PROJECT_TYPES = enumsToSelectBoxOptions(ProjectTypes);
const projectCreateDefaults = Object.freeze({
  name: '',
  type: enumDefault(ProjectTypes),
  colours: []
});

class ProjectsCreate extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavigateToList = this.handleNavigateToList.bind(this);
    this.handleCacheUpdate = this.handleCacheUpdate.bind(this);
  }

  handleNavigateToList() {
    this.props.history.push(PROJECT_LIST_URL);
  }

  handleCacheUpdate(
    cache,
    {
      data: { projectCreate }
    }
  ) {
    const { projects = [] } = cache.readQuery({
      query: Fetch.projectsAll
    });
    cache.writeQuery({
      query: Fetch.projectsAll,
      data: { projects: projects.concat([projectCreate]) }
    });
  }

  render() {
    const mutationProps = {
      mutation: Mutate.projectCreate,
      onCompleted: this.handleNavigateToList,
      update: this.handleCacheUpdate
    };

    return (
      <Form
        formName="project-create"
        defaults={projectCreateDefaults}
        mutationProps={mutationProps}
        onCancel={this.handleNavigateToList}
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

export default ProjectsCreate;
