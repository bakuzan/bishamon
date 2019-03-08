import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { separateAndCapitaliseAll } from 'utils/common';
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

  return (
    <section className="project-information">
      <header
        className="project-information__header project-header"
        style={{ borderLeftColor: project.primaryColour }}
      >
        <div className="project-header__text">{name}</div>
        <div
          className={classNames('project-header__text', {
            [`project-header__text--type_${typeLower}`]: hasWorkItem
          })}
        >
          {type}
          {status}
        </div>
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
