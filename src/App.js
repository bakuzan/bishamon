import classNames from 'classnames';
import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loadable from 'react-loadable';

import { useGlobalStyles } from 'meiko-lib';
import WorkItemHub from 'views/WorkItem';
import TaskHub from 'views/Task';

import HeaderBar from 'components/HeaderBar/HeaderBar';
import Fetch from 'queries/fetch';
import * as RoutePaths from 'constants/routes';
import Strings from 'constants/strings';
import { appSettingsStore, loadableSettings } from 'utils/common';
import { ThemeContext, TechnologyContext } from 'context';

const {
  base: baseUrl,
  projectListUrl,
  workItemBoardUrl,
  taskBoardUrl,

  projectCreateUrl,
  projectEditUrl
} = RoutePaths;

const Projects = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'Projects' */ './views/Project/Projects'),
  ...loadableSettings
});
const ProjectsCreate = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'ProjectsCreate' */ './views/Project/ProjectsCreate'),
  ...loadableSettings
});
const ProjectView = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'ProjectView' */ './views/Project/ProjectView'),
  ...loadableSettings
});

function App() {
  useGlobalStyles();
  const [theme, setTheme] = useState(
    appSettingsStore.get('theme') || Strings.defaultTheme
  );

  const themeProps = {
    value: theme,
    onChange: (e) => {
      const theme = e.target.value;
      appSettingsStore.set({ theme });
      setTheme(theme);
    }
  };

  return (
    <HelmetProvider>
      <div id="app" className={classNames('app theme', [`theme--${theme}`])}>
        <Helmet defaultTitle="Bishamon" titleTemplate="Bishamon - %s" />
        <ThemeContext.Provider value={themeProps}>
          <HeaderBar />
        </ThemeContext.Provider>
        <main>
          <Query query={Fetch.technologiesAll}>
            {({ data = { technologies: [] } }) => (
              <TechnologyContext.Provider value={data.technologies}>
                <Switch>
                  <Redirect exact from={baseUrl} to={projectListUrl} />

                  <Route path={taskBoardUrl} component={TaskHub} />
                  <Route path={workItemBoardUrl} component={WorkItemHub} />

                  <Route exact path={projectListUrl} component={Projects} />
                  <Route path={projectCreateUrl} component={ProjectsCreate} />
                  <Route path={projectEditUrl} component={ProjectView} />
                </Switch>
              </TechnologyContext.Provider>
            )}
          </Query>
        </main>
        <footer className="app__footer" />
      </div>
    </HelmetProvider>
  );
}

export default App;
