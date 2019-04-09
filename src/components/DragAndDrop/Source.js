import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import DnDType from 'constants/dnd-type';

const cardSource = {
  beginDrag(props) {
    return props.data;
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

export default function withDragSource(WrappedComponent) {
  class Source extends React.Component {
    componentDidMount() {
      this.props.connectDragPreview(getEmptyImage(), {
        captureDraggingState: true
      });
    }
    render() {
      const { connectDragSource, connectDragPreview, ...props } = this.props;

      return (
        <WrappedComponent
          {...props}
          ref={(instance) => connectDragSource(findDOMNode(instance))}
        />
      );
    }
  }

  return DragSource(DnDType.card, cardSource, collectSource)(Source);
}
