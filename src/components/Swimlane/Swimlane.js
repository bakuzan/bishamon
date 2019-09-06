import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { withDropTarget } from 'components/DragAndDrop';
import SwimlaneCard from 'components/SwimlaneCard/SwimlaneCard';

import { separateAndCapitaliseAll } from 'utils/common';

import './Swimlane.scss';

class Swimlane extends React.Component {
  render() {
    const { title, data, isOver, canDrop } = this.props;
    const isCollapsed = false;

    return (
      <div
        className={classNames('swimlane', {
          'swimlane--collapsed': isCollapsed
        })}
      >
        <div className="swimlane__header">
          {separateAndCapitaliseAll(title)} ({data.length})
        </div>
        <ul
          className={classNames('swimlane__list', {
            'swimlane__list--droppable': isOver && canDrop
          })}
        >
          {data.map((item) => (
            <SwimlaneCard key={item.id} data={item} />
          ))}
        </ul>
      </div>
    );
  }
}

Swimlane.defaultProps = {
  data: []
};

Swimlane.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  dropActions: PropTypes.shape({
    canDrop: PropTypes.func,
    onDrop: PropTypes.func
  })
};

export default withDropTarget(Swimlane);
