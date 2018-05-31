import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { withDragSource } from 'components/DragAndDrop';
import { ButtonisedNavLink } from 'components/Buttons';
import Strings from 'constants/strings';
import { objectsAreEqual } from 'utils/common';
import './SwimlaneCard.css';

class SwimlaneCard extends React.Component {
  shouldComponentUpdate(nextProps) {
    const isSelectedChanged = nextProps.isSelected !== this.props.isSelected;
    const isDraggingChanged = nextProps.isDragging !== this.props.isDragging;
    const dataChanged = !objectsAreEqual(nextProps.data, this.props.data);

    return isSelectedChanged || isDraggingChanged || dataChanged;
  }

  render() {
    const { linkPath, data = {}, onClick, isSelected, isDragging } = this.props;
    const hasLink = !!linkPath;

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
        <div id={`${Strings.selectors.swimlaneCardPortal}${data.id}`}>
          {/* Content placed here via portal. */}
        </div>
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
