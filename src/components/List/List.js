import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

const COLUMN_CLASS = ['', 'one', 'two', 'three', 'four'];

const List = ({ items, itemTemplate, columns }) => (
  <ul
    className={classNames('list column', {
      [COLUMN_CLASS[columns]]: !!columns
    })}
  >
    {items && items.map(itemTemplate)}
  </ul>
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  itemTemplate: PropTypes.func,
  columns: PropTypes.number
};

export default List;
