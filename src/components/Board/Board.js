import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';

import { Portal } from 'meiko';
import DragAndDropContext from 'components/DragAndDrop';
import Swimlane from 'components/Swimlane/Swimlane';
import Strings from 'constants/strings';
import { SwimlaneStatus } from 'constants/status';

const STATUS_MAP = SwimlaneStatus.reduce((p, c) => p.set(c, []), new Map());

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      dataStatusMap: new Map([...STATUS_MAP.entries()])
    };

    this.handleSelectedCard = this.handleSelectedCard.bind(this);
    this.handleCanDrop = this.handleCanDrop.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const dataStatusMap = nextProps.data.reduce((p, c) => {
      const v = p.get(c.status) || [];
      return p.set(c.status, [...v, c]);
    }, new Map([...STATUS_MAP.entries()]));
    const prevData = prevState.dataStatusMap;
    const countsChanged = SwimlaneStatus.some(
      x => dataStatusMap.get(x).length !== prevData.get(x).length
    );

    if (countsChanged) {
      return {
        dataStatusMap
      };
    }

    return null;
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
    const { selectedId, dataStatusMap } = this.state;
    const {
      swimlaneCardLinkPath,
      mutationProps,
      renderSelectedCardView
    } = this.props;
    const hasCardView = !!renderSelectedCardView;

    return (
      <Mutation {...mutationProps}>
        {(callAPI, _) => {
          const dropActions = {
            canDrop: this.handleCanDrop,
            onDrop: this.handleDrop(callAPI)
          };

          return (
            <React.Fragment>
              {SwimlaneStatus.map(x => {
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
