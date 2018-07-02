import React from 'react';

import Forms from 'components/Forms';
import { PROJECT_LIST_URL } from 'constants/routes';
import ProjectTypes from 'constants/project-types';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { enumDefault } from 'utils/derived-data';

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
    const formProps = {
      formName: 'project-create',
      defaults: projectCreateDefaults,
      mutationProps,
      onCancel: this.handleNavigateToList
    };

    return <Forms.ProjectForm formProps={formProps} isCreate />;
  }
}

export default ProjectsCreate;
