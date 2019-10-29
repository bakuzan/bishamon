import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import generateUniqueId from 'ayaka/generateUniqueId';
import fromCamelCase from 'ayaka/fromCamelCase';
import { Button, ButtonisedNavLink } from 'components/Buttons';
import Strings from 'constants/strings';

import './ItemCard.scss';

function ItemCard({
  className,
  data,
  readOnly,
  includeLinks,
  includeProjectName,
  mutationProps,
  ...props
}) {
  const [uniqueId] = useState(generateUniqueId());
  const type = data.type ? data.type.toLowerCase() : '';

  const itemCardProjectNameId = `itemCardProjectName_${uniqueId}`;
  const itemCardNameId = `itemCardName_${uniqueId}`;
  const itemCardNameDescriptionId = `itemCardNameDescription_${uniqueId}`;
  const itemCardProjectDescriptionId = `itemCardProjectDescription_${uniqueId}`;
  const itemCardContinueDescriptionId = `itemCardContinueDescription_${uniqueId}`;

  return (
    <Mutation {...mutationProps}>
      {(updateFunc, _) => (
        <li
          className={classNames('item-card', [
            `item-card--type_${type}`,
            className
          ])}
          aria-labelledby={`${itemCardProjectNameId} ${itemCardNameId}`}
        >
          {includeProjectName && data.project && (
            <div className="item-card__project">
              <h3
                id={itemCardProjectNameId}
                className="item-card__project-name"
              >
                <span aria-hidden="true">{data.project.name}</span>
              </h3>
            </div>
          )}
          <div className="item-card__name">
            <p id={itemCardNameId} className="for-screenreader-only">
              {data.name}
            </p>
            {!includeLinks ? (
              <span aria-hidden="true">{data.name}</span>
            ) : (
              <React.Fragment>
                <p
                  id={itemCardNameDescriptionId}
                  className="for-screenreader-only"
                >
                  Click to go to {data.name} {fromCamelCase(data.__typename)}{' '}
                  board
                </p>
                <ButtonisedNavLink
                  className="item-card__link"
                  to={props.entryLinkBuilder(data)}
                  aria-describedby={itemCardNameDescriptionId}
                >
                  <span aria-hidden="true">{data.name}</span>
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
                    id={itemCardProjectDescriptionId}
                    className="for-screenreader-only"
                  >
                    Click to go to {data.project ? data.project.name : ''}{' '}
                    project board
                  </p>
                  <ButtonisedNavLink
                    to={props.projectLinkBuilder(data)}
                    aria-describedby={itemCardProjectDescriptionId}
                  >
                    <span aria-hidden="true">{`To ${
                      data.project ? data.project.name : 'Project'
                    } Board`}</span>
                  </ButtonisedNavLink>
                </React.Fragment>
              )}
              {!readOnly && (
                <React.Fragment>
                  <p
                    id={itemCardContinueDescriptionId}
                    className="for-screenreader-only"
                  >
                    Click to move {data.name} {fromCamelCase(data.__typename)}{' '}
                    to in progress state.
                  </p>
                  <Button
                    btnStyle="primary"
                    onClick={updateFunc}
                    aria-describedby={itemCardContinueDescriptionId}
                  >
                    <span aria-hidden="true">Continue Work</span>
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
  data: {},
  includeLinks: false,
  includeProjectName: false
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
  customDescription: PropTypes.func,
  includeProjectName: PropTypes.bool
};

export default ItemCard;
