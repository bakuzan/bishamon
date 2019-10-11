import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { Mutation } from 'react-apollo';

import { Button, ButtonisedNavLink } from 'components/Buttons';
import Strings from 'constants/strings';

import './ItemCard.scss';
import { fromCamelCase } from 'utils/common';

function ItemCard({
  className,
  data,
  readOnly,
  includeLinks,
  mutationProps,
  ...props
}) {
  const type = data.type ? data.type.toLowerCase() : '';

  return (
    <Mutation {...mutationProps}>
      {(updateFunc, _) => (
        <li
          className={classNames('item-card', [
            `item-card--type_${type}`,
            className
          ])}
        >
          <div className="item-card__name">
            {!includeLinks ? (
              data.name
            ) : (
              <React.Fragment>
                <p
                  id="itemCardNameDescription"
                  className="for-screenreader-only"
                >
                  Click to go to "{data.name}" {fromCamelCase(data.__typename)}{' '}
                  board
                </p>
                <ButtonisedNavLink
                  className="item-card__link"
                  to={props.entryLinkBuilder(data)}
                  aria-describedby="itemCardNameDescription"
                >
                  {data.name}
                </ButtonisedNavLink>
              </React.Fragment>
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
                <React.Fragment>
                  <p
                    id="itemCardProjectDescription"
                    className="for-screenreader-only"
                  >
                    Click to go to {data.project ? data.project.name : ''}{' '}
                    project board
                  </p>
                  <ButtonisedNavLink
                    to={props.projectLinkBuilder(data)}
                    aria-describedby="itemCardProjectDescription"
                  >
                    {`To ${data.project ? data.project.name : 'Project'} Board`}
                  </ButtonisedNavLink>
                </React.Fragment>
              )}
              {!readOnly && (
                <React.Fragment>
                  <p
                    id="itemCardContinueDescription"
                    className="for-screenreader-only"
                  >
                    Click to move "{data.name}" {fromCamelCase(data.__typename)}{' '}
                    to in progress state.
                  </p>
                  <Button
                    btnStyle="primary"
                    onClick={updateFunc}
                    aria-describedby="itemCardContinueDescription"
                  >
                    Continue Work
                  </Button>
                </React.Fragment>
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
