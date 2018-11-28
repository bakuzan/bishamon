import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  withButtonisation,
  withCustomButtonWrapper,
  Button as MButton
} from 'meiko-lib';

const STANDARD_CLASS = 'bishamon-button ripple';

const BishamonButton = ({ appClass, className, ...props }) => (
  <MButton {...props} className={classNames(appClass, className)} />
);

export const Button = (props) => (
  <BishamonButton {...props} appClass={STANDARD_CLASS} />
);

export const ButtonisedNavLink = withCustomButtonWrapper(
  withButtonisation(NavLink),
  { className: 'bishamon-button-link', link: true }
);

export const ButtonisedNavButton = withCustomButtonWrapper(
  withButtonisation(NavLink),
  { className: STANDARD_CLASS }
);
