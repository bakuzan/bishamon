import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { withDragSource } from 'components/DragAndDrop';
import { ButtonisedNavLink } from 'components/Buttons';
import './SwimlaneCard.css';

class SwimlaneCard extends React.PureComponent {
  render() {
    const { linkPath, data = {}, onClick, isSelected, isDragging } = this.props;
    const hasLink = !!linkPath;
    console.log('swimlane card', this.props);
    return (
      <div
        className={classNames('swimlane-card', 'bottom-spacing', {
          'swimlane-card--can-move': true,
          'swimlane-card--selected': isSelected,
          'swimlane-card--dragging': isDragging
        })}
        onClick={onClick}
        role="button"
        tabIndex="0"
      >
        <div className={classNames('swimlane-card__name')}>
          <ButtonisedNavLink
            className={classNames('swimlane-card__link')}
            to={`${linkPath}/${data.id}`}
            disabled={!hasLink}
          >
            {data.name}
          </ButtonisedNavLink>
        </div>
        <div className="swimlane-card__ratio">{data.taskRatio}</div>
      </div>
    );
  }
}

SwimlaneCard.defaultProps = {
  isSelected: false
};

SwimlaneCard.propTypes = {
  data: PropTypes.object.isRequired,
  linkPath: PropTypes.string,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool
};

export default withDragSource(SwimlaneCard);
