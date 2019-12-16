import React from 'react';
import { NavLink } from 'react-router-dom';

import Header from 'meiko/Header';
import SVGLogo from 'meiko/Logo';
import Icons from 'meiko/constants/icons';
import AppSettings from 'components/AppSettings/AppSettings';
import { Button } from 'components/Buttons';
import * as RoutePaths from 'constants/routes';

import './HeaderBar.scss';

function HeaderBar({ history }) {
  return (
    <Header
      className="header-bar"
      title="Bishamon"
      navLeft={
        <NavLink className="logo svg-link" to={RoutePaths.base}>
          <SVGLogo text="bishamon" />
        </NavLink>
      }
      navRight={
        <div className="header-bar__right">
          <div className="flex">
            <Button
              className="header-bar__nav-button"
              btnStyle="accent"
              icon={Icons.left}
              title="Go back"
              aria-label="Go back"
              onClick={history.goBack}
            />
            <Button
              className="header-bar__nav-button"
              btnStyle="accent"
              icon={Icons.right}
              title="Go forward"
              aria-label="Go forward"
              onClick={history.goForward}
            />
          </div>
          <AppSettings />
        </div>
      }
    />
  );
}

export default HeaderBar;
