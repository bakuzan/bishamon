import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RoutePaths from 'constants/routes';
import HeaderBar from 'components/HeaderBar/HeaderBar';
import Projects from 'views/Projects/Projects';
import ProjectsCreate from 'views/Projects/ProjectsCreate';
import ProjectBoard from 'views/ProjectBoard/ProjectBoard';

class App extends React.Component {
  render() {
    const { match } = this.props;
    const projectListUrl = `${match.path}${RoutePaths.projectList}`;

    return (
      <div className="app app--theme_default">
        <HeaderBar />
        <main>
          <Switch>
            <Redirect exact from={RoutePaths.base} to={projectListUrl} />
            <Route exact path={projectListUrl} component={Projects} />
            <Route
              path={`${projectListUrl}/create`}
              component={ProjectsCreate}
            />
            <Route
              path={`${projectListUrl}/:projectId`}
              component={ProjectBoard}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
