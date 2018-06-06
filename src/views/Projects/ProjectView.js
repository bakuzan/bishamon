import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import { ClearableInput, SelectBox, ChipListInput } from 'meiko';
import Form from 'components/Form/Form';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';
import ProjectTypes from 'constants/project-types';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import {
  projectColourModel,
  enumsToSelectBoxOptions,
  mapProjectViewToOptimisticResponse
} from 'utils/mappers';

const PROJECT_TYPES = enumsToSelectBoxOptions(ProjectTypes);

class ProjectView extends React.Component {
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
      data: { projectUpdate }
    }
  ) {
    const { id } = this.props;
    const { projects = [] } = cache.readQuery({
      query: Fetch.projectsAll
    });

    const index = projects.findIndex(x => x.id === id);
    const oldProject = projects[index];

    cache.writeQuery({
      query: Fetch.projectsAll,
      data: {
        projects: [
          ...projects.slice(0, index),
          { ...oldProject, ...projectUpdate },
          ...projects.slice(index + 1)
        ]
      }
    });
  }

  render() {
    const { id } = this.props;
    const mutationProps = {
      mutation: Mutate.projectUpdate,
      onCompleted: this.handleCloseAfterAction,
      update: this.handleCacheUpdate,
      buildOptimisticResponse: mapProjectViewToOptimisticResponse
    };

    return (
      <Query query={Fetch.projectById} variables={{ id }}>
        {({ loading, error, data = {} }) => {
          if (loading) return <DelayedLoader />;
          return (
            <Form
              className="card-form"
              formName="project-edit"
              defaults={data.project}
              mutationProps={mutationProps}
              onCancel={this.handleCloseAfterAction}
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
                      updateChipList={v =>
                        actions.handleListUpdate(v, 'colours')
                      }
                      createNew={v => actions.handleListCreate(v, 'colours')}
                      createNewMessage="Add Colour"
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

ProjectView.propTypes = {
  id: PropTypes.number.isRequired,
  closeView: PropTypes.func.isRequired
};

export default ProjectView;
