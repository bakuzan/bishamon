import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { withDragSource } from 'components/DragAndDrop';
import { ButtonisedNavLink } from 'components/Buttons';
import { RouteContext } from 'context';
import { buildUrlWithIds } from 'constants/routes';
import { objectsAreEqual } from 'utils/common';

import './SwimlaneCard.scss';

class SwimlaneCard extends React.Component {
  static contextType = RouteContext;

  shouldComponentUpdate(nextProps) {
    const isDraggingChanged = nextProps.isDragging !== this.props.isDragging;
    const dataChanged = !objectsAreEqual(nextProps.data, this.props.data);

    return isDraggingChanged || dataChanged;
  }

  render() {
    let routeData = this.context;
    const { data = {}, isDragging } = this.props;
    const hasType = !!data.type;
    const type = hasType ? data.type.toLowerCase() : '';

    const editUrl = buildUrlWithIds(routeData.edit, {
      [routeData.key]: data.id
    });
    const drilldownUrl = buildUrlWithIds(routeData.drilldown, {
      [routeData.key]: data.id
    });

    return (
      <li
        className={classNames('swimlane-card', 'bottom-spacing', {
          [`swimlane-card--type_${type}`]: hasType,
          'swimlane-card--can-move': true,
          'swimlane-card--dragging': isDragging
        })}
        title={data.type}
      >
        <div className={classNames('swimlane-card__name')}>
          <ButtonisedNavLink
            className={classNames('swimlane-card__link')}
            to={drilldownUrl}
          >
            {data.name}
          </ButtonisedNavLink>
        </div>
        <div className="swimlane-card__ratio">{data.taskRatio}</div>
        <ButtonisedNavLink className="swimlane-card__edit" to={editUrl}>
          Edit
        </ButtonisedNavLink>
      </li>
    );
  }
}

SwimlaneCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default withDragSource(SwimlaneCard);
