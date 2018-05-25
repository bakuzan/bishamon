import PropTypes from 'prop-types';
import React from 'react';

import { ButtonisedNavLink } from 'components/Buttons';
import Routes from 'constants/routes';

import './ProjectCard.css';

const PROJECT_VIEW_URL = `${Routes.base}${Routes.projectList}`;

class ProjectCard extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <li
        className="project-card"
        style={{ borderLeftColor: data.primaryColour }}
      >
        <ButtonisedNavLink
          className="project-card__link"
          to={`${PROJECT_VIEW_URL}/${data.id}`}
        >
          {data.name}
        </ButtonisedNavLink>
        <div className="project-card__content">{data.type}</div>
      </li>
    );
  }
}

ProjectCard.propTypes = {
  data: PropTypes.object
};

export default ProjectCard;
