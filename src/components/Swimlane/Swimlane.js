import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { withDropTarget } from 'components/DragAndDrop';
import List from 'components/List/List';
import SwimlaneCard from 'components/SwimlaneCard/SwimlaneCard';
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
    const {
      title,
      data,
      cardLinkPath,
      selectedCardId,
      isOver,
      canDrop
    } = this.props;
    const isCollapsed = false;
    console.log(this.props);
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
          className={classNames('swimlane__list', {
            'swimlane__list--droppable': isOver && canDrop
          })}
          items={data}
          itemTemplate={item => (
            <SwimlaneCard
              key={item.id}
              data={item}
              linkPath={cardLinkPath}
              isSelected={selectedCardId === item.id}
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
  selectedCardId: PropTypes.number,
  onCardSelect: PropTypes.func,
  dropActions: PropTypes.shape({
    canDrop: PropTypes.func,
    onDrop: PropTypes.func
  })
};

export default withDropTarget(Swimlane);
