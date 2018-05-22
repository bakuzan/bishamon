import classNames from 'classnames';
import React from 'react';
import {NavLink} from 'react-router-dom';

import {withButtonisation, withCustomButtonWrapper, Button as MButton} from 'meiko';

const BishamonButton = ({ appClass, className, ...props }) => (
  <MButton {...props} className={classNames(appClass, className)} />
)

export const Button = props => (
  <BishamonButton {...props} appClass="bishamon-button" />
)

export const ButtonisedNavLink = withCustomButtonWrapper(
  withButtonisation(NavLink),
  { className: 'bishamon-button-link', link: true }
)
