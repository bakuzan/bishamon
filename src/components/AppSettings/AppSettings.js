import React from 'react';

import { SelectBox, DropdownMenu } from 'meiko';
import Strings from 'constants/strings';
import { ThemeContext } from 'context';

const appThemes = [...Strings.themes.values()];

class AppSettings extends React.Component {
  render() {
    return (
      <DropdownMenu id="app-settings" portalTarget="#app" align="right">
        <li>
          <ThemeContext.Consumer>
            {themeProps => (
              <SelectBox
                name="appTheme"
                text="App Theme"
                options={appThemes}
                {...themeProps}
              />
            )}
          </ThemeContext.Consumer>
        </li>
      </DropdownMenu>
    );
  }
}

export default AppSettings;
