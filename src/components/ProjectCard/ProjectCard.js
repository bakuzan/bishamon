import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { ButtonisedNavLink } from 'components/Buttons';
import Routes from 'constants/routes';
import Strings from 'constants/strings';

import './ProjectCard.css';

const PROJECT_VIEW_URL = `${Routes.base}${Routes.projectList}`;

class ProjectCard extends React.PureComponent {
  render() {
    const { data, isSelected, onClick } = this.props;
    const canClick = !!onClick;

    return (
      <li
        className={classNames('project-card bottom-spacing', {
          'project-card--can-click': canClick,
          'project-card--selected': isSelected
        })}
        style={{ borderLeftColor: data.primaryColour }}
        onClick={onClick}
        role="button"
        tabIndex="0"
      >
        <ButtonisedNavLink
          className="project-card__link"
          to={`${PROJECT_VIEW_URL}/${data.id}`}
        >
          {data.name}
        </ButtonisedNavLink>
        <div className="project-card__content">{data.type}</div>
        <div id={`${Strings.selectors.projectCardPortal}${data.id}`}>
          {/* Content placed here via portal. */}
        </div>
      </li>
    );
  }
}

ProjectCard.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool
};

export default ProjectCard;
