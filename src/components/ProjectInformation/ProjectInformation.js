import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { separateAndCapitaliseAll } from 'ayaka/capitalise';
import { ButtonisedNavLink } from 'components/Buttons';
import {
  buildUrlWithIds,
  projectEditUrl,
  workItemEditUrl
} from 'constants/routes';
import './ProjectInformation.scss';

const ProjectInformation = React.memo(function ProjectInformation(props) {
  const project = props.data;
  const workItem = project.workItem;
  const hasWorkItem = !!workItem;

  const name = hasWorkItem
    ? `${project.name} - ${workItem.name}`
    : project.name;

  const type = hasWorkItem
    ? workItem.type
    : separateAndCapitaliseAll(project.type || '');

  const typeLower = type ? type.toLowerCase() : '';
  const status = hasWorkItem
    ? ` - ${separateAndCapitaliseAll(workItem.status)}`
    : '';

  const editUrl = hasWorkItem
    ? buildUrlWithIds(workItemEditUrl, {
        projectId: project.id,
        workItemId: workItem.id
      })
    : buildUrlWithIds(projectEditUrl, {
        projectId: project.id
      });

  return (
    <section
      className="project-information"
      aria-describedby={`projectInformationHeader`}
    >
      <header
        id="projectInformationHeader"
        className="project-information__header project-header"
        style={{ borderLeftColor: project.primaryColour }}
      >
        <h2 className="project-header__title project-header__text">{name}</h2>
        <div
          className={classNames('project-header__text', {
            [`project-header__text--type_${typeLower}`]: hasWorkItem
          })}
        >
          {type}
          {status}
        </div>
        <ButtonisedNavLink to={editUrl}>Edit</ButtonisedNavLink>
      </header>
      <div className="page-actions button-group right-aligned">
        {props.headerActions}
      </div>
      <div className="project-information__children top-spacing">
        {props.children}
      </div>
    </section>
  );
});

ProjectInformation.defaultProps = {
  data: {}
};

ProjectInformation.propTypes = {
  data: PropTypes.object,
  headerActions: PropTypes.oneOfType([PropTypes.bool, PropTypes.element])
};

export default ProjectInformation;
