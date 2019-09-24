import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Swimlane from 'components/Swimlane/Swimlane';

import { SwimlaneStatus } from 'constants/status';
import { createStatusMapForBoard } from './BoardUtils';

import './Board.scss';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.handleCanDrop = this.handleCanDrop.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleCanDrop(swimlane) {
    const swimlaneIndex = SwimlaneStatus.findIndex((x) => x === swimlane);
    if (swimlaneIndex === 0) {
      return false;
    }

    return true;
  }

  handleDrop(mutateCall) {
    return (swimlane, item) => {
      if (swimlane === item.status) {
        return;
      }

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
    const { data, mutationProps } = this.props;

    const dataStatusMap = createStatusMapForBoard(data);

    return (
      <DndProvider backend={HTML5Backend}>
        <Mutation {...mutationProps}>
          {(callAPI, _) => {
            const dropActions = {
              canDrop: this.handleCanDrop,
              onDrop: this.handleDrop(callAPI)
            };

            return (
              <div className="board">
                {SwimlaneStatus.map((x) => (
                  <Swimlane
                    key={x}
                    title={x}
                    data={dataStatusMap.get(x)}
                    dropActions={dropActions}
                  />
                ))}
              </div>
            );
          }}
        </Mutation>
      </DndProvider>
    );
  }
}

Board.defaultProps = {
  data: []
};

Board.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  mutationProps: PropTypes.shape({
    mutation: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired
  }).isRequired
};

export default Board;
