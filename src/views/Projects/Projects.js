import classNames from 'classnames';
import React from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

import { Portal, ClearableInput, TagCloudSelector } from 'meiko-lib';
import MultiSelect from 'components/MultiSelect';
import { ButtonisedNavButton } from 'components/Buttons';
import Grid from 'components/Grid';
import ProjectCard from 'components/ProjectCard/ProjectCard';
import ProjectView from './ProjectView';
import { TechnologyContext } from 'context';
import Fetch from 'queries/fetch';
import Strings from 'constants/strings';
import ProjectTypes from 'constants/project-types';
import { enumsToSelectBoxOptions, dataToTagCloudOptions } from 'utils/mappers';
import { filterProjects } from 'utils/filters';

const DefaultProjectTypeFilters = new Set(ProjectTypes.slice(0));
const PROJECT_TYPE_OPTIONS = enumsToSelectBoxOptions(ProjectTypes);

class Projects extends React.Component {
  static contextType = TechnologyContext;

  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      filters: {
        search: '',
        types: DefaultProjectTypeFilters,
        technologies: new Set([])
      }
    };

    this.handleSelectedCard = this.handleSelectedCard.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMultiSelect = this.handleMultiSelect.bind(this);
  }

  handleSelectedCard(selectedId) {
    this.setState((prev) => ({
      selectedId: selectedId !== prev.selectedId ? selectedId : null
    }));
  }

  handleUserInput(name, value) {
    this.setState((prev) => ({
      filters: {
        ...prev.filters,
        [name]: value
      }
    }));
  }

  handleSearch(e) {
    const { name, value } = e.target;
    this.handleUserInput(name, value);
  }

  handleMultiSelect(value, name) {
    this.handleUserInput(name, new Set(value));
  }

  render() {
    let technologies = this.context;

    const { selectedId, filters } = this.state;
    const { match } = this.props;
    const projectCreateUrl = `${match.path}/create`;

    return (
      <Query query={Fetch.projectsAll}>
        {({ loading, error, data = {} }) => {
          const filteredProjects = filterProjects(filters, data.projects);
          const TECHNOLOGY_TAGS = dataToTagCloudOptions(
            technologies,
            data.projects
          );

          return (
            <div className="padded padded--standard">
              <Helmet>
                <title>Projects</title>
              </Helmet>
              <div className={classNames('flex-column')}>
                <div className={classNames('flex-row', 'project-filters')}>
                  <ClearableInput
                    id="search"
                    name="search"
                    value={filters.search}
                    onChange={this.handleSearch}
                  />
                  <MultiSelect
                    id="types"
                    name="types"
                    placeholder="Select type(s)"
                    label="Types"
                    values={[...filters.types.values()]}
                    options={PROJECT_TYPE_OPTIONS}
                    onUpdate={this.handleMultiSelect}
                  />
                  <div className="button-group right-aligned">
                    <ButtonisedNavButton
                      btnStyle="primary"
                      to={projectCreateUrl}
                    >
                      Add Project
                    </ButtonisedNavButton>
                  </div>
                </div>

                <TagCloudSelector
                  className="bishmon-tag-cloud"
                  tagClass="bishamon-tag"
                  name="technologies"
                  selectedTags={[...filters.technologies.values()]}
                  tagOptions={TECHNOLOGY_TAGS}
                  onSelect={this.handleMultiSelect}
                  sizeRelativeToCount
                />
              </div>
              <Grid className="bishamon-project-grid" items={filteredProjects}>
                {(item) => (
                  <ProjectCard
                    key={item.id}
                    data={item}
                    isSelected={selectedId === item.id}
                    onClick={() => this.handleSelectedCard(item.id)}
                  />
                )}
              </Grid>
              {selectedId && (
                <Portal
                  querySelector={`#${
                    Strings.selectors.projectCardPortal
                  }${selectedId}`}
                >
                  <ProjectView
                    id={selectedId}
                    closeView={this.handleSelectedCard}
                  />
                </Portal>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Projects;
