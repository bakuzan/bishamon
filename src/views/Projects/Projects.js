import React from 'react';
import { Query } from 'react-apollo';

import { ButtonisedNavButton } from 'components/Buttons';
import List from 'components/List/List';
import ProjectCard from 'components/ProjectCard/ProjectCard';
import Fetch from 'queries/fetch';

class Projects extends React.Component {
  render() {
    const { match } = this.props;
    const projectCreateUrl = `${match.path}/create`;

    return (
      <div>
        <div className="button-group right-aligned">
          <ButtonisedNavButton to={projectCreateUrl}>Add</ButtonisedNavButton>
        </div>
        <Query query={Fetch.projectsAll}>
          {({ loading, error, data }) => {
            return (
              <List
                items={data.projects}
                itemTemplate={item => <ProjectCard key={item.id} data={item} />}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Projects;
