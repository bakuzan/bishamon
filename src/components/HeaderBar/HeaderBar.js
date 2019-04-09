import React from 'react';
import { NavLink } from 'react-router-dom';

import { Header, SVGLogo } from 'meiko-lib';
import AppSettings from 'components/AppSettings/AppSettings';
import * as RoutePaths from 'constants/routes';

import './HeaderBar.scss';

function HeaderBar() {
  return (
    <Header
      className="header-bar"
      title="Bishamon"
      navLeft={
        <NavLink className="logo svg-link" to={RoutePaths.base}>
          <SVGLogo text="bishamon" />
        </NavLink>
      }
      navRight={<AppSettings />}
    />
  );
}

export default HeaderBar;
