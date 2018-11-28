import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';

import { Portal } from 'meiko-lib';
import DragAndDropContext from 'components/DragAndDrop';
import Swimlane from 'components/Swimlane/Swimlane';
import Strings from 'constants/strings';
import { SwimlaneStatus } from 'constants/status';
import { createStatusMapForBoard } from './BoardUtils';

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
    this.setState((prev) => ({
      selectedId: selectedId !== prev.selectedId ? selectedId : null
    }));
  }

  handleCanDrop(swimlane, item) {
    const swimlaneIndex = SwimlaneStatus.findIndex((x) => x === swimlane);
    if (swimlaneIndex === 0) return false;
    return true;
  }

  handleDrop(mutateCall) {
    return (swimlane, item) => {
      if (swimlane === item.status) return;
      const { mutationProps } = this.props;
      const optimisticResponse = mutationProps.buildOptimisticResponse
        ? mutationProps.buildOptimisticResponse({ ...item, status: swimlane })
        : undefined;
      mutateCall({
        variables: { id: item.id, status: swimlane },
        optimisticResponse
      });
    };
  }

  render() {
    const { selectedId } = this.state;
    const {
      data,
      swimlaneCardLinkPath,
      mutationProps,
      renderSelectedCardView
    } = this.props;
    const hasCardView = !!renderSelectedCardView;
    const dataStatusMap = createStatusMapForBoard(data);

    return (
      <Mutation {...mutationProps}>
        {(callAPI, _) => {
          const dropActions = {
            canDrop: this.handleCanDrop,
            onDrop: this.handleDrop(callAPI)
          };

          return (
            <React.Fragment>
              {SwimlaneStatus.map((x) => {
                return (
                  <Swimlane
                    key={x}
                    title={x}
                    data={dataStatusMap.get(x)}
                    cardLinkPath={swimlaneCardLinkPath}
                    selectedCardId={selectedId}
                    onCardSelect={this.handleSelectedCard}
                    dropActions={dropActions}
                  />
                );
              })}
              {hasCardView &&
                selectedId && (
                  <Portal
                    querySelector={`#${
                      Strings.selectors.swimlaneCardPortal
                    }${selectedId}`}
                  >
                    {renderSelectedCardView({
                      selectedId,
                      closeView: this.handleSelectedCard
                    })}
                  </Portal>
                )}
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

Board.defaultProps = {
  data: []
};

Board.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  swimlaneCardLinkPath: PropTypes.string,
  mutationProps: PropTypes.shape({
    mutation: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired
  }).isRequired,
  renderSelectedCardView: PropTypes.func
};

export default DragAndDropContext(Board);
