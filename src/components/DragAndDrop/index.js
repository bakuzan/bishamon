import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import _withDropTarget from './Target';
import _withDragSource from './Source';

export default DragDropContext(HTML5Backend);

export const withDropTarget = _withDropTarget;
export const withDragSource = _withDragSource;
