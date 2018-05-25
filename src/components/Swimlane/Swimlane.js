import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import List from 'components/List/List';
import { capitaliseEachWord, fromCamelCase } from 'utils/common';

import './Swimlane.css';

const Swimlane = ({ title, data }) => {
  const isCollapsed = false;
  console.log('swimlane > ', title, data);
  return (
    <div
      className={classNames('swimlane', { 'swimlane--collapsed': isCollapsed })}
    >
      <div className="swimlane__header">
        {capitaliseEachWord(fromCamelCase(title))}
      </div>
      <List
        columns={1}
        className="swimlane__list"
        items={data}
        itemTemplate={item => {
          return <div key={item.id}>{item.name}</div>;
        }}
      />
    </div>
  );
};

Swimlane.defaultProps = {
  data: []
};

Swimlane.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default Swimlane;
