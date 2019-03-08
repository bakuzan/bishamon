import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  withButtonisation,
  withCustomButtonWrapper,
  Button as MButton
} from 'meiko-lib';

const STANDARD_CLASS = 'bishamon-button ripple';

export const Button = ({ className, ...props }) => (
  <MButton {...props} className={classNames(STANDARD_CLASS, className)} />
);

export const ButtonisedNavLink = withCustomButtonWrapper(
  withButtonisation(NavLink),
  { className: 'bishamon-button-link', link: true }
);

export const ButtonisedNavButton = withCustomButtonWrapper(
  withButtonisation(NavLink),
  { className: STANDARD_CLASS }
);
