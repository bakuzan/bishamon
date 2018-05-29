import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';

import DragAndDropContext from 'components/DragAndDrop';
import Swimlane from 'components/Swimlane/Swimlane';
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
    console.log('DERIVE', nextProps.data, prevState.data);
    const dataStatusMap = nextProps.data.reduce(
      (p, c) => p.set(c.status, [...p.get(c.status), c]),
      new Map([...STATUS_MAP.entries()])
    );
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
      mutateCall({
        variables: { id: item.id, status: swimlane }
      });
    };
  }

  render() {
    const { selectedId, dataStatusMap } = this.state;
    const { data, swimlaneCardLinkPath, mutationProps } = this.props;

    return (
      <Mutation {...mutationProps}>
        {(callAPI, _) => {
          const dropActions = {
            canDrop: this.handleCanDrop,
            onDrop: this.handleDrop(callAPI)
          };
          console.log('Board', data);
          return (
            <React.Fragment>
              {SwimlaneStatus.map(x => {
                console.log(dataStatusMap.get(x));
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
  }).isRequired
};

export default DragAndDropContext(Board);
