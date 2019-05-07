import React from 'react';
import { Helmet } from 'react-helmet-async';

import Forms from 'components/Forms';
import { projectListUrl } from 'constants/routes';
import ProjectTypes from 'constants/projectTypes';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { enumDefault } from 'utils/derivedData';

const projectCreateDefaults = Object.freeze({
  name: '',
  type: enumDefault(ProjectTypes),
  colours: [],
  technologies: []
});

class ProjectsCreate extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavigateToList = this.handleNavigateToList.bind(this);
    this.handleCacheUpdate = this.handleCacheUpdate.bind(this);
  }

  handleNavigateToList() {
    this.props.history.push(projectListUrl);
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

    const formProps = {
      title: 'Create a Project',
      name: 'project-create',
      defaults: projectCreateDefaults,
      mutationProps,
      onCancel: this.handleNavigateToList
    };

    return (
      <React.Fragment>
        <Helmet>
          <title>Create Project</title>
        </Helmet>
        <Forms.ProjectForm formProps={formProps} isCreate />
      </React.Fragment>
    );
  }
}

export default ProjectsCreate;
