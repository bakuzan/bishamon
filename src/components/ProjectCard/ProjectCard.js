import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';

import { separateAndCapitaliseAll } from 'ayaka/capitalise';
import generateUniqueId from 'ayaka/generateUniqueId';
import formatDateForDisplay from 'ayaka/formatDateForDisplay';

import { ButtonisedNavLink } from 'components/Buttons';
import {
  buildUrlWithIds,
  workItemBoardUrl,
  projectEditUrl
} from 'constants/routes';

import './ProjectCard.scss';

const ProjectCard = React.memo(function ProjectCard({ data, showCreatedAt }) {
  const [uniqueId] = useState(generateUniqueId());
  const { id: projectId } = data;

  const workItemsUrl = buildUrlWithIds(workItemBoardUrl, { projectId });
  const editUrl = buildUrlWithIds(projectEditUrl, { projectId });

  const projectBoardDescriptionId = `projectBoardDescription_${uniqueId}`;
  const projectEditDescriptionId = `projectEditDescription_${uniqueId}`;

  return (
    <li
      className={classNames('project-card bottom-spacing')}
      style={{ borderLeftColor: data.primaryColour }}
    >
      <p id={projectBoardDescriptionId} className="for-screenreader-only">
        Click to go to {data.name} project board
      </p>
      {showCreatedAt && (
        <div className="project-card__date">
          Created {formatDateForDisplay(data.createdAt)}
        </div>
      )}
      <ButtonisedNavLink
        className="project-card__link"
        to={workItemsUrl}
        aria-describedby={projectBoardDescriptionId}
      >
        <span aria-hidden="true">{data.name}</span>
      </ButtonisedNavLink>
      <div className="project-card__content">
        <div>{separateAndCapitaliseAll(data.type)}</div>
        <div>{data.workItemRatio}</div>
      </div>
      <p id={projectEditDescriptionId} className="for-screenreader-only">
        Click to edit {data.name} details
      </p>
      <ButtonisedNavLink
        to={editUrl}
        aria-describedby={projectEditDescriptionId}
      >
        <span aria-hidden="true">Edit</span>
      </ButtonisedNavLink>
    </li>
  );
});

ProjectCard.defaultProps = {
  showCreatedAt: false
};

ProjectCard.propTypes = {
  data: PropTypes.object,
  showCreatedAt: PropTypes.bool
};

export default ProjectCard;
