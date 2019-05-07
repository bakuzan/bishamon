import React, { useContext } from 'react';

import { SelectBox, DropdownMenu } from 'mko';
import Strings from 'constants/strings';
import { ThemeContext } from 'context';

const appThemes = [...Strings.themes.values()];

function AppSettings() {
  const themeProps = useContext(ThemeContext);

  return (
    <DropdownMenu id="app-settings" align="right">
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
