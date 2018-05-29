import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import List from 'components/List/List';
import SwimlaneCard from './SwimlaneCard';
import { capitaliseEachWord, fromCamelCase } from 'utils/common';

import './Swimlane.css';

class Swimlane extends React.Component {
  constructor(props) {
    super(props);

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(cardId) {
    console.log('card clicked', cardId);
    if (this.props.onCardSelect) {
      this.props.onCardSelect(cardId, this.props.title);
    }
  }

  render() {
    const { title, data, cardLinkPath } = this.props;
    const isCollapsed = false;
    console.log('swimlane > ', title, data);
    return (
      <div
        className={classNames('swimlane', {
          'swimlane--collapsed': isCollapsed
        })}
      >
        <div className="swimlane__header">
          {capitaliseEachWord(fromCamelCase(title))}
        </div>
        <List
          columns={1}
          className="swimlane__list"
          items={data}
          itemTemplate={item => (
            <SwimlaneCard
              key={item.id}
              data={item}
              linkPath={cardLinkPath}
              onClick={() => this.handleCardClick(item.id)}
            />
          )}
        />
      </div>
    );
  }
}

Swimlane.defaultProps = {
  data: [],
  cardLinkPath: ''
};

Swimlane.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  cardLinkPath: PropTypes.string,
  onCardSelect: PropTypes.func
};

export default Swimlane;
