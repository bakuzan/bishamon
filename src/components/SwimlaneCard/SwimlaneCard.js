import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import fromCamelCase from 'ayaka/fromCamelCase';
import objectsAreEqual from 'ayaka/objectsAreEqual';
import { withDragSource } from 'components/DragAndDrop';
import { ButtonisedNavLink } from 'components/Buttons';
import { RouteContext } from 'context';
import { buildUrlWithIds } from 'constants/routes';
import Strings from 'constants/strings';

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
    const isTask = data.__typename === Strings.dataTypes.task;

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
          {!isTask && (
            <p id="swimCardNameDescription" className="for-screenreader-only">
              Click to go to "{data.name}" {fromCamelCase(data.__typename)}{' '}
              board
            </p>
          )}
          <ButtonisedNavLink
            className={classNames('swimlane-card__link')}
            to={drilldownUrl}
            aria-describedby={isTask ? undefined : 'swimCardNameDescription'}
          >
            {data.name}
          </ButtonisedNavLink>
        </div>
        <div className="swimlane-card__ratio">{data.taskRatio}</div>
        <p id="swimCardEditDescription" className="for-screenreader-only">
          Click to edit "{data.name}" {fromCamelCase(data.__typename)} details
        </p>
        <ButtonisedNavLink
          className="swimlane-card__edit"
          to={editUrl}
          aria-describedby="swimCardEditDescription"
        >
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
