import React from 'react';

import { Tabs } from 'meiko-lib';

const TabContainer = ({ children, ...props }) => (
  <Tabs.TabContainer
    {...props}
    className="bishamon-tabs"
    tabsClassName="bishamon-tab-panels"
  >
    {children}
  </Tabs.TabContainer>
);

export default {
  TabContainer,
  TabView: Tabs.TabView
};
