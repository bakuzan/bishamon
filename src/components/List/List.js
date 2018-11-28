import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import './List.scss';

const COLUMN_CLASS = ['', 'one', 'two', 'three', 'four'];

const List = ({ className, items, itemTemplate, columns }) => (
  <ul
    className={classNames('list column', className, {
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
