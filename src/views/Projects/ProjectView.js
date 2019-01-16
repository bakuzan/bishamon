import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import Forms from 'components/Forms';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { mapProjectViewToOptimisticResponse } from 'utils/mappers';

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

    const index = projects.findIndex((x) => x.id === id);
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

          const formProps = {
            className: 'card-form',
            formName: 'project-edit',
            defaults: data.project,
            mutationProps,
            onCancel: this.handleCloseAfterAction
          };

          return <Forms.ProjectForm formProps={formProps} />;
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
