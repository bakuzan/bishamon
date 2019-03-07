import React from 'react';

import { SelectBox, DropdownMenu } from 'meiko-lib';
import Strings from 'constants/strings';
import { ThemeContext } from 'context';

const appThemes = [...Strings.themes.values()];

class AppSettings extends React.Component {
  static contextType = ThemeContext;

  render() {
    let themeProps = this.context;

    return (
      <DropdownMenu id="app-settings" portalTarget="#app" align="right">
        <li>
          <SelectBox
            id="appTheme"
            name="appTheme"
            text="App Theme"
            options={appThemes}
            {...themeProps}
          />
        </li>
      </DropdownMenu>
    );
  }
}

export default AppSettings;
