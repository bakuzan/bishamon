import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import './SwimlaneCard.css';

const SwimlaneCard = ({ data = {} }) => {
  return (
    <div
      className={classNames('swimlane-card', 'bottom-spacing', {
        'swimlane-card--can-move': true
      })}
    >
      <div className={classNames('swimlane-card__name')}>{data.name}</div>
    </div>
  );
};

SwimlaneCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default SwimlaneCard;
