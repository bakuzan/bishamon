import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { Mutation } from 'react-apollo';

import { Button, ButtonisedNavLink } from 'components/Buttons';
import Strings from 'constants/strings';

import './ItemCard.scss';

function ItemCard({ data, readOnly, includeLinks, mutationProps, ...props }) {
  const type = data.type ? data.type.toLowerCase() : '';

  return (
    <Mutation {...mutationProps}>
      {(updateFunc, _) => (
        <li className={classNames('item-card', [`item-card--type_${type}`])}>
          <div className="item-card__name">
            {!includeLinks ? (
              data.name
            ) : (
              <ButtonisedNavLink to={props.entryLinkBuilder(data)}>
                {data.name}
              </ButtonisedNavLink>
            )}
          </div>
          <div className="item-card__detail">
            <div className="item-card__description">
              {(props.customDescription
                ? props.customDescription(data)
                : data.description) || Strings.noDescription}
            </div>
            <div className="item-card__button-group">
              {includeLinks && (
                <ButtonisedNavLink to={props.projectLinkBuilder(data)}>
                  {`To ${data.project ? data.project.name : 'Project'} Board`}
                </ButtonisedNavLink>
              )}
              {!readOnly && (
                <Button btnStyle="primary" onClick={updateFunc}>
                  Continue Work
                </Button>
              )}
            </div>
          </div>
        </li>
      )}
    </Mutation>
  );
}

ItemCard.defaultProps = {
  data: {}
};

ItemCard.propTypes = {
  data: PropTypes.object,
  readOnly: PropTypes.bool,
  includeLinks: PropTypes.bool,
  mutationProps: PropTypes.shape({
    mutation: PropTypes.object,
    variables: PropTypes.object,
    optimisticResponse: PropTypes.object
  }),
  projectLinkBuilder: PropTypes.func,
  entryLinkBuilder: PropTypes.func,
  customDescription: PropTypes.func
};

export default ItemCard;
