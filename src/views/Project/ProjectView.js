import React from 'react';
import { Query } from 'react-apollo';

import Forms from 'components/Forms';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';

import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';

import { projectListUrl } from 'constants/routes';
import { mapProjectViewToOptimisticResponse } from 'utils/mappers';

class ProjectView extends React.Component {
  constructor(props) {
    super(props);

    this.handleCacheUpdate = this.handleCacheUpdate.bind(this);
  }

  handleCacheUpdate(cache) {
    cache.deleteQueryBIS('projects');
  }

  render() {
    const { match, history } = this.props;
    const id = Number(match.params.projectId);

    function goToList() {
      history.push(projectListUrl);
    }

    const mutationProps = {
      mutation: Mutate.projectUpdate,
      onCompleted: goToList,
      update: this.handleCacheUpdate,
      buildOptimisticResponse: mapProjectViewToOptimisticResponse
    };

    return (
      <Query
        query={Fetch.projectById}
        variables={{ id }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data = {} }) => {
          if (loading) return <DelayedLoader />;

          const formProps = {
            name: 'project-edit',
            defaults: data.project,
            mutationProps,
            onCancel: history.goBack
          };

          return <Forms.ProjectForm formProps={formProps} />;
        }}
      </Query>
    );
  }
}

export default ProjectView;
