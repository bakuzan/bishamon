import React from 'react';

import {ButtonisedNavLink} from 'components/Buttons';

class Projects extends React.Component {

  render() {
    const {match} = this.props;
    const projectCreateUrl = `${match.path}/create`;

    return (
      <div>
        <div>
          <ButtonisedNavLink to={projectCreateUrl}>
            Add
          </ButtonisedNavLink>
        </div>
      </div>
    )
  }
}

export default Projects;
