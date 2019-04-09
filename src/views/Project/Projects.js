import classNames from 'classnames';
import React from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet-async';

import { ClearableInput, TagCloudSelector, MultiSelect } from 'meiko-lib';
import { ButtonisedNavButton } from 'components/Buttons';
import Grid from 'components/Grid';
import ProjectCard from 'components/ProjectCard/ProjectCard';

import { TechnologyContext } from 'context';
import Fetch from 'queries/fetch';

import ProjectTypes from 'constants/project-types';
import { projectCreateUrl } from 'constants/routes';
import { enumsToSelectBoxOptions, dataToTagCloudOptions } from 'utils/mappers';
import { filterProjects } from 'utils/filters';

const DefaultProjectTypeFilters = new Set(ProjectTypes.slice(0));
const PROJECT_TYPE_OPTIONS = enumsToSelectBoxOptions(ProjectTypes);

class Projects extends React.Component {
  static contextType = TechnologyContext;

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      types: DefaultProjectTypeFilters,
      technologies: new Set([])
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleMultiSelect = this.handleMultiSelect.bind(this);
  }

  handleUserInput(name, value) {
    this.setState((prev) => ({
      ...prev,
      [name]: value
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
    const filters = this.state;

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
              <div className={classNames('flex flex--column')}>
                <div className="project-filters">
                  <ClearableInput
                    id="search"
                    name="search"
                    label="Search"
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
                {(item) => <ProjectCard key={item.id} data={item} />}
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Projects;
