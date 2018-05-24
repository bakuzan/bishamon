import PropTypes from 'prop-types';
import React from 'react'

const List = ({ items, itemTemplate }) => (
  <ul className="list column">
  {items && items.map(itemTemplate)}
  </ul>
)

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  itemTemplate: PropTypes.func
}

export default List;
