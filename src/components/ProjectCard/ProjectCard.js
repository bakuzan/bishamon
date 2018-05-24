import PropTypes from 'prop-types';
import React from 'react';

import { ButtonisedNavLink } from 'components/Buttons';
import Routes from 'constants/routes';

const PROJECT_VIEW_URL = `${Routes.base}${Routes.projectsList}`;

const ProjectCard = ({ data }) => (
  <li className="project-card">
    <ButtonisedNavLink
      className="project-card__link"
      to={`${PROJECT_VIEW_URL}/${data.id}`}
    >
      {data.name}
    </ButtonisedNavLink>
  </li>
);

ProjectCard.propTypes = {
  data: PropTypes.object
};

export default ProjectCard;
