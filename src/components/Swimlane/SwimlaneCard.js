import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { ButtonisedNavLink } from 'components/Buttons';
import './SwimlaneCard.css';

class SwimlaneCard extends React.PureComponent {
  render() {
    const { linkPath, data = {}, onClick, isSelected } = this.props;
    const hasLink = !!linkPath;
    return (
      <div
        className={classNames('swimlane-card', 'bottom-spacing', {
          'swimlane-card--can-move': true,
          'swimlane-card--selected': isSelected
        })}
        onClick={onClick}
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

export default SwimlaneCard;
