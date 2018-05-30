import PropTypes from 'prop-types';
import React from 'react';

import './ProjectInformation.css';

class ProjectInformation extends React.PureComponent {
  render() {
    const project = this.props.data;
    const workItem = project.workItem;
    const hasWorkItem = !!workItem;
    const name = hasWorkItem
      ? `${project.name} - ${workItem.name}`
      : project.name;
    const type = hasWorkItem ? workItem.type : project.type;

    return (
      <section className="project-information">
        <header
          className="project-information__header project-header"
          style={{ borderLeftColor: project.primaryColour }}
        >
          <div className="project-header__text">{name}</div>
          <div className="project-header__text">{type}</div>
        </header>
        {this.props.headerContent}
        <div className="project-information__children top-spacing">
          {this.props.children}
        </div>
      </section>
    );
  }
}

ProjectInformation.defaultProps = {
  data: {}
};

ProjectInformation.propTypes = {
  data: PropTypes.object,
  headerContent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default ProjectInformation;
