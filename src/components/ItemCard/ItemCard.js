import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { Mutation } from 'react-apollo';

import { Button } from 'components/Buttons';

import './ItemCard.css';

class ItemCard extends React.PureComponent {
  render() {
    const { data, mutationProps } = this.props;
    const type = data.type ? data.type.toLowerCase() : '';

    return (
      <Mutation {...mutationProps}>
        {(updateFunc, _) => (
          <li className={classNames('item-card', [`item-card--type_${type}`])}>
            <div className="item-card__name">{data.name}</div>
            <div className="item-card__detail">
              <div>{data.description}</div>
              <div className="button-group align-right">
                <Button onClick={updateFunc}>Continue Work</Button>
              </div>
            </div>
          </li>
        )}
      </Mutation>
    );
  }
}

ItemCard.defaultProps = {
  data: {}
};

ItemCard.propTypes = {
  data: PropTypes.object,
  mutationProps: PropTypes.shape({
    mutation: PropTypes.object,
    variables: PropTypes.object,
    optimisticResponse: PropTypes.object
  })
};

export default ItemCard;