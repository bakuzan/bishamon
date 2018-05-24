import React from 'react';
import { Query } from "react-apollo";

import {ButtonisedNavLink} from 'components/Buttons';
import List from 'components/List/List';
import Fetch from 'queries/fetch';

class Projects extends React.Component {

  render() {
    const {match} = this.props;
    const projectCreateUrl = `${match.path}/create`;

    return (
      <div>
        <div className="button-group right-aligned">
          <ButtonisedNavLink to={projectCreateUrl}>
            Add
          </ButtonisedNavLink>
        </div>
        <Query
          query={Fetch.projectsAll}
        >
        {({ loading, error, data }) => {
          return (
            <List
              items={data.projects}
              itemTemplate={item => (
                <li key={item.id}>{item.name}</li>
              )}
            />
          );
        }}
        </Query>
      </div>
    )
  }
}

export default Projects;
