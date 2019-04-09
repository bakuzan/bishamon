import React, { useContext } from 'react';

import { SelectBox, DropdownMenu } from 'meiko-lib';
import Strings from 'constants/strings';
import { ThemeContext } from 'context';

const appThemes = [...Strings.themes.values()];

function AppSettings() {
  const themeProps = useContext(ThemeContext);

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

export default AppSettings;
