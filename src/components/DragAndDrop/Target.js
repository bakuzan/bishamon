import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';

import DnDType from 'constants/dndType';

const swimlaneTarget = {
  canDrop(props, monitor) {
    return props.dropActions.canDrop(props.title, monitor.getItem());
  },
  drop(props, monitor) {
    return props.dropActions.onDrop(props.title, monitor.getItem());
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

export default function withDropTarget(WrappedComponent) {
  class Target extends React.Component {
    render() {
      const { connectDropTarget, ...props } = this.props;

      return (
        <WrappedComponent
          {...props}
          ref={(instance) => connectDropTarget(findDOMNode(instance))}
        />
      );
    }
  }

  return DropTarget(DnDType.card, swimlaneTarget, collectTarget)(Target);
}
