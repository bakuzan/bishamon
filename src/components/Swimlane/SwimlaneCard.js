import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { ButtonisedNavLink } from 'components/Buttons';
import './SwimlaneCard.css';

const SwimlaneCard = ({ linkPath, data = {} }) => {
  const hasLink = !!linkPath;
  return (
    <div
      className={classNames('swimlane-card', 'bottom-spacing', {
        'swimlane-card--can-move': true
      })}
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
    </div>
  );
};

SwimlaneCard.propTypes = {
  data: PropTypes.object.isRequired,
  linkPath: PropTypes.string
};

export default SwimlaneCard;
