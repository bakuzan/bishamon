import PropTypes from 'prop-types';
import React from 'react';

import './ProjectInformation.css';

class ProjectInformation extends React.PureComponent {
  render() {
    const project = this.props.data;
    return (
      <section className="project-information">
        <header
          className="project-information__header project-header"
          style={{ borderLeftColor: project.primaryColour }}
        >
          <div className="project-header__text">{project.name}</div>
          <div className="project-header__text">{project.type}</div>
        </header>
        {this.props.headerContent}
        <div className="project-information__children">
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
