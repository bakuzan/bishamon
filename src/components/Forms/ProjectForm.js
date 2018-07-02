import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';

import { ClearableInput, ChipListInput, SelectBox } from 'meiko';
import Form from './Form';
import { TechnologyContext } from 'context';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import ProjectTypes from 'constants/project-types';
import {
  enumsToSelectBoxOptions,
  projectColourModel,
  projectTechnologyModel,
  mapTechnologyToOptimisticResponse
} from 'utils/mappers';

const PROJECT_TYPES = enumsToSelectBoxOptions(ProjectTypes);

class ProjectForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleAddTechnology = this.handleAddTechnology.bind(this);
    this.handleCacheUpdate = this.handleCacheUpdate.bind(this);
  }

  handleAddTechnology({ callApi, localUpdate, currentTechnologies }) {
    return (techTag) => {
      const optimisticResponse = mapTechnologyToOptimisticResponse(techTag);
      callApi({
        variables: {
          ...techTag
        },
        optimisticResponse,
        update: this.handleCacheUpdate({ localUpdate, currentTechnologies })
      });
    };
  }

  handleCacheUpdate({ localUpdate, currentTechnologies }) {
    return (cache, { data: { technologyCreate } }) => {
      const { technologies = [] } = cache.readQuery({
        query: Fetch.technologiesAll
      });
      cache.writeQuery({
        query: Fetch.technologiesAll,
        data: { technologies: technologies.concat([technologyCreate]) }
      });

      const newTechnologies = currentTechnologies.concat([technologyCreate]);
      localUpdate('technologies', newTechnologies);
    };
  }

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
              <Mutation mutation={Mutate.technologyCreate}>
                {(createTechTag, { data = {} }) => {
                  const onCreateNewTechnology = this.handleAddTechnology({
                    callApi: createTechTag,
                    localUpdate: actions.handleListUpdate,
                    currentTechnologies: values.technologies
                  });

                  return (
                    <TechnologyContext.Consumer>
                      {(allTechnologies = []) => (
                        <ChipListInput
                          tagClassName="bishamon-tag"
                          menuClassName="bishamon-autocomplete-menu"
                          label="Technologies"
                          attr="name"
                          name="technologies"
                          chipsSelected={values.technologies.map(
                            projectTechnologyModel
                          )}
                          chipOptions={allTechnologies}
                          updateChipList={actions.handleListUpdate}
                          createNew={onCreateNewTechnology}
                          createNewMessage="Create New Technology"
                        />
                      )}
                    </TechnologyContext.Consumer>
                  );
                }}
              </Mutation>
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
