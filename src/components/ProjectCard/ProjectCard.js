import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { ButtonisedNavLink } from 'components/Buttons';
import {
  buildUrlWithIds,
  workItemBoardUrl,
  projectEditUrl
} from 'constants/routes';

import { separateAndCapitaliseAll } from 'utils/common';

import './ProjectCard.scss';

const ProjectCard = React.memo(function ProjectCard({ data }) {
  const { id: projectId } = data;
  const workItemsUrl = buildUrlWithIds(workItemBoardUrl, { projectId });
  const editUrl = buildUrlWithIds(projectEditUrl, { projectId });

  return (
    <li
      className={classNames('project-card bottom-spacing')}
      style={{ borderLeftColor: data.primaryColour }}
    >
      <ButtonisedNavLink className="project-card__link" to={workItemsUrl}>
        {data.name}
      </ButtonisedNavLink>
      <div className="project-card__content">
        <div>{separateAndCapitaliseAll(data.type)}</div>
        <div>{data.workItemRatio}</div>
      </div>
      <ButtonisedNavLink to={editUrl}>Edit</ButtonisedNavLink>
    </li>
  );
});

ProjectCard.propTypes = {
  data: PropTypes.object
};

export default ProjectCard;
