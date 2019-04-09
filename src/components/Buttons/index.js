import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { withButtonisation, Button as MButton } from 'meiko-lib';

const STANDARD_CLASS = 'bishamon-button';

export const Button = ({ className, ...props }) => (
  <MButton {...props} className={classNames(STANDARD_CLASS, className)} />
);

const BtnNavLink = withButtonisation(NavLink);

export const ButtonisedNavButton = ({ className, ...props }) => (
  <BtnNavLink {...props} className={classNames(STANDARD_CLASS, className)} />
);

export const ButtonisedNavLink = ({ className, ...props }) => (
  <BtnNavLink
    {...props}
    className={classNames('bishamon-button-link', className)}
    link
  />
);
