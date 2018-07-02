import classNames from 'classnames';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import HeaderBar from 'components/HeaderBar/HeaderBar';
import Projects from 'views/Projects/Projects';
import ProjectsCreate from 'views/Projects/ProjectsCreate';
import WorkItemBoard from 'views/WorkItemBoard/WorkItemBoard';
import TaskBoard from 'views/TaskBoard/TaskBoard';
import Fetch from 'queries/fetch';
import RoutePaths from 'constants/routes';
import Strings from 'constants/strings';
import { getAppSettings, saveAppSettings } from 'utils/common';
import { ThemeContext, TechnologyContext } from 'context';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: Strings.defaultTheme
    };

    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  componentDidMount() {
    const settings = getAppSettings() || {};
    this.setState({ ...settings });
  }

  handleThemeChange(e) {
    const theme = e.target.value;
    saveAppSettings({ theme });
    this.setState({ theme });
  }

  render() {
    const { theme } = this.state;
    const { match } = this.props;
    const projectListUrl = `${match.path}${RoutePaths.projectList}`;
    const workItemBoardUrl = `${projectListUrl}/:projectId`;
    const themeProps = {
      value: theme,
      onSelect: this.handleThemeChange
    };

    return (
      <div id="app" className={classNames('app', [`app--theme_${theme}`])}>
        <ThemeContext.Provider value={themeProps}>
          <HeaderBar />
        </ThemeContext.Provider>
        <main>
          <Query query={Fetch.technologiesAll}>
            {({ data = { technologies: [] } }) => (
              <TechnologyContext.Provider value={data.technologies}>
                <Switch>
                  <Redirect exact from={RoutePaths.base} to={projectListUrl} />
                  <Route exact path={projectListUrl} component={Projects} />
                  <Route
                    path={`${projectListUrl}/create`}
                    component={ProjectsCreate}
                  />

                  <Route
                    path={`${workItemBoardUrl}${
                      RoutePaths.taskBoard
                    }/:workItemId`}
                    component={TaskBoard}
                  />
                  <Route path={workItemBoardUrl} component={WorkItemBoard} />
                </Switch>
              </TechnologyContext.Provider>
            )}
          </Query>
        </main>
      </div>
    );
  }
}

export default App;
