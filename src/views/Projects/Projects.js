import React from 'react';

import {ButtonisedNavLink} from 'components/Buttons';


class Projects extends React.Component {

  render() {
    const { match } = this.props;
    const projectsCreateUrl = `${match.path}/create`;

    return (
      <div>
        <div>
          <ButtonisedNavLink to={projectsCreateUrl}>
            Add
          </ButtonisedNavLink>
        </div>
      </div>
    )
  }
}

export default Projects;
