import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';

import DragAndDropContext from 'components/DragAndDrop';
import Swimlane from 'components/Swimlane/Swimlane';
import { SwimlaneStatus } from 'constants/status';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null
    };

    this.handleSelectedCard = this.handleSelectedCard.bind(this);
    this.handleCanDrop = this.handleCanDrop.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleSelectedCard(selectedId) {
    this.setState(prev => ({
      selectedId: selectedId !== prev.selectedId ? selectedId : null
    }));
  }

  handleCanDrop(swimlane, item) {
    const swimlaneIndex = SwimlaneStatus.findIndex(x => x === swimlane);
    if (swimlaneIndex === 0) return false;
    return true;
  }

  handleDrop(mutateCall) {
    return (swimlane, item) => {
      mutateCall({
        variables: { id: item.id, status: swimlane }
      });
    };
  }

  render() {
    const { selectedId } = this.state;
    const { data, swimlaneCardLinkPath, mutationProps } = this.props;

    return (
      <Mutation {...mutationProps}>
        {(callAPI, _) => {
          const dropActions = {
            canDrop: this.handleCanDrop,
            onDrop: this.handleDrop(callAPI)
          };

          return (
            <React.Fragment>
              {SwimlaneStatus.map(x => (
                <Swimlane
                  key={x}
                  title={x}
                  data={data[x]}
                  cardLinkPath={swimlaneCardLinkPath}
                  selectedCardId={selectedId}
                  onCardSelect={this.handleSelectedCard}
                  dropActions={dropActions}
                />
              ))}
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

Board.defaultProps = {
  data: {}
};

Board.propTypes = {
  data: PropTypes.object,
  swimlaneCardLinkPath: PropTypes.string,
  mutationProps: PropTypes.shape({
    mutation: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired
  }).isRequired
};

export default DragAndDropContext(Board);
